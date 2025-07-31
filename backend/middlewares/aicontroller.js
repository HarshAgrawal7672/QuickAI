import OpenAI from "openai";
import sql from "../config/db.js";
import { clerkClient } from "@clerk/express";
import axios from "axios";
import {v2 as cloudinary} from 'cloudinary';
import fs from "fs"
import pdf from "pdf-parse/lib/pdf-parse.js"

const AI = new OpenAI({
  apiKey: process.env.GEMINI_API_KEY,
  baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
});

export const generateArticle = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { prompt, length } = req.body;
    const plan = req.plan;
    const free_usage = req.free_usage || 0;

    if (plan === "free" && free_usage >= 10) {
      return res.json({
        success: false,
        message:
          "You have reached your free usage limit. Please upgrade to premium plan.",
      });
    }

    const response = await AI.chat.completions.create({
      model: "gemini-2.0-flash",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: length || 1000,
    });

    const content = response.choices[0].message.content;

    await sql`INSERT INTO creations (user_id, prompt, content, type) VALUES (${userId}, ${prompt}, ${content}, 'article')`;
    if (plan === "free") {
      await clerkClient.users.updateUserMetadata(userId, {
        privateMetadata: {
          free_usage: free_usage + 1,
        },
      });
    }
    res.json({
      success: true,
      content,
    });
  } catch (error) {
    console.error(error);
    res.json({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
};

export const generateBlogTitle = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { prompt } = req.body;
    const plan = req.plan;
    const free_usage = req.free_usage || 0;

    if (plan === "free" && free_usage >= 10) {
      return res.json({
        success: false,
        message:
          "You have reached your free usage limit. Please upgrade to premium plan.",
      });
    }

    const response = await AI.chat.completions.create({
      model: "gemini-2.0-flash",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 200,
    });

    const content = response.choices[0].message.content;

    await sql`INSERT INTO creations (user_id, prompt, content, type) VALUES (${userId}, ${prompt}, ${content}, 'blog-title')`;
    if (plan === "free") {
      await clerkClient.users.updateUserMetadata(userId, {
        privateMetadata: {
          free_usage: free_usage + 1,
        },
      });
    }
    res.json({
      success: true,
      content,
    });
  } catch (error) {
    console.error(error);
    res.json({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
};

export const generateImage = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { prompt, publish } = req.body;
    const plan = req.plan;

    if (plan !== "premium") {
      return res.json({
        success: false,
        message:
          "You need a premium plan to use this feature. Please upgrade to premium plan.",
      });
    }

    const form = new FormData();
    form.append("prompt", prompt);
   const {data}= await axios.post("https://clipdrop-api.co/text-to-image/v1", form,{
        headers: {
          "x-api-key": process.env.CLIPDROP_API_KEY},
        responseType: "arraybuffer",
        })

    const base64Image = `data:image/png;base64,${Buffer.from(data,"binary").toString("base64")}`;

    const {secure_url}= await cloudinary.uploader.upload(base64Image)

    await sql`INSERT INTO creations (user_id, prompt, content, type,publish) VALUES (${userId}, ${prompt}, ${secure_url}, 'image', ${publish ?? false})`;
   
    res.json({
      success: true,
      content:secure_url,
    });
  } catch (error) {
    console.error(error);
    res.json({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
};


export const removeImageBackground = async (req, res) => {
  try {
    const { userId } = req.auth();
    const image  = req.file;
    const plan = req.plan;

    if (plan !== "premium") {
      return res.json({
        success: false,
        message:
          "You need a premium plan to use this feature. Please upgrade to premium plan.",
      });
    }

    

    const {secure_url}= await cloudinary.uploader.upload(image.path,{
        transformation:[{
            effect:"background_removal",
            background_removal:"remove_the_background"
        }]
    })

    await sql`INSERT INTO creations (user_id, prompt, content, type) VALUES (${userId}, 'Remove Background from image', ${secure_url}, 'image' )`;
   
    res.json({
      success: true,
      content:secure_url,
    });
  } catch (error) {
    console.error(error);
    res.json({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
};



export const removeImageObject = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { object } = req.body;
    const  image  = req.file;
    const plan = req.plan;

    if (plan !== "premium") {
      return res.json({
        success: false,
        message:
          "You need a premium plan to use this feature. Please upgrade to premium plan.",
      });
    }

    

    const {public_id}= await cloudinary.uploader.upload(image.path)
    const imageUrl=cloudinary.url(public_id,{
        transformation:[
            {
                effect:`gen_remove:${object}`
            }
        ] ,
        resource_type : "image"
    })



    await sql`INSERT INTO creations (user_id, prompt, content, type) VALUES (${userId}, ${`Remove ${object} from image`}, ${imageUrl}, 'image' )`;
    
    res.json({
      success: true,
      content:imageUrl,
    });
  } catch (error) {
    console.error(error);
    res.json({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
};


export const resumeReview = async (req, res) => {
  try {
    const { userId } = req.auth();
    const  resume  = req.file;
    const plan = req.plan;

    if (plan !== "premium") {
      return res.json({
        success: false,
        message:
          "You need a premium plan to use this feature. Please upgrade to premium plan.",
      });
    }

    if(resume.size > 5 *1024 *1024){
        return res.json({
            success:false,
            message:"Resume file size exceeds allowed size (5MB)."
        })
    }

    const dataBuffer= fs.readFileSync(resume.path)
    const pdfdata= await pdf(dataBuffer)

    const prompt=`Review the following resume and provide constructive feedback on its strengths,weaknesses, and areas for improvement. Resume content: \n\n ${pdfdata.text}`

    const response = await AI.chat.completions.create({
      model: "gemini-2.0-flash",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 1500,
    });

    const content = response.choices[0].message.content;



    await sql`INSERT INTO creations (user_id, prompt, content, type) VALUES (${userId}, 'Review the uploaded Resume', ${content}, 'resume-review' )`;
    
    res.json({
      success: true,
      content,
    });
  } catch (error) {
    console.error(error);
    res.json({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
};
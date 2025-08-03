# Quick.ai - AI-Powered SaaS Platform

Quick.ai is a full-stack AI Software as a Service (SaaS) application built with the PERN stack. It provides users with a suite of powerful generative AI tools, accessible through a secure subscription-based model.

*(Replace the placeholder above with a screenshot or GIF of your application)*

---

## ✨ Key Features

Quick.ai offers a range of features designed to boost creativity and productivity:

* **User Authentication**: Secure sign-up, sign-in, and profile management powered by **Clerk**.
* **Subscription Billing**: Premium subscriptions managed through **Clerk's billing features** to unlock access to advanced AI capabilities.
* **Article Generator**: Generate high-quality articles by simply providing a title and desired length.
* **Blog Title Generator**: Get catchy and SEO-friendly blog titles from a keyword and category.
* **Image Generator**: Create stunning visuals from a text prompt using generative AI.
* **Background Remover**: Upload an image to automatically get a transparent background.
* **Image Object Remover**: Remove unwanted objects from any image by describing them.
* **Resume Analyzer**: Upload a resume to receive a comprehensive analysis and improvement suggestions.

---

## 🛠️ Tech Stack

This project is built with a modern and robust technology stack:

* **Frontend**: React.js, Tailwind CSS
* **Backend**: Node.js, Express.js
* **Database**: Serverless PostgreSQL by Neon
* **Authentication & Subscriptions**: Clerk
* **API Communication**: Axios
* **AI Integrations**: Third-party Generative AI APIs
* **Deployment**: Vercel

---

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

* Node.js (v18 or later)
* npm or yarn
* A Neon account for the PostgreSQL database
* A Clerk account for authentication and billing

### Installation

1.  **Clone the repository:**
    ```sh
    git clone [https://github.com/your-username/quick-ai.git](https://github.com/your-username/quick-ai.git)
    cd quick-ai
    ```

2.  **Install backend dependencies:**
    ```sh
    cd server
    npm install
    ```

3.  **Install frontend dependencies:**
    ```sh
    cd ../client
    npm install
    ```

### Environment Variables

To run this project, you will need to add the following environment variables to a `.env` file in both the `server` and `client` directories.

**Server (`/server/.env`):**

DATABASE_URL="your_neon_database_url"
CLERK_SECRET_KEY="your_clerk_secret_key"
AI_API_KEY="your_generative_ai_api_key"

**Client (`/client/.env`):**

VITE_CLERK_PUBLISHABLE_KEY="your_clerk_publishable_key"


## Usage

1.  **Start the backend server:**
    ```sh
    cd server
    npm start
    ```
    The server will run on `http://localhost:5000` (or the port you configure).

2.  **Start the frontend development server:**
    ```sh
    cd client
    npm run dev
    ```
    The application will be available at `http://localhost:5173`.

---

## 📂 Project Structure

The project is organized into a monorepo structure with two main directories:
Of course. Here is the complete content from the document formatted as a single block of Markdown text. You can copy this and save it directly into a file named README.md in your GitHub repository.

Markdown

# Quick.ai - AI-Powered SaaS Platform

Quick.ai is a full-stack AI Software as a Service (SaaS) application built with the PERN stack. It provides users with a suite of powerful generative AI tools, accessible through a secure subscription-based model.

*(Replace the placeholder above with a screenshot or GIF of your application)*

---

## ✨ Key Features

Quick.ai offers a range of features designed to boost creativity and productivity:

* **User Authentication**: Secure sign-up, sign-in, and profile management powered by **Clerk**.
* **Subscription Billing**: Premium subscriptions managed through **Clerks billing features** to unlock access to advanced AI capabilities.
* **Article Generator**: Generate high-quality articles by simply providing a title and desired length.
* **Blog Title Generator**: Get catchy and SEO-friendly blog titles from a keyword and category.
* **Image Generator**: Create stunning visuals from a text prompt using generative AI.
* **Background Remover**: Upload an image to automatically get a transparent background.
* **Image Object Remover**: Remove unwanted objects from any image by describing them.
* **Resume Analyzer**: Upload a resume to receive a comprehensive analysis and improvement suggestions.

---

## 🛠️ Tech Stack

This project is built with a modern and robust technology stack:

* **Frontend**: React.js, Tailwind CSS
* **Backend**: Node.js, Express.js
* **Database**: Serverless PostgreSQL by Neon
* **Authentication & Subscriptions**: Clerk
* **API Communication**: Axios
* **AI Integrations**: Third-party Generative AI APIs
* **Deployment**: Vercel

---

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

* Node.js (v18 or later)
* npm or yarn
* A Neon account for the PostgreSQL database
* A Clerk account for authentication and billing

### Installation

1.  **Clone the repository:**
    ```sh
    git clone [https://github.com/your-username/quick-ai.git](https://github.com/your-username/quick-ai.git)
    cd quick-ai
    ```

2.  **Install backend dependencies:**
    ```sh
    cd server
    npm install
    ```

3.  **Install frontend dependencies:**
    ```sh
    cd ../client
    npm install
    ```

### Environment Variables

To run this project, you will need to add the following environment variables to a `.env` file in both the `server` and `client` directories.

**Server (`/server/.env`):**

DATABASE_URL="your_neon_database_url"
CLERK_SECRET_KEY="your_clerk_secret_key"
AI_API_KEY="your_generative_ai_api_key"

Add any other backend-specific variables

**Client (`/client/.env`):**

VITE_CLERK_PUBLISHABLE_KEY="your_clerk_publishable_key"

Add any other frontend-specific variables

---

## Usage

1.  **Start the backend server:**
    ```sh
    cd server
    npm start
    ```
    The server will run on `http://localhost:5000` (or the port you configure).

2.  **Start the frontend development server:**
    ```sh
    cd client
    npm run dev
    ```
    The application will be available at `http://localhost:5173`.

---

## 📂 Project Structure

The project is organized into a monorepo structure with two main directories:

/
├── client/         # React Frontend
│   ├── src/
│   └── ...
├── server/         # Node.js & Express Backend
│   ├── controllers/
│   ├── routes/
│   └── index.js
└── README.md

---

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

---

## 👤 Author

**[Your Name]**

* GitHub: [@your-username](https://github.com/HarshAgrawal7672)
* LinkedIn: [linkedin.com/in/your-profile](https://linkedin.com/in/HarshAgrawal7672)

# VibeBlog - Modern Full-Stack Blog Generator

VibeBlog is a professional, high-performance blog platform featuring a sleek **Modern Minimalist** aesthetic with a cinematic **Dark Mode** and generative WebGL backgrounds. It allows users to create, edit, search, and manage blog posts with real-time UI updates.


## ✨ Key Features

-   **🌑 Cinematic Dark Mode:** A premium dark UI featuring glassmorphism and deep textures.
-   **🎨 Generative Background:** Integrated `DarkVeil` component using WebGL (OGL) for subtle, textured animations.
-   **🔍 Smart Search:** Filter stories instantly by title or category.
-   **🖼️ Unsplash Integration:** Automatically converts Unsplash page links into high-quality direct image sources.
-   **📱 Full Canvas Layout:** Immersive ultra-wide design that adapts to any screen size.
-   **⚡ Full-Stack CRUD:** Fully functional Create, Read, Update, and Delete operations via Express.js and React.

## 🛠️ Tech Stack

-   **Frontend:** React (Vite), React Router, OGL (WebGL), Vanilla CSS.
-   **Backend:** Node.js, Express.js.
-   **Storage:** Persistent JSON-based database for lightweight management.

## 🚀 Getting Started

Follow these steps to get the project running on your local machine.

### Prerequisites

-   [Node.js](https://nodejs.org/) (v16 or higher)
-   npm (comes with Node.js)

### 1. Clone the Repository

```bash
git clone https://github.com/IamGeniusORG/Blog-Generator.git
cd Blog-Generator
```

### 2. Setup the Backend

```bash
cd server
npm install
npm start
```
The server will run on `http://localhost:5000`.

### 3. Setup the Frontend

Open a new terminal and navigate to the client folder:

```bash
cd client
npm install
npm run dev
```
The application will be available at the URL provided by Vite (usually `http://localhost:5173`).

## 📁 Project Structure

-   `/client`: React frontend application.
-   `/server`: Node.js/Express backend API.
-   `/server/data.json`: The database file where your posts are stored.

## 📝 License

This project is open-source and free to use.

---
Created with ❤️ by Gemini CLI & IamGenius

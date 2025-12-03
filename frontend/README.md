# FocusFlow Frontend

This is the frontend for the FocusFlow application, a productivity tool designed to help you manage tasks and stay focused. It's built with React, Vite, and Tailwind CSS, and it's designed to be a fully responsive single-page application (SPA). It is also configured to be deployed as a native mobile app using Capacitor.

## Getting Started

### Prerequisites

-   Node.js (v18 or higher recommended)
-   A running instance of the [FocusFlow API](../backend)

### Installation and Setup

1.  **Clone the repository and install dependencies:**

    ```bash
    git clone https://github.com/your-username/focusflow.git
    cd focusflow/frontend
    npm install
    ```

2.  **Set up environment variables:**

    Create a `.env` file in the `frontend` directory and add the URL of your backend API.

    ```
    VITE_API_URL=http://localhost:3001
    ```

### Available Scripts

-   **Development:**
    ```bash
    npm run dev
    ```
    Starts the development server with hot-reloading.

-   **Production Build:**
    ```bash
    npm run build
    ```
    Bundles the app for production.

-   **Linting:**
    ```bash
    npm run lint
    ```
    Lints the source code using ESLint.

-   **Preview Production Build:**
    ```bash
    npm run preview
    ```
    Serves the production build locally for previewing.

## Core Technologies

-   **React**: A JavaScript library for building user interfaces.
-   **Vite**: A fast build tool and development server.
-   **Tailwind CSS**: A utility-first CSS framework for rapid UI development.
-   **Capacitor**: A tool for building cross-platform mobile apps with web technologies.
-   **React Router**: For client-side routing.
-   **Axios**: For making HTTP requests to the backend API.
-   **ESLint**: For code linting and maintaining code quality.

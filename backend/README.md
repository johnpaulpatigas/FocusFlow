# FocusFlow API

This is the backend API for the FocusFlow application. It's built with Node.js, Express, and uses Supabase for database and authentication services.

## Getting Started

### Prerequisites

-   Node.js (v18 or higher recommended)
-   A Supabase project

### Installation and Setup

1.  **Clone the repository and install dependencies:**

    ```bash
    git clone https://github.com/your-username/focusflow.git
    cd focusflow/backend
    npm install
    ```

2.  **Set up environment variables:**

    Create a `.env` file in the `backend` directory and add your Supabase credentials. You can find these in your Supabase project's API settings.

    ```
    SUPABASE_URL=your_supabase_url
    SUPABASE_SERVICE_KEY=your_supabase_service_key
    PORT=3001
    ```

3.  **Set up the database:**

    Log in to your Supabase account and execute the SQL scripts found in the `backend` directory to create the necessary tables:

    -   `profiles.sql`
    -   `tasks.sql`
    -   `focus_sessions.sql`

### Running the API

-   **Development:**
    ```bash
    npm run dev
    ```
    This will start the server with `nodemon`, which automatically restarts the server on file changes.

-   **Production:**
    ```bash
    npm start
    ```

## API Endpoints

All protected endpoints require a valid JWT in the `Authorization` header (`Bearer <token>`).

### Authentication

-   `POST /signup`: Register a new user.
-   `POST /login`: Log in a user.
-   `PUT /auth/password`: Update the password for the logged-in user.
-   `GET /auth/google`: Initiate Google OAuth for web.
-   `POST /auth/google/native`: Handle Google OAuth for mobile.

### Profile

-   `GET /profile`: Get the profile of the logged-in user.
-   `PUT /profile`: Update the profile of the logged-in user.

### Tasks

-   `GET /tasks`: Get all tasks for the logged-in user. Can be filtered by `status`.
-   `POST /tasks`: Create a new task.
-   `PUT /tasks/:id`: Update a task.
-   `PATCH /tasks/:id/status`: Update the status of a task.
-   `DELETE /tasks/:id`: Delete a task.

### Focus Sessions

-   `POST /focus-sessions`: Create a new focus session.

### Dashboard & Progress

-   `GET /dashboard-stats`: Get statistics for the main dashboard.
-   `GET /progress-stats`: Get statistics for the progress page.

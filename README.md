# Job Portal - Frontend

This is the frontend for the Job Portal application, a modern and responsive web platform designed to connect job seekers with employers. Users can browse job listings, apply for positions, and manage their profiles, while employers can post and manage job openings.

Built with a modern tech stack including React, Vite, Redux Toolkit, and Material-UI, this application is optimized for performance, developer experience, and scalability.

##  Features

- **Job Seeker Features:**
  - Browse and search for jobs with advanced filters.
  - View detailed job descriptions.
  - User registration and authentication.
  - Apply for jobs directly through the platform.
- **Employer Features:**
  - Post new job openings.
  - Manage and update existing job listings.
  - View applications from candidates.
- **General Features:**
  - Responsive design that works on desktop and mobile devices.
  - Fast and interactive user interface.
  - Real-time notifications for application status and new messages.

##  Tech Stack

- **Core Framework:** [React](https://react.dev/)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **UI Library:** [Material-UI (MUI)](https://mui.com/)
- **Styling:** [Emotion](https://emotion.sh/)
- **State Management:** [Redux Toolkit](https://redux-toolkit.js.org/)
- **Routing:** [React Router](https://reactrouter.com/)
- **Form Management:** [React Hook Form](https://react-hook-form.com/) & [Yup](https://github.com/jquense/yup) for validation
- **API Communication:** [Axios](https://axios-http.com/)
- **Notifications:** [Sonner](https://sonner.emilkowal.ski/)
- **Linting:** [ESLint](https://eslint.org/)

##  Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Make sure you have the following installed on your system:
- Node.js (v18.x or later recommended)
- npm (or yarn/pnpm)

### Installation

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/your-username/your-repo-name.git
    cd your-repo-name/frontend
    ```

2.  **Install dependencies:**
    ```sh
    npm install
    ```

3.  **Set up environment variables:**

    Create a `.env` file in the `frontend` directory by copying the example file:
    ```sh
    cp .env.example .env
    ```

    Update the `.env` file with the necessary environment variables, such as the backend API URL:
    ```env
    VITE_API_BASE_URL=http://localhost:8000/api
    ```

### Running the Application

To run the application in development mode with hot-reloading:

```sh
npm run dev
```

The application will be available at `http://localhost:5173`.

## 📜 Available Scripts

In the project directory, you can run:

- `npm run dev`: Runs the app in development mode.
- `npm run build`: Builds the app for production to the `dist` folder.
- `npm run lint`: Lints the project files using ESLint.
- `npm run preview`: Serves the production build locally to preview it.

##  Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**. Please read the contributing guidelines before you start.

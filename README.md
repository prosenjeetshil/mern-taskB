# TaskB – MERN Todo Application

A production-ready Todo Management application built using the **MERN stack** featuring JWT authentication, pagination, server-side search, and a modern dark-themed UI.

This project was developed as part of a joining assignment and follows real-world backend + frontend practices, including API security, modular architecture, and deployment-ready configuration.

---

## Live Demo

* **Frontend (Vercel):** [https://mern-task-b.vercel.app](https://mern-task-b.vercel.app)
* **Backend (API):** [https://mern-taskb.onrender.com/api/v1](https://mern-taskb.onrender.com/api/v1)

---

## Tech Stack

### Frontend
* **React.js** (Create React App)
* **React Router DOM** (Navigation)
* **Axios** (with interceptors for auth)
* **Bootstrap 5** (Styling)
* **Font Awesome** (Icons)
* **React Hot Toast** (Notifications)

### Backend
* **Node.js & Express.js**
* **MongoDB + Mongoose** (Database & Modeling)
* **JWT Authentication** (Security)
* **bcryptjs** (Password Hashing)
* **dotenv** (Environment Management)
* **Morgan** (HTTP Request Logging)

### Deployment
* **Frontend:** Vercel
* **Backend:** Render
* **Database:** MongoDB Atlas

---

## Features

### Authentication
* User registration with form validation.
* Secure user login using **JWT (JSON Web Tokens)**.
* Protected routes via authentication middleware.
* Secure token-based authorization for all data requests.

### Todo Management
* Full **CRUD** functionality (Create, Read, Update, Delete).
* Toggle status between **Completed** and **Pending**.
* User-specific data isolation (Users only see their own tasks).
* Strict input validation for titles and descriptions.

### Search & Pagination
* **Server-side Search:** Filter todos by title via API queries.
* **Pagination:** Efficient data fetching with page navigation.
* **Optimized Queries:** Uses MongoDB `skip()` and `limit()` for performance.

### UI / UX
* **Dark Theme:** Modern SaaS-inspired aesthetic.
* **Responsive Design:** Fully mobile-friendly layout using Bootstrap.
* **Feedback:** Real-time validation feedback and toast notifications.

---

## Project Structure

```bash
MERN-TASKB/
│
├── client/                  # React frontend
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   │   ├── api.js
│   │   │   ├── AuthServices.js
│   │   │   ├── TodoServices.js
│   │   │   └── RequireAuth.js
│   │   ├── styles/
│   │   ├── utils/
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
│
├── server/                  # Node + Express backend
│   ├── config/
│   │   └── db.js
│   ├── models/
│   │   ├── userModel.js
│   │   └── todoModel.js
│   ├── routes/
│   │   ├── userRoute.js
│   │   └── todoRoute.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── server.js
│   └── package.json
│
└── README.md
```
---


## API Overview

### Authentication Routes
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/v1/user/register` | Register a new user |
| `POST` | `/api/v1/user/login` | Login and receive JWT |

### Todo Routes (Protected)
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/v1/todo/create` | Create a new task |
| `GET` | `/api/v1/todo/get-all` | Get all tasks (Supports `?page=&limit=&search=`) |
| `PUT` | `/api/v1/todo/update/:id` | Edit task or status |
| `DELETE` | `/api/v1/todo/delete/:id` | Remove a task |

---

## JWT Authentication Flow

1. **Login:** User submits credentials; Backend validates and signs a JWT.
2. **Storage:** Token is stored securely in `localStorage`.
3. **Interceptor:** Axios interceptor automatically attaches the token to the `Authorization` header for every request.
4. **Verification:** Backend middleware verifies the token before granting access to protected routes.
5. **Protection:** Unauthorized requests (401) trigger a redirect to the login page.

---

## Environment Variables

To run the server, create a `.env` file in the `/server` directory and add the following:

```env
PORT=8080
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

---

## Running Locally

### Clone the repository
```bash
git clone https://github.com/your-username/mern-taskb.git
cd mern-taskb
```

### Install backend dependencies
```bash
cd server
npm install
```

### Install frontend dependencies
```bash
cd ../client
npm install
```

### Run both client & server
```bash
cd ../server
npm run server

cd ../client
npm start
```

## Access the application

* **Frontend:** [http://localhost:3000/](http://localhost:3000/)
* **Backend:** [http://localhost:8080/](http://localhost:8080/)

---

## Key Learnings

1. Monorepo deployment handling
2. Axios interceptors for centralized auth handling
3. JWT-based protected routes
4. Production debugging on Vercel
5. Clean separation of concerns
6. Pagination & search with MongoDB
   
---

## Future Enhancements

1. Refresh token implementation
2. Sidebar navigation
3. Filters (Completed / Pending)
4. Unit & integration testing
5. Role-based access control
6. Backend health check endpoint
   
---

## Author

**Prosenjeet Shil**  
*Software Developer*

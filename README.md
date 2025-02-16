# Quiz Management System

## Project Overview
This is a web-based Quiz Management System designed to help teachers create, manage, and view quizzes efficiently. The platform allows teachers to log in, create quizzes, edit quizzes, and delete them with ease.

### Features and Functionalities:
- **User Authentication:** Static login credentials for teacher authentication.
- **Quiz Management:** Teachers can create, edit, and delete quizzes.
- **Dashboard:** A centralized view of all quizzes created by the logged-in teacher.
- **Responsive Design:** The application is optimized for both mobile and desktop users.

## Technologies Used
### Frontend:
- **React** - For building the user interface.
- **ShadCN UI** - For modern and responsive UI components.
- **Axios/Fetch API** - For API communication.

### Backend:
- **Node.js & Express.js** - For handling API requests and business logic.
- **MySQL** - To store user credentials and quiz details.

## Folder Structure - backend
```
📂 middleware
 ├── auth.js
📂 routes
 ├── quizzes.js
 ├── user.js
.env
app.js
db.js
index.js
package.json
package-lock.json

```
## Folder Structure - UI
```
📂 public
📂 src
.gitignore
components.json
eslint.config.js
index.html
jsconfig.json
postcss.config.js
README.md
tailwind.config.js
vite.config.js
```

## Setup & Installation
### Prerequisites
Ensure you have the following installed:
- **Node.js** (Latest version)
- **MySQL** (For database storage)

### Installation Steps
1. **Clone the repository**
   ```sh
   git clone <repository_url>
   ```
2. **Install dependencies**
   ```sh
   npm install
   ```

### Start the Project
- **Backend**
  ```sh
  nodemon app.js
  ```
- **Frontend**
  ```sh
  npm run dev
  ```

### Dependencies Used
#### Frontend:
- lucide-react: ^0.475.0
- react: ^19.0.0
- react-dom: ^19.0.0
- react-hook-form: ^7.54.2
- react-router-dom: ^7.1.5
- tailwind-merge: ^3.0.1
- tailwindcss-animate: ^1.0.7
- zod: ^3.24.2

#### Backend:
- bcrypt: ^5.1.1
- body-parser: ^1.20.3
- cookie-parser: ^1.4.7
- cors: ^2.8.5
- dotenv: ^16.4.7
- express: ^4.21.2
- express-mysql-session: ^3.0.3
- express-session: ^1.18.1
- mysql2: ^3.12.0
- nodemon: ^3.1.9


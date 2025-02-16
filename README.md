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
   git clone https://github.com/manjreka/Quizo.git
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

Environment Variables
Create a .env file in the root directory and add the following variables:
DB_HOST=localhost
DB_USER=root
DB_PASS=6dg7AXD?F/)XnjV
DB_NAME=quizApp
PORT = 5000


Authentication Details
Username: teacher2
Password: Teach@456


API Endpoints

Get all quizzes (Protected Route)
Request:
Method: GET
Endpoint: /getQuiz
Headers: { Cookie: session_id }

Response:
Success: 200 OK, returns quizzes list
Error: 401 Unauthorized - User not authenticated
Error: 500 Internal Server Error - Database query failed

Get a single quiz by ID (Protected Route)
Request:
Method: GET
Endpoint: /getQuiz/:id
Headers: { Cookie: session_id }

Response:
Success: 200 OK, returns quiz details
Error: 401 Unauthorized - User not authenticated
Error: 404 Not Found - Quiz not found
Error: 500 Internal Server Error - Database query failed

Create a quiz (Protected Route)
Request:
Method: POST
Endpoint: /create
Headers: { Cookie: session_id, Content-Type: application/json }
Body: { title: string, description: string }

Response:
Success: 201 Created, { message: "Quiz created successfully", quizId }
Error: 401 Unauthorized - User not authenticated
Error: 500 Internal Server Error - Database insert failed

Edit a quiz (Protected Route)
Request:
Method: PUT
Endpoint: /edit/:id
Headers: { Cookie: session_id, Content-Type: application/json }
Body: { title: string, description: string }

Response:
Success: 200 OK, { message: "Quiz updated successfully" }
Error: 401 Unauthorized - User not authenticated
Error: 404 Not Found - Quiz not found or unauthorized
Error: 500 Internal Server Error - Database update failed

Delete a quiz (Protected Route)
Request:
Method: DELETE
Endpoint: /delete/:id
Headers: { Cookie: session_id }

Response:
Success: 200 OK, { message: "Quiz deleted successfully" }
Error: 401 Unauthorized - User not authenticated
Error: 404 Not Found - Quiz not found or unauthorized
Error: 500 Internal Server Error - Database delete failed

Logout
Request:
Method: GET
Endpoint: /logout

Response:
Success: 200 OK, { message: "Logged out successfully" }
Error: 500 Internal Server Error - Logout process failed

### Usage Guide (How to Use the Application)  

1. Login  
   - Use the provided credentials to log in.  
   - Upon successful login, you’ll be redirected to the Dashboard.  

2. Dashboard  
   - Displays a list of quizzes using a ShadCN data table.  
   - Each quiz has an ellipsis (`⋮`) menu with options to View, Edit, or Delete.  
   - A "Create Quiz" button allows users to add a new quiz.  

3. Creating a Quiz  
   - Click "Create Quiz," and a ShadCN form will open.  
   - Enter the Title and Description.  
   - Click CREATE to save the quiz.  
   - On success, a toast notification appears, and the user is redirected to the Dashboard, where the new quiz is listed.  

4. Editing a Quiz  
   - Click the ellipsis (`⋮`) menu on a quiz and select Edit.  
   - Modify the Title or Description.  
   - Click UPDATE, and a success or error toast appears based on the response.  

5. Deleting a Quiz  
   - Click the ellipsis (`⋮`) menu on a quiz and select Delete.  
   - A toast notification confirms deletion, and the list updates automatically.  

6. Viewing a Quiz  
   - Click View in the ellipsis (`⋮`) menu.  
   - The quiz details, including Title, Description, Date, and Time, are displayed using a ShadCN view table.  

Technologies Used for UI  
   1. ShadCN Data Table – For displaying quizzes.  
   2. ShadCN Form – For quiz creation and editing.  
   3. ShadCN Toast – For success or error messages.  

This guide helps you navigate and use the application efficiently after setup. Let me know if you need modifications.











# User Management Dashboard

## Project Overview
The **User Management Dashboard** is a simple web application that allows users to view, add, edit, and delete user details. The application interacts with a mock backend API (JSONPlaceholder) to perform these operations. It is built using React.js for the frontend and Node.js for the backend.

Demo video Link: https://jmp.sh/fkWSAmKg
## Features
- Display a list of users with details such as ID, First Name, Last Name, Email, and Department.
- Add new users.
- Edit existing user details.
- Delete users.
- Handle API request errors gracefully.
- pagination
- client-side validation 
- responsive design.

## Technology Stack
- **Frontend:** React.js
- **Backend:** Node.js
- **HTTP Requests:** Axios
- **Mock API:** JSONPlaceholder

## Prerequisites
- Node.js installed on your machine.
- npm (Node package manager).

## Project Structure
The project consists of two main folders:
1. **client**: Contains the React.js frontend code.
2. **backend**: Contains the Node.js backend code.

## Getting Started

### Setting Up the Client
1. Navigate to the `client` folder:
   ```bash
   cd client

2. Install the required node modules:
   npm install

3. Start the client application:
   npm run dev

### Setting Up the Backend
1. Navigate to the `backend` folder:
   cd backend

2. Install the required node modules:
   npm install

3. Start the backend server:
   npm start

### Environment Variables
The login credentials for the admin are stored in a .env file in the backend folder. Create a .env file and add your credentials in the following format:

ADMIN_USERNAME=your_admin_username
ADMIN_PASSWORD=your_admin_password

### Usage
Once both the client and backend servers are running, you can access the User Management Dashboard through your web browser. Use the login credentials specified in the .env file to log in to the admin portal.

### API Endpoints
The application uses the following API endpoints:

View Users: GET `/api/v1/user`
Add User: POST `/api/v1/user/add`
Edit User: POST `/api/v1/user/edit`
Delete User: DELETE `/api/v1/user/delete/:id`

### Error Handling
The application includes robust error handling mechanisms. The following status codes are used to indicate the type of error:

- 200 (Success): The request was successful, and the server responded with the requested data.
- 201 (Created): A new resource was successfully created.
- 400 (Bad Request): The request was invalid or cannot be served. This could be due to missing required fields or other validation errors.
- 404 (Not Found): The requested resource could not be found. This could happen if the user ID does not exist.
- 500 (Internal Server Error): An unexpected condition was encountered, preventing the server from fulfilling the request.

### Conclusion
The User Management Dashboard is a robust, modular, and scalable application designed to manage user details efficiently. With a clean UI and a focus on functionality, it serves as a practical example of a full-stack web application.

### Author
Kalpesha Pingale


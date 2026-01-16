# WTWR (What to Wear?): Back End

## Project Overview

WTWR (What to Wear?) is a back-end server for a clothing recommendation application. The server provides a RESTful API that allows users to manage their wardrobe, track clothing items, and interact with other users' clothing collections. This is a full-featured Express.js backend with user authentication, authorization, and database persistence.

## Project Functionality

The application provides the following core features:

- **User Authentication**: User signup and login with secure password hashing using bcryptjs
- **User Profiles**: View and update user profile information (name and avatar)
- **Clothing Item Management**: Create, retrieve, and delete clothing items from a wardrobe
- **Item Categorization**: Organize items by weather conditions (hot, warm, cold)
- **Like/Unlike System**: Users can like and unlike clothing items from other users
- **Authorization & Ownership**: Protected routes with JWT-based authorization and ownership verification for item deletion
- **Error Handling**: Comprehensive error handling with standardized HTTP status codes

## Technologies & Techniques Used

### Core Technologies

- **Node.js & Express.js (v4.21.2)**: Web framework for building the REST API
- **MongoDB**: NoSQL document database for data persistence
- **Mongoose (v8.20.1)**: Object Data Modeling (ODM) library for MongoDB schema validation and querying

### Authentication & Security

- **bcryptjs**: Password hashing with salted encryption
- **CORS**: Cross-Origin Resource Sharing enabled for frontend integration
- **Bearer Token Authentication**: Authorization middleware for protecting API routes

### Code Quality & Development

- **ESLint**: Code linting with Airbnb base configuration for consistent code style
- **Validator.js**: Email and URL validation

### Project Structure

- **Models**: User and ClothingItem schemas with validation
- **Controllers**: Business logic for user and item operations
- **Routes**: API endpoint definitions and route handlers
- **Middlewares**: Custom JWT authentication middleware
- **Utils**: Centralized error codes and configuration management

## Running the Project

`npm run start` — to launch the server 

`npm run dev` — to launch the server with the hot reload feature

project video link- https://drive.google.com/drive/folders/1tjGv0Mkcbs3QYh8Nwe--VonPG6f3XpC5?usp=sharing

frontend:https://github.com/L30nt1u5/se_project_react.git

backtend:://github.com/L30nt1u5/se_project_express.git 
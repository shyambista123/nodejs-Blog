# Blog Sharing Application using Node.js, Express, EJS, PostgreSQL, and Sequelize

## Introduction

This project focuses on developing a blog sharing application using Node.js, Express, EJS, PostgreSQL, and Sequelize. Key features include robust user authentication, authorization, and exclusive blog editing and deletion for owners.

## Features Implemented

1. **User Authentication and Authorization:**
   - Secure user authentication for registration, login, and logout.
   - User roles: regular users and blog owners.
   - Authorization mechanisms restrict access based on roles.

2. **Blog Operations:**
   - CRUD operations for blogs (Create, Read, Update, Delete).
   - Only blog owners can edit or delete their specific blogs.

3. **Database Integration:**
   - PostgreSQL backend database for secure storage.
   - Sequelize ORM manages relationships between users and blogs.

4. **UI/UX Design:**
   - Intuitive and user-friendly interface designed with EJS templates.
   - Responsive design ensures optimal user experience on various devices.

## Technology Stack

- **Backend:**
  - Node.js: Server-side JavaScript runtime.
  - Express: Web application framework.
  - Sequelize: ORM tool for PostgreSQL interaction.

- **Frontend:**
  - EJS: Templating engine for dynamic content rendering and CSS for styling.

- **Database:**
  - PostgreSQL: RDBMS for secure user and blog data storage.

## Project Structure

- **Models:**
  - Sequelize models for Users and Blogs.

- **Routes:**
  - Defined routes and implemented logic for handling HTTP requests.

- **Views:**
  - EJS templates for dynamic content rendering.

- **Migrations:**
  - Migration files in the `migrations` directory.

- **Database Configuration:**
  - Configurations in the `config` directory.

## Project Setup Instructions

1. **Clone the project:**
    - Clone project
   ``` git clone https://github.com/shyambista123/nodejs-Blog.git ```
    - Navigate to the project directory
    ```cd nodejs-Blog```
    - Install packages
    ```npm install```
    - Migrate 
    ```npx sequelize-cli db:migrate```
    - Run project
    ```node app.js```

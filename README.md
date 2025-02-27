# Pet-Food-Store-Backend

## Introduction
The **CrunchyPaws** backend is built using **Node.js, TypeScript, Express, and Prisma with MySQL** to provide a secure and efficient API for managing pet food products. It handles authentication, user roles, and CRUD operations for dog and cat food. The API is secured with **JWT and refresh tokens**, ensuring data integrity and secure access.

This backend ensures smooth data management and API responses, making **CrunchyPaws** a reliable pet food store platform.

## Technologies Used
- **Node.js**
- **Express.js**
- **TypeScript**
- **MySQL with Prisma ORM**
- **JWT (JSON Web Tokens)**
- **Multer (File Uploading Middleware)**

## Features
- **Admin Features:** Add, update, and delete cat and dog food items.
- **User Access:** View available pet food products without modification privileges.
- **Authentication:** Secure login with JWT and refresh tokens.

## Frontend Repository Link
[CrunchyPaws Frontend Repository](https://github.com/yasith-chathuranga/pet-food-store-frontend.git)

## License
This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

## Getting Started

### Prerequisites
To run this project, ensure you have the following installed:
- **Node.js**
- **TypeScript**
- **MySQL**
- **An IDE (Integrated Development Environment)**

### Running the Application
1. **Clone the repository:**
   ```bash
   git clone https://github.com/yasith-chathuranga/pet-food-store-backend.git
   cd pet-food-store-backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Update the `.env` file** with your MySQL database credentials and secret keys:
   ```env
   DATABASE_URL="mysql://root:yourpassword@localhost:3306/dbname"
   SECRET_KEY=your_secret_key
   REFRESH_KEY=your_refresh_key
   ```

4. **Create a `uploads` directory** for image storing:
   ```bash
   mkdir uploads
   ```

5. **Run database migrations:**
   ```bash
   npx prisma migrate dev
   ```

6. **Start the application:**
   ```bash
   npm run dev
   ```

##
<div align="center">
<a href="https://nodejs.org/en/" target="_blank"><img src="https://img.shields.io/badge/Node.js-100000?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js Badge" /></a>
<a href="https://expressjs.com/" target="_blank"><img src="https://img.shields.io/badge/Express.js-100000?style=for-the-badge&logo=express&logoColor=white" alt="Express.js Badge" /></a>
<a href="https://www.typescriptlang.org/" target="_blank"><img src="https://img.shields.io/badge/TypeScript-100000?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript Badge" /></a>
<a href="https://www.mysql.com/downloads/" target="_blank"><img src="https://img.shields.io/badge/Mysql-100000?style=for-the-badge&logo=mysql&logoColor=white"></a>
<a href="https://www.prisma.io/" target="_blank"><img src="https://img.shields.io/badge/Prisma-100000?style=for-the-badge&logo=prisma&logoColor=white" alt="Prisma Badge" /></a>
<a href="https://jwt.io/" target="_blank"><img src="https://img.shields.io/badge/JWT-100000?style=for-the-badge&logo=json-web-tokens&logoColor=white" alt="JWT Badge" /></a>
<a href="https://www.npmjs.com/package/multer" target="_blank"><img src="https://img.shields.io/badge/Multer-100000?style=for-the-badge&logo=npm&logoColor=white" alt="Multer Badge" /></a>
<a href="https://github.com/yasith-chathuranga" target="_blank"><img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white"></a>
<a href="https://git-scm.com/" target="_blank"><img src="https://img.shields.io/badge/Git-100000?style=for-the-badge&logo=git&logoColor=white"></a>
</div>

<br>
<p align="center">
  &copy; 2025 Yasith Chathuranga
</p>
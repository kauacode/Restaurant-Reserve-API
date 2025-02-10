
# 🍽️ RESTAURANT MANAGEMENT API

## 📌 Restaurant Reservation API  
This is a **Node.js** API built with **TypeScript**, Express, and Sequelize for managing restaurant reservations. It includes various features that allow users and administrators to efficiently book tables, check availability, and manage reservations. The API offers:
```sh
User Authentication:

Users can register and log in to the system using JWT (JSON Web Tokens) for secure authentication.
JWT is used to generate access tokens that allow users to access protected endpoints such as creating or canceling reservations.
Table Management:

Administrators can manage tables in the restaurant, including their availability and capacity.
The API allows creating new tables, updating existing ones, and deleting tables if necessary.
Each table has attributes like availability, capacity, and status (whether it's available, reserved, etc.).
Reservation System:

Users can create reservations by selecting a table and booking a time slot.
They can also check the availability of tables before making a reservation.
Administrators have access to all reservations, including the ability to cancel or modify them.
Data Validation:

Zod is used for validating incoming data, such as ensuring that reservation times are in the correct format and that tables are being booked correctly.
API Documentation with Swagger:

Swagger is integrated to automatically generate detailed API documentation, making it easier for developers to understand and test the API's endpoints.
It provides an interactive UI for exploring the API, viewing descriptions of each endpoint, and testing the endpoints directly.
Database Integration:

The API integrates with a MySQL database using Sequelize to handle the persistence of data such as tables, reservations, and user information.
The database schema is designed to store essential information about tables, reservations, and users, with relationships to ensure data integrity.
```

## 🚀 Features  
✅ User authentication (JWT-based).  
✅ Table management (availability, capacity, and status).  
✅ Reservation system (CRUD operations).  
✅ Data validation with **Zod**.  
✅ API documentation with **Swagger**.  

## ⚙️ Installation & Setup  
```sh
To get started with this project, follow the steps below.

1️⃣ **Install Node.js**  
Before starting, make sure you have **Node.js** installed. You can download and install the latest version of Node.js from the official website: [Node.js Official Website](https://nodejs.org/).  

2️⃣ **Install TypeScript**  
You also need **TypeScript** installed globally. Run the following command in your terminal:
npm install -g typescript

3️⃣ Clone the repository  
git clone https://github.com/kauacode/Restaurant-Reserve-API.git
cd restaurant-reserve

4️⃣ Install dependencies
npm install

5️⃣️ Configure environment variables
Create a .env file based on .env.example:
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=restaurant_reserve
JWT_SECRET=your_secret_key
PORT=3000

6️⃣️ Database Setup
To create the database and tables, execute one of the following methods:

📌 Method 1: Using the SQL dump
Run the following command in your terminal:
mysql -u root -p < database.sql
This will automatically create the database and tables.

📌 Method 2: Creating the database manually
If you prefer to create it manually:
Access MySQL Workbench or the MySQL terminal.
Create the database:
CREATE DATABASE restaurant_reserve;
Select the database and run the database.sql dump.

7️⃣️ Start the application
Development mode:
npm run dev
Production mode:
npm run build && npm start
```
## 🔄 API Endpoints
🧑 User Authentication
| Method | Endpoint | Description | ADMIN |
|---|---|---|---|
| `POST` | http://localhost:3333/usuarios/registrar | CREATE USER | ❌ |
| `POST` | http://localhost:3333/usuarios/login | LOGIN | ❌ |

🪑 Desk Routes
| Method | Endpoint | Description | ADMIN |
|---|---|---|---|
| `GET` | http://localhost:3333/mesas/ | LIST DESKS | ❌ |
| `POST` | http://localhost:3333/mesas/ | CREATE DESK | ✅ |
| `PATCH` | http://localhost:3333/mesas/{id} | UPDATE DESK | ❌ |
| `DELETE` | http://localhost:3333/mesas/ | DELETE DESK | ✅ |

📅 Reserve Routes
| Method | Endpoint | Description | ADMIN |
|---|---|---|---|
| `GET` | http://localhost:3333/reservas/ | LIST RESERVATIONS | ❌ |
| `POST` | http://localhost:3333/reservas/ | CREATE RESERVATION | ❌ |
| `PATCH` | http://localhost:3333/reservas/{id}/cancelar | CANCEL RESERVATION | ❌ |

## 📝 API Documentation with Swagger
```sh
Run the application.
Visit http://localhost:3333/api-docs/ in your browser.
Swagger allows you to explore the API endpoints, check their descriptions, and even test them directly from the UI. This is helpful for both developers and users of the API.
```

## 🛠 Technologies Used    
```sh
Node.js + Express
TypeScript
Sequelize + MySQL
Zod (Validation)
JWT (Authentication)
Swagger (API Documentation)
bcryptjs (Password hashing)
dotenv (Environment variables)
```

## 🏗 Future Improvements
```sh
Implement Docker containerization
Implement tests with Jest
Implement email notifications for reservations
Integrate a frontend for user-friendly interaction
```
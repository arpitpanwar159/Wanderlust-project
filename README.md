# Finance-Ready Backend Architecture (Project: Wanderlust)

This project is a full-stack implementation of a data management system. While the current UI is themed as a Travel platform ("Wanderlust"), the underlying backend architecture is designed to handle complex Finance Data Processing and Access Control, as per the Zorvyn assessment requirements.

## 🛠 How this Project Matches the Finance Assignment

This backend demonstrates the exact data flow and logic required for a Finance Dashboard:

### 1. Data Modeling (Financial Records vs. Listings)
- The Listing Model acts as the Financial Record Schema. 
- Price field functions as Transaction Amount.
- Category tags (e.g., Iconic Cities, Rooms) demonstrate the logic for Financial Categories (e.g., Salary, Rent).
- Each record is linked to an Owner (User), mirroring the traceability required in finance systems.

### 2. User & Access Control (RBAC)
- Authentication: Integrated Passport.js for secure user login/signup.
- Role-Based Logic: Implemented Authorization Middlewares (isLoggedIn, isOwner) that ensure:
  - Viewers: Can only browse data.
  - Admins/Owners: Can Create, Update, and Delete records.
- This structure is directly applicable to managing Admin, Analyst, and Viewer roles in a finance dashboard.

### 3. Dashboard Data Flow
- RESTful APIs: Clean routes to fetch and filter records.
- Aggregation Logic: The backend is structured to support data processing (e.g., summing up 'price' for total balance) using Mongoose queries.
- Validation: Used Joi for server-side schema validation, ensuring no invalid or incomplete financial data enters the database.

### 4. System Architecture (MVC)
- Model: Handles data integrity and schemas.
- View: EJS templates for dashboard visualization.
- Controller: Contains the core business logic, separating data processing from routing.

## 🚀 Technical Tech Stack

- Runtime: Node.js
- Framework: Express.js
- Database: MongoDB (Mongoose ODM)
- Security: Passport-Local, Express-Session, Connect-Flash
- Storage: Cloudinary (for attachment/bill uploads)

## ⚙️ Setup

1. npm install
2. Configure .env with ATLASDB_URL and SECRET.
3. node app.js
4. clone the Repo:
   ```bash
   git clone <https://github.com/arpitpanwar159/Wanderlust-project.git>

---
Author: Arpit Panwar  
Role: Backend Developer Intern (Applicant)

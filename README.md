# CareRide (SeniorGO)

A full-stack ride-booking platform designed for elderly and differently-abled passengers. CareRide lets users book rides with an optional caretaker, confirms trip completion via OTP sent to the passenger's email, and exposes admin-level visibility into all users, drivers, and caretakers.

---

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Features](#features)
- [Database Schema](#database-schema)
- [Backend – API Reference](#backend--api-reference)
  - [User Endpoints](#user-endpoints)
  - [Caretaker Endpoints](#caretaker-endpoints)
  - [Driver Endpoints](#driver-endpoints)
  - [Admin Endpoints](#admin-endpoints)
- [Frontend – Pages & Routes](#frontend--pages--routes)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [MySQL Setup](#mysql-setup)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Environment & Configuration](#environment--configuration)
- [Booking Flow](#booking-flow)
- [OTP Completion Flow](#otp-completion-flow)
- [Known Limitations](#known-limitations)
- [Deployment](#deployment)

---

## Overview

CareRide targets passengers who need assisted transportation — elderly individuals, wheelchair users, or anyone who requires a caretaker alongside their driver. The system automatically matches an available driver (and caretaker, if requested) when a ride is booked, calculates a randomised fare, and locks both the driver and caretaker as unavailable until the trip is marked complete.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Backend | Spring Boot 4.0.0, Java 21 |
| ORM | Spring Data JPA + Hibernate |
| Database | MySQL 8+ |
| Mail | Spring Boot Mail (Gmail SMTP) |
| Frontend | React 19, React Router DOM v7 |
| HTTP Client | Axios |
| Build Tool (BE) | Gradle |
| Build Tool (FE) | Create React App (react-scripts 5) |
| Deployment (FE) | GitHub Pages via gh-pages |

---

## Project Structure

```
CareRide/
├── BACKEND/
│   ├── build.gradle
│   ├── gradlew / gradlew.bat
│   └── src/main/java/com/example/demo/
│       ├── DemoApplication.java          # Spring Boot entry point
│       ├── WebConfig.java                # CORS configuration
│       ├── controller/
│       │   ├── AdminController.java      # Admin read-only endpoints
│       │   ├── UserController.java       # User auth, signup, booking
│       │   ├── CareTakerController.java  # Caretaker auth, signup, OTP flow
│       │   └── DriverController.java     # Driver auth, signup, OTP flow
│       ├── model/
│       │   ├── Users.java
│       │   ├── CareTakers.java
│       │   ├── Drivers.java
│       │   └── Bookings.java
│       ├── repository/
│       │   ├── UserRepo.java
│       │   ├── CareTakerRepo.java
│       │   ├── DriverRepo.java
│       │   └── BookingRepo.java
│       └── service/
│           └── AdminService.java         # Booking logic & fare calculation
│
└── FRONTEND/
    └── caretaker-app/
        └── src/
            ├── App.js                    # HashRouter + all routes
            └── components/
                ├── Login.js              # Shared login page (user/caretaker/driver)
                ├── User.js               # User signup form
                ├── Caretaker.js          # Caretaker signup form
                ├── Driver.js             # Driver signup form
                ├── UserHome.js           # Book ride + view bookings
                ├── CaretakerHome.js      # View assigned bookings + complete with OTP
                └── DriverHome.js         # View assigned bookings + complete with OTP
```

---

## Features

### User
- Register with personal details, medical conditions, emergency contact, and wheelchair requirement
- Log in and book rides by specifying pickup, drop, vehicle type, caretaker requirement, and wheelchair requirement
- View all personal bookings with assigned driver and caretaker names
- Rate completed rides with a 5-star review widget (UI-level)

### Caretaker
- Register with availability and language preferences
- Log in to a dashboard showing all assigned bookings
- Mark a booking complete by triggering an OTP — the OTP is sent to the passenger's email and verified in the dashboard

### Driver
- Register with vehicle details and license number
- Log in to a dashboard showing all assigned bookings
- Same OTP-based completion flow as caretakers

### Admin
- Read-only REST endpoints to list all users, drivers, and caretakers

### Booking Engine (`AdminService`)
- Automatically assigns the first available driver
- If caretaker is requested, also assigns the first available caretaker; fails the booking if neither is found
- Marks assigned driver/caretaker availability as `"no"` until their respective completion OTP is verified
- Calculates a randomised fare between ₹25 and ₹450

---

## Database Schema

Hibernate auto-creates and updates all tables on application start (`ddl-auto=update`). The four tables are:

### `users`
| Column | Type | Notes |
|---|---|---|
| id | BIGINT (PK, AI) | Auto-generated |
| username | VARCHAR | Login credential |
| password | VARCHAR | Plain text (no hashing currently) |
| name | VARCHAR | Full name |
| age | VARCHAR | |
| gender | VARCHAR | Male / Female / Other |
| email | VARCHAR | Used for OTP delivery |
| phone_number | VARCHAR | |
| address | VARCHAR | |
| emergency_contact | VARCHAR | |
| medical_conditions | VARCHAR | |
| wheelchair_needed | VARCHAR | Yes / No |

### `caretakers`
| Column | Type | Notes |
|---|---|---|
| caretaker_id | BIGINT (PK, AI) | Auto-generated |
| name | VARCHAR | |
| username | VARCHAR | |
| password | VARCHAR | |
| age | INT | |
| gender | VARCHAR | |
| email | VARCHAR | |
| phone_number | VARCHAR | |
| address | VARCHAR | |
| languages_spoken | VARCHAR | |
| availability | VARCHAR | `yes` = available, `no` = on a trip |
| status | VARCHAR | Active / Inactive |

### `drivers`
| Column | Type | Notes |
|---|---|---|
| driver_id | BIGINT (PK, AI) | Auto-generated |
| username | VARCHAR | |
| password | VARCHAR | |
| name | VARCHAR | |
| age | INT | |
| gender | VARCHAR | |
| email | VARCHAR | |
| phone_number | VARCHAR | |
| address | VARCHAR | |
| vehicle_type | VARCHAR | Car / Bike / Auto |
| vehicle_number | VARCHAR | |
| license_number | VARCHAR | |
| availability | VARCHAR | `yes` = available, `no` = on a trip |
| status | VARCHAR | Active / Inactive |

### `bookings`
| Column | Type | Notes |
|---|---|---|
| booking_id | BIGINT (PK, AI) | Auto-generated |
| username | VARCHAR | Denormalised for quick lookup |
| password | VARCHAR | |
| user_id | BIGINT (FK → users.id) | |
| caretaker_id | BIGINT (FK → caretakers.caretaker_id) | Nullable |
| driver_id | BIGINT (FK → drivers.driver_id) | |
| pickup_location | VARCHAR | |
| drop_location | VARCHAR | |
| vehicle_type | VARCHAR | |
| status | VARCHAR | `success` / `failed` |
| fare | DOUBLE | Random value ₹25–₹450 |
| caretaker_required | VARCHAR | Yes / No |
| wheel_chair_required | VARCHAR | Yes / No |
| driver_completed | BOOLEAN | |
| caretaker_completed | BOOLEAN | |

---

## Backend – API Reference

Base URL (local): `http://localhost:8080`

---

### User Endpoints

| Method | Path | Params / Body | Description |
|---|---|---|---|
| GET | `/users/login` | `?username=&password=` | Returns `true` if credentials match, `false` otherwise |
| POST | `/users/post/users` | JSON body: `Users` object | Register a new user |
| POST | `/users/post/booking` | JSON body: `Bookings` object (username, password, pickupLocation, dropLocation, vehicleType, caretakerRequired, wheelChairRequired) | Book a ride — auto-assigns driver and caretaker |
| GET | `/users/get/bookings` | `?username=&password=` | Returns all bookings for the authenticated user |

**Sample booking request body:**
```json
{
  "username": "john_doe",
  "password": "pass123",
  "pickupLocation": "Anna Nagar",
  "dropLocation": "Chennai Airport",
  "vehicleType": "Car",
  "caretakerRequired": "Yes",
  "wheelChairRequired": "No"
}
```

**Sample booking response:**
```json
{
  "bookingId": 7,
  "status": "success",
  "fare": 234.56,
  "driver": { "username": "driver1", ... },
  "caretaker": { "username": "care1", ... }
}
```

---

### Caretaker Endpoints

| Method | Path | Params / Body | Description |
|---|---|---|---|
| GET | `/caretaker/login` | `?username=&password=` | Returns `true` / `false` |
| POST | `/caretaker/post/caretakers` | JSON body: `CareTakers` object | Register a new caretaker |
| GET | `/caretaker/get/bookings` | `?username=&password=` | Returns all bookings assigned to this caretaker |
| POST | `/caretaker/complete/{bookingId}` | `?username=&password=` | Generates a 6-digit OTP and emails it to the passenger |
| POST | `/caretaker/verify-otp` | `?bookingId=&otp=&username=&password=` | Verifies OTP, marks `caretakerCompleted = true`, resets caretaker availability |

---

### Driver Endpoints

| Method | Path | Params / Body | Description |
|---|---|---|---|
| GET | `/driver/login` | `?username=&password=` | Returns `true` / `false` |
| POST | `/driver/post/driver` | JSON body: `Drivers` object | Register a new driver |
| GET | `/driver/get/bookings` | `?username=&password=` | Returns all bookings assigned to this driver |
| POST | `/driver/complete/{bookingId}` | `?username=&password=` | Generates a 6-digit OTP and emails it to the passenger |
| POST | `/driver/verify-otp` | `?bookingId=&otp=` | Verifies OTP, marks `driverCompleted = true`, resets driver availability |

---

### Admin Endpoints

| Method | Path | Description |
|---|---|---|
| GET | `/admin/get/users` | Returns list of all registered users |
| GET | `/admin/get/drivers` | Returns list of all registered drivers |
| GET | `/admin/get/caretakers` | Returns list of all registered caretakers |

---

## Frontend – Pages & Routes

The React app uses `HashRouter` (required for GitHub Pages static hosting).

| Route | Component | Description |
|---|---|---|
| `/` | `Login` | Default landing — role selector + login form |
| `/login` | `Login` | Same login page |
| `/signup/user` | `User` | User registration form (12 fields) |
| `/signup/caretaker` | `Caretaker` | Caretaker registration form (11 fields) |
| `/signup/driver` | `Driver` | Driver registration form (13 fields) |
| `/user/home` | `UserHome` | Book a ride + bookings history table |
| `/caretaker/home` | `CaretakerHome` | Assigned bookings + OTP completion flow |
| `/driver/home` | `DriverHome` | Assigned bookings + OTP completion flow |

Session state (username and password) is stored in `sessionStorage` after login and read by each home page to make authenticated API calls.

---

## Getting Started

### Prerequisites

- Java 21+
- Gradle (or use the included `gradlew` wrapper)
- MySQL 8+
- Node.js 18+ and npm

---

### MySQL Setup

1. Start your MySQL server.
2. Create the database (Hibernate creates the tables automatically):
   ```sql
   CREATE DATABASE careride;
   ```
3. Update credentials in `application.properties` if yours differ from the defaults (`root` / `root`).

---

### Backend Setup

```bash
cd CareRide/BACKEND

# Windows
gradlew.bat bootRun

# macOS / Linux
./gradlew bootRun
```

The API server starts on **port 8080** by default. You can override it with an environment variable:

```bash
PORT=9090 ./gradlew bootRun
```

On the first start, Hibernate runs `ddl-auto=update` and creates the four tables in the `careride` database.

---

### Frontend Setup

```bash
cd CareRide/FRONTEND/caretaker-app

npm install
npm start
```

The React dev server starts on **http://localhost:3000** and proxies API calls to the backend at `http://localhost:8080`.

---

## Environment & Configuration

All backend configuration lives in `BACKEND/src/main/resources/application.properties`:

```properties
# Server
server.port=${PORT:8080}

# MySQL
spring.datasource.url=jdbc:mysql://localhost:3306/careride?useSSL=false&serverTimezone=UTC&allowPublicKeyRetrieval=true
spring.datasource.username=root
spring.datasource.password=root

# JPA
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true

# Gmail SMTP (for OTP emails)
spring.mail.host=smtp.gmail.com
spring.mail.port=587
spring.mail.username=<your-gmail>
spring.mail.password=<your-app-password>
spring.mail.properties.mail.smtp.auth=true
spring.mail.properties.mail.smtp.starttls.enable=true
```

> **Gmail note:** Use a [Google App Password](https://support.google.com/accounts/answer/185833), not your regular Gmail password. 2-Step Verification must be enabled on the account.

CORS is configured in `WebConfig.java` to allow requests from `http://localhost:3000`. For production, update the `allowedOrigins` value to your deployed frontend URL.

---

## Booking Flow

```
User fills booking form
        │
        ▼
POST /users/post/booking
        │
        ▼
AdminService.bookRide()
        │
        ├── caretakerRequired = Yes?
        │       ├── Find available driver (availability = "yes")
        │       ├── Find available caretaker (availability = "yes")
        │       ├── Both found → assign both, set availability = "no", status = "success"
        │       └── Either missing → status = "failed" (no assignment)
        │
        └── caretakerRequired = No?
                ├── Find available driver (availability = "yes")
                ├── Found → assign driver, set availability = "no", status = "success"
                └── Not found → status = "failed"
        │
        ▼
Fare calculated (random ₹25–₹450)
Booking saved to DB
Response returned to user
```

---

## OTP Completion Flow

Both driver and caretaker use the same two-step OTP flow independently.

```
Driver/Caretaker clicks "Complete" button
        │
        ▼
POST /driver/complete/{bookingId}  (or /caretaker/complete/{bookingId})
        │
        ├── Generate 6-digit OTP
        ├── Store OTP in memory Map<bookingId, otp>
        └── Send OTP to passenger's email via Gmail SMTP
        │
        ▼
Driver/Caretaker enters OTP in dashboard
        │
        ▼
POST /driver/verify-otp  (or /caretaker/verify-otp)
        │
        ├── Match OTP from in-memory store
        ├── Mark booking.driverCompleted = true (or caretakerCompleted)
        ├── Reset driver/caretaker availability = "yes"
        └── Remove OTP from store
        │
        ▼
Dashboard refreshes — row shows "✔ Completed"
```

> **Note:** OTPs are stored in a `HashMap` in memory. They are lost on server restart. For production, replace with Redis or a database-backed OTP table.

---

## Known Limitations

| Area | Limitation |
|---|---|
| Security | Passwords are stored as plain text. No hashing (e.g., BCrypt) is applied. |
| Auth | No JWT or session tokens. Authentication is credential-based on every request. |
| OTP Storage | In-memory `HashMap` — lost on restart, not suitable for multi-instance deployments. |
| Fare Calculation | Randomised between ₹25–₹450 with no distance or route calculation. |
| Star Ratings | Rating selection is UI-only; stars are not persisted to the database. |
| Admin Panel | Admin endpoints have no authentication — any client can call them. |
| CORS | Hardcoded to `http://localhost:3000`; must be updated for production. |

---

## Deployment

### Frontend (GitHub Pages)

The `package.json` is already configured with a `homepage` and deploy scripts:

```bash
cd CareRide/FRONTEND/caretaker-app
npm run deploy
```

This runs `npm run build` then publishes the `build/` folder to the `gh-pages` branch of the repo. The app uses `HashRouter` so deep links work correctly on GitHub Pages.

### Backend

Build a runnable JAR and deploy to any Java-compatible host (Railway, Render, EC2, etc.):

```bash
cd CareRide/BACKEND
./gradlew bootJar
# Output: build/libs/demo-0.0.1-SNAPSHOT.jar

java -jar build/libs/demo-0.0.1-SNAPSHOT.jar
```

Set `PORT`, `spring.datasource.url`, `spring.datasource.username`, `spring.datasource.password`, and mail credentials as environment variables on your host rather than hardcoding them in `application.properties`.

After deploying the backend, update the API base URL in all frontend components (currently hardcoded to `http://localhost:8080`) to the production backend URL.

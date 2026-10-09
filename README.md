# 🎬 Movie Booking System – Client (React)

A modern **React-based frontend** for the Movie Ticket Booking System.
This client application allows users to browse movies, view available shows, select seats, and book movie tickets.

The application communicates with the **Node.js + Express backend API**.

---

# 🚀 Tech Stack

* **React**
* **Vite**
* **Axios**
* **React Router DOM**
* **Tailwind CSS / CSS Modules**
* **JWT Authentication**

---

# 🎯 Features

### 👤 User Authentication

* Register new users
* Login with email & password
* JWT token-based authentication
* Protected routes for booking

---

### 🎬 Movie Browsing

Users can:

* View all movies
* Search movies by title
* View movie details
* Check available shows

---

### 🏢 Theater & Show Listing

For each movie users can:

* See theaters where the movie is playing
* View show date and time
* Select a show to book seats

---

### 💺 Seat Selection System

Users can:

* View all seats for a show
* See booked and available seats (Not implemented only static)
* Select multiple seats
* Confirm seat booking

Seat UI example:

```
A1 A2 A3 A4 A5
B1 B2 B3 B4 B5
C1 C2 C3 C4 C5
```

* Green → Available
* Red → Booked
* Blue → Selected

---

### 🎟️ Ticket Booking

Booking flow:

```
User selects movie
      ↓
Choose theater show
      ↓
Select seats
      ↓
Confirm booking
      ↓
Payment processing (static only update the booking status pending to confirmed)
      ↓
Booking confirmation
```

---

### 📄 My Bookings

Users can:

* View their booking history
* See movie, theater, seats, and show time
* Cancel bookings

---

# 📂 Project Folder Structure

```
src
│
├── components
│   ├── Navbar.jsx
│   ├── MovieCard.jsx
│   ├── Seat.jsx
│   └── SeatGrid.jsx
│
├── pages
│   ├── Home.jsx
│   ├── Login.jsx
│   ├── Register.jsx
│   ├── MovieDetails.jsx
│   ├── ShowList.jsx
│   ├── SeatSelection.jsx
│   └── MyBookings.jsx
│
├── services
│   └── api.js
│
├── context
│   └── AuthContext.jsx
│
├── hooks
│   └── useAuth.js
│
├── utils
│   └── helpers.js
│
├── App.jsx
└── main.jsx
```

---

# 🔗 Backend API Integration

All API calls are handled using **Axios**.

Example API service file:

`src/services/api.js`

```javascript
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4000/api",
});

export default api;
```

---

# 📡 API Usage

### Get Movies

```
GET /api/movies
```

---

### Get Shows by Movie

```
GET /api/shows?movie_id=1
```

---

### Get Seats by Show

```
GET /api/seats/:show_id
```

---

### Create Booking

```
POST /api/booking
```

Body:

```
{
  "show_id": 1,
  "seat_numbers": "A1,A2",
  "total_price": 400
}
```

---

### Get My Bookings

```
GET /api/booking/my-bookings
```

---

### Cancel Booking

```
PUT /api/booking/cancel/:booking_id
```

---

# 🔐 Authentication Handling

JWT token is stored in **localStorage**.

Example:

```javascript
localStorage.setItem("token", token);
```

Axios request interceptor:

```javascript
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
```

---

# 🎨 UI Flow

### Home Page

Displays all movies.

```
Movie Card
   ↓
Movie Details
   ↓
Available Shows
```

---

### Seat Selection Page

Displays seat grid.

```
Select seats
      ↓
Calculate total price
      ↓
Confirm booking
```

---

# ⚙️ Environment Setup

Create `.env` file.

```
VITE_API_URL=http://localhost:4000/api
```

---

# 🧪 Development Setup

### Install dependencies

```
npm install
```

---

### Run development server

```
npm run dev
```

---

### Build for production

```
npm run build
```

---

# 🧠 Learning Outcomes

This project demonstrates:

* React component architecture
* API integration with Axios
* JWT authentication
* Seat selection UI logic
* Real-world booking flow
* State management using Context API

---

# 🔮 Future Improvements

* Payment gateway integration
* Seat animation UI
* Admin dashboard
* Real-time seat updates using WebSocket
* Booking confirmation email
* Dark mode UI

---

# 👨‍💻 Author

**Rajdip Das**

Frontend + Backend Developer
Building scalable full-stack applications.

---

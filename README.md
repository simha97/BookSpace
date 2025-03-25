# 🏨 Room Booking System

A web application to manage room bookings for specified time slots. Users can select a room, choose a time slot, and confirm their booking with their name.

---

## ✨ Features

- **Multi-step Booking Flow**  
  Users can choose a room, select a time slot, and confirm their booking.
  
- **Room Availability**  
  The system checks if a room is available for the selected time slot before confirming the booking.
  
- **Backend Integration**  
  Booking data is stored and managed using **Supabase**.

---

## 🛠 Technologies Used

### Frontend

- [React.js](https://reactjs.org/) with [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Supabase](https://supabase.io) for backend storage
- [Express.js](https://expressjs.com/) for backend route handling

### Backend

- Supabase (PostgreSQL)
- Node.js with Express

---

## ⚙️ Setup

### ✅ Prerequisites

- [Node.js](https://nodejs.org/) and npm (or yarn)
- [Supabase account](https://app.supabase.com/)

---

### 📦 Installation

1. **Clone the repository**:

```bash
git clone https://github.com/your-username/room-booking-system.git
cd room-booking-system
```bash


2. **Install dependencies:**

```bash
npm install

3. **Setup Supabase:**

- Create a Supabase project if you don't have one.

- Configure your Supabase credentials and set up the tables (rooms and bookings).

- Add the Supabase credentials (URL, API key) to your project configuration or .env file.

4. **Start the backend (Express.js server):**

Navigate to your backend folder (if separate) and run:

```bash
node server.js

This will start the backend on your local machine.

5. **Start the frontend:**

From the root directory of the project:

```bash
npm run dev

This will start the frontend development server, and the app will be accessible at http://localhost:3000.


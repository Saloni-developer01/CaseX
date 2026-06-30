
# 📱 CaseX - Premium Phone Covers & Admin Payout Dashboard

CaseX is a full-stack e-commerce web application built using the MERN stack. It features a premium, interactive user interface for browsing stylish phone covers, along with a robust **Financial Ledger Console (Admin Payout Control Room)** to manage vendor payout requests efficiently.

---

## 🚀 Live Demo
* **Click Here:** [Paste your live Vercel/Render link here]

---

## ✨ Features

### 🛒 Frontend & User Experience
* **Premium UI/UX:** Styled using Tailwind CSS with beautiful gradients and interactive states.
* **Fully Responsive:** Completely optimized for all screen sizes, including a custom mobile card layout and an elegant desktop table view.
* **Smooth Navigation:** Clean animations and dynamic state management using React hooks.

### 💼 Admin Payout Control Room
* **Live Ledger Tracking:** Fetches and displays all pending and processed vendor payout requests in real-time.
* **One-Click Actions:** Admin can approve or reject payout requests instantly with automated success messages.
* **Dynamic Status Badges:** Color-coded tracking for `Pending` (⏳), `Approved` (🟢), and `Rejected` (🚫) states.
* **Bank Meta Details:** Displays full bank specifications including Account Holder Name, Account Number, IFSC, and Bank Name.

### 💳 Payment Integration
* **Razorpay Integration:** Integrated with Razorpay Payment Gateway (currently running in **Test Mode** for safe review).

---

## 🛠️ Tech Stack

* **Frontend:** React.js, Tailwind CSS, Axios, Vite
* **Backend:** Node.js, Express.js
* **Database:** MongoDB Atlas
* **Payment Gateway:** Razorpay API

---

## 📦 Installation & Setup

Follow these steps to run the project locally:

### 1. Clone the repository
```bash
git clone https://github.com/your-username/casex.git
cd casex
```

### 2. Setup Backend Environment Variables

Create a .env file in your server/backend root folder and add the following:

Code snippet
```bash
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret_key
RAZORPAY_KEY_ID=your_razorpay_test_key
RAZORPAY_KEY_SECRET=your_razorpay_test_secret
```

### 3. Install Dependencies & Run Backend

```bash
# Navigate to backend folder
cd backend
npm install
npm start
```

### 4. Install Dependencies & Run Frontend

```bash
# Navigate to frontend folder
cd ../frontend
npm install
npm run dev
```
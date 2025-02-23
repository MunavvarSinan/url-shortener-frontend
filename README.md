# URL Shortener - Frontend

![Next.js](https://img.shields.io/badge/Next.js-13-blue.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-✔-blue.svg)
![ShadCN UI](https://img.shields.io/badge/ShadCN%20UI-%F0%9F%94%A5-red.svg)
![Bun](https://img.shields.io/badge/Bun-%F0%9F%8D%AC-yellow.svg)

A modern **URL Shortener Web Application** built with **Next.js, TypeScript, NextAuth v3, ShadCN UI, and Bun**.

---

## 🚀 Tech Stack

- **Next.js** – React Framework
- **TypeScript** – Type-safe JavaScript
- **Bun** – Fast JavaScript runtime
- **NextAuth v5** – Authentication & Authorization
- **ShadCN UI** – Modern UI components
- **Tailwind CSS** – Utility-first styling
- **React Hook Form** – Form handling & validation

---

## 📂 Project Structure

```
/src
  ├── actions/ (Server actions for async logic)
  ├── app/
  │   ├── layout.tsx (Root layout)
  │   ├── page.tsx (Landing Page)
  │   ├── dashboard.tsx (User Dashboard)
  ├── components/ (Reusable UI components)
  ├── lib/ (Utility functions)
  ├── middleware.ts (Route protection)
  ├── store/ (Zustand State Management)
  ├── styles/ (Global styles)
  ├── types/ (TypeScript interfaces)
```

---

## 🛠️ Setup & Installation

### 1️⃣ Clone the Repository

```sh
git clone <repo-url>
cd <repo-folder>
```

### 2️⃣ Install Dependencies

```sh
bun install  # Using Bun
```

### 3️⃣ Configure Environment Variables

Create a `.env.local` file and add:

```ini
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key

DATABASE_URL=postgres://postgres:password@localhost:5432/url-shortener
API_BASE_URL=http://localhost:8000  # Backend API
```

### 4️⃣ Run the Development Server

```sh
bun dev  # Runs on http://localhost:3000
```

---

## 🔑 Authentication

- Uses **NextAuth v3** for authentication
- Supports **Google, GitHub, and Credentials-based login**
- Protects dashboard routes with `getServerSideProps`

---

## 🎨 UI & Styling

- Uses **ShadCN UI** for components
- Dark mode support (via Tailwind CSS)
- Custom **loading & toast notifications**

---

## 🖥️ API Routes

| Method   | Endpoint           | Description                  |
| -------- | ------------------ | ---------------------------- |
| `POST`   | `/api/url/shorten` | Shorten a URL                |
| `GET`    | `/api/url`         | Get all user-shortened URLs  |
| `DELETE` | `/api/url/:id`     | Delete a URL                 |
| `GET`    | `/:shortCode`      | Redirect to the original URL |

---

## ✅ Running Tests

```sh
bun test  # Runs unit tests
```

---

## 📦 Deployment

### 1️⃣ Build for Production

```sh
bun build
```

### 2️⃣ Deploy on Vercel

```sh
vercel deploy
```

---

## 📖 License

MIT License

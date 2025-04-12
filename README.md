# 🌊 AstroRestaurant

## My Maldivian Seafood Restaurant Project

Hey there! Welcome to my AstroRestaurant project. I built this as a modern web application for my seafood restaurant concept, inspired by the beautiful ocean vibes of the Maldives. This project combines my passion for great food, beautiful design, and modern web technologies.

## 🚀 What I've Built

AstroRestaurant is a full-stack web application that showcases my restaurant's offerings with a focus on user experience and visual appeal. I've built it with:

- A beautiful, responsive UI with ocean-inspired animations
- Online reservation system
- Interactive menu display
- Admin dashboard for managing bookings and menu items
- Authentication for staff access

## 💻 Tech Stack

I wanted to use modern technologies that would give me both performance and developer experience benefits:

- **Frontend**: React with TypeScript, styled using Tailwind CSS and Shadcn UI components
- **Backend**: Express.js running on Node.js
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Animation**: GSAP and React Spring for smooth, interactive animations
- **3D Effects**: Three.js for immersive background elements
- **Form Handling**: React Hook Form with Zod validation
- **State Management**: React Query for server state management

## 🏗️ Project Structure

I've organized the project with a clear separation of concerns:

```
AstroRestaurant/
├── client/               # React frontend
│   ├── src/
│   │   ├── components/   # Reusable UI components
│   │   ├── pages/        # Page components
│   │   ├── hooks/        # Custom React hooks
│   │   └── lib/          # Utility functions and helpers
├── server/               # Express backend
│   ├── db.ts             # Database connection
│   ├── routes.ts         # API routes
│   └── storage.ts        # Data access layer
├── shared/               # Shared code between client and server
│   └── schema.ts         # Database schema and type definitions
└── migrations/           # Database migrations
```

## 🔧 Getting Started

If you want to run this project locally, here's how:

### Prerequisites

- Node.js (v18 or newer)
- PostgreSQL database

### Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/QuantumByteWizard/AstroRestaurant.git
   cd AstroRestaurant
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up your environment variables:
   Create a `.env` file in the root directory with:
   ```
   DATABASE_URL=postgres://username:password@localhost:5432/astro_restaurant
   ```

4. Push the database schema:
   ```bash
   npm run db:push
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

6. Open your browser and navigate to `http://localhost:5001`

## 🌟 Features I'm Proud Of

### Interactive Menu

I spent a lot of time making the menu interactive and visually appealing. Each dish has beautiful animations and transitions when you hover over them. I used GSAP for the animations and made sure they're performant even on mobile devices.

### Reservation System

The booking system is something I'm particularly proud of. It's intuitive, validates inputs in real-time, and connects directly to our database. I used React Hook Form with Zod validation to ensure all user inputs are properly validated before submission.

### Responsive Design

The site looks great on everything from a large desktop monitor to a small mobile phone. I used Tailwind CSS for responsive design and made sure the experience is optimized for each device type.

### Ocean-Themed Visuals

The underwater theme is brought to life with Three.js particles and custom animations. I wanted visitors to feel like they're experiencing the ocean ambiance even before they visit the restaurant.

## 🚧 What's Next

I'm constantly improving this project. Here are some things I'm planning to add:

- Online ordering system for takeaway
- Integration with payment gateways
- Customer accounts and loyalty program
- Enhanced admin analytics dashboard
- Menu item availability management
- Seasonal menu features

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Shadcn UI for the beautiful component library
- The React and Express communities for the amazing documentation
- My friends who tested the site and provided valuable feedback

---;
# Product Requirements Document (PRD) for "Statix" - A Custom Static Site Builder

## Overview

Statix is a custom static site builder designed to provide users with a seamless experience in creating, managing, and deploying static websites. Inspired by platforms like Wix, Statix will offer a drag-and-drop interface, pre-built templates, and support for animations. The MVP will be built using Next.js for the frontend, Supabase for backend and authentication, and Drizzle for database management.

This PRD outlines the core features, user flows, and technical architecture for the MVP. It is structured to break down the development process into manageable tasks, ensuring focus and scope adherence.

---

## Table of Contents

1. **Objectives**
2. **Key Features**
3. **User Flows**
4. **Technical Architecture**
5. **Database Schema**
6. **Task Breakdown**
7. **Animation Support**
8. **Future Scope**
9. **Acceptance Criteria**

---

## 1. Objectives

- Provide a user-friendly drag-and-drop interface for building static websites.
- Support animations to enhance user engagement.
- Enable users to create, preview, and deploy static sites seamlessly.
- Use Next.js for server-side rendering and static site generation.
- Leverage Supabase for backend services, including authentication and database management.
- Use Drizzle as an ORM for database interactions.

---

## 2. Key Features (MVP)

### Core Features

1. **User Authentication**
   - Sign up, login, and logout functionality.
   - Password reset and email verification.
2. **Dashboard**
   - List of created websites.
   - Option to create a new website.
3. **Website Builder**
   - Drag-and-drop interface for adding components (text, images, buttons, etc.).
   - Pre-built templates for quick setup.
   - Real-time preview of the website.
4. **Animation Support**
   - Add animations to components (e.g., fade-in, slide-in, etc.).
   - Customize animation duration and delay.
5. **Deployment**
   - One-click deployment to a custom subdomain (e.g., `username.statix.com`).
   - Download website as a static HTML/CSS/JS bundle.
6. **Database**
   - Store user data, website configurations, and component data.

---

## 3. User Flows

### Flow 1: User Registration and Login

1. User visits the Statix homepage.
2. Clicks on "Sign Up" and provides email and password.
3. Receives a verification email and confirms their account.
4. Logs in and is redirected to the dashboard.

### Flow 2: Create a New Website

1. User clicks "Create New Website" on the dashboard.
2. Selects a template or starts from scratch.
3. Uses the drag-and-drop builder to add and customize components.
4. Adds animations to components (optional).
5. Clicks "Preview" to see the website in real-time.
6. Clicks "Save" to store the website configuration.

### Flow 3: Deploy a Website

1. User selects a website from the dashboard.
2. Clicks "Deploy" and chooses a subdomain.
3. Website is deployed and accessible at `subdomain.statix.com`.

### Flow 4: Download Website

1. User selects a website from the dashboard.
2. Clicks "Download" to generate a static HTML/CSS/JS bundle.
3. Bundle is downloaded to the user's device.

---

## 4. Technical Architecture

### Frontend

- **Framework**: Next.js 14 with App Router
- **UI Library**: shadcn/ui with Tailwind CSS
- **Drag-and-Drop**: dnd-kit
- **Animation**: Framer Motion
- **Form Handling**: react-hook-form + zod

### Backend

- **Authentication**: Supabase Auth.
- **Database**: Supabase PostgreSQL with Drizzle ORM.
- **API Routes**: Next.js API routes for custom backend logic.

### Deployment

- **Hosting**: Vercel for Next.js deployment.
- **Static Site Hosting**: Supabase Storage or Vercel for static files.

---

## 5. Database Schema

### Tables

1. **Users**

   - `id`: UUID (Primary Key)
   - `email`: String (Unique)
   - `password_hash`: String
   - `created_at`: Timestamp

2. **Websites**

   - `id`: UUID (Primary Key)
   - `user_id`: UUID (Foreign Key to Users)
   - `name`: String
   - `subdomain`: String (Unique)
   - `config`: JSON (Stores website configuration)
   - `created_at`: Timestamp

3. **Components**
   - `id`: UUID (Primary Key)
   - `website_id`: UUID (Foreign Key to Websites)
   - `type`: String (e.g., "text", "image", "button")
   - `config`: JSON (Stores component configuration)
   - `animation`: JSON (Stores animation settings)

---

## 6. Task Breakdown

### Task 1: Setup and Configuration

- Initialize Next.js project.
- Set up Supabase and Drizzle.
- Configure Tailwind CSS.

### Task 2: User Authentication

- Implement sign-up, login, and logout functionality using Supabase Auth.
- Add email verification and password reset.

### Task 3: Dashboard

- Create a dashboard layout.
- Display a list of user-created websites.
- Add "Create New Website" button.

### Task 4: Website Builder

- Implement drag-and-drop functionality.
- Add support for basic components (text, image, button).
- Create a real-time preview pane.

### Task 5: Animation Support

- Integrate Framer Motion.
- Add UI controls for animation settings (duration, delay, type).

### Task 6: Deployment

- Implement one-click deployment to a subdomain.
- Add functionality to download the website as a static bundle.

### Task 7: Database Integration

- Set up database tables using Drizzle.
- Implement CRUD operations for websites and components.

---

## 7. Animation Support

- **Types of Animations**: Fade-in, slide-in, zoom-in, etc.
- **Customization**: Users can set duration, delay, and easing.
- **Implementation**: Use Framer Motion for smooth animations.

---

## 8. Future Scope

- **E-commerce Integration**: Add support for product listings and payments.
- **Collaboration**: Allow multiple users to collaborate on a website.
- **Analytics**: Track website traffic and user engagement.
- **Custom Domains**: Support for custom domain names.

---

## 9. Acceptance Criteria

1. Users can sign up, log in, and manage their accounts.
2. Users can create, edit, and delete websites.
3. Websites can be previewed in real-time.
4. Websites can be deployed to a subdomain or downloaded as a static bundle.
5. Animations can be added and customized for components.
6. All data is securely stored and managed in the database.

---

This PRD provides a comprehensive roadmap for building the MVP of Statix. By breaking down the tasks and focusing on core features, the development process will

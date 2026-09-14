# AI Career Assistant & Job Tracker

AI Career Assistant & Job Tracker is a full-stack web application designed to help job seekers manage their complete career journey efficiently.

The platform combines job application tracking with AI-powered career tools such as Resume Analysis, Interview Preparation, and Career Guidance. It also provides separate dashboards for Admin and User roles with secure role-based access control.

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [User Roles](#user-roles)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Application Flow](#application-flow)
- [AI Features](#ai-features)
- [Authentication and Security](#authentication-and-security)
- [Admin Features](#admin-features)
- [User Features](#user-features)
- [Live Demo](#live-demo)
- [Screenshots](#screenshots)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Frontend Setup](#frontend-setup)
- [Backend Setup](#backend-setup)
- [Database Setup](#database-setup)
- [Environment Variables](#environment-variables)
- [API Configuration](#api-configuration)
- [Local Development](#local-development)
- [Production Deployment](#production-deployment)
- [Security Notes](#security-notes)
- [Key Highlights](#key-highlights)
- [Future Enhancements](#future-enhancements)
- [Author](#author)

---

# Overview

AI Career Assistant & Job Tracker is designed to provide job seekers with a centralized platform for managing job applications, analyzing resumes, preparing for interviews, and receiving AI-powered career guidance.

The application follows a modern full-stack architecture:

```text
React + Vite + Tailwind CSS
            |
            v
     Spring Boot REST API
            |
            v
 Spring Security + JWT
            |
            v
      Hibernate / JPA
            |
            v
        MySQL

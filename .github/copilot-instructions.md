# Copilot Instructions

<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

## Project Overview
This is a React data collection portal built with Vite and JSX. The application provides:

- Two-level authentication (user and admin)
- User data management (academic details, internships, work experience, certificates, skills)
- Admin panel for user management
- Local storage for data persistence (no backend required)

## Code Style Guidelines
- Use functional components with hooks
- Use JSX (not TypeScript)
- Follow React best practices
- Use modern ES6+ features
- Keep components modular and reusable
- Use CSS modules or inline styles for styling

## Project Structure
- `/src/components` - Reusable UI components
- `/src/pages` - Main page components
- `/src/hooks` - Custom React hooks
- `/src/services` - Data management services
- `/src/utils` - Utility functions and constants

## Key Features to Remember
- No backend - all data stored in localStorage
- Two user roles: 'user' and 'admin'
- Users can only manage their own data
- Admins can view all user data and manage users
- Forms for: academic details, internships, work experience, certificates, skills

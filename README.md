# Data Collection Portal

A comprehensive React-based web portal for collecting and managing user data including academic details, internships, work experience, certificates, and skills. Features two-level authentication (user and admin) with complete CRUD operations and local storage persistence.

## 🚀 Features

### Authentication & Authorization
- **Two-level authentication**: User and Admin roles
- **Protected routes**: Role-based access control
- **Secure login**: Username/password authentication
- **Session management**: Persistent login state

### User Features
- **Personal Dashboard**: Overview of user's data with statistics
- **Academic Details Management**: Add, edit, view, and delete educational records
- **Internship Tracking**: Manage internship experiences with detailed information
- **Work Experience**: Track professional work history
- **Certificates**: Manage professional certifications and achievements
- **Skills Portfolio**: Add and organize technical and soft skills
- **Data Privacy**: Users can only access and modify their own data

### Admin Features
- **Admin Dashboard**: Comprehensive analytics and overview
- **User Management**: Create, edit, and delete user accounts
- **Data Analytics**: View all user data across the platform
- **System Statistics**: Monitor platform usage and data trends

### Technical Features
- **No Backend Required**: Complete frontend solution using localStorage
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Modern UI**: Clean, intuitive interface with icons and animations
- **Real-time Updates**: Instant data synchronization
- **Form Validation**: Comprehensive input validation and error handling

## 🛠️ Tech Stack

- **React 18**: Modern functional components with hooks
- **React Router**: Client-side routing and navigation
- **Vite**: Fast build tool and development server
- **Lucide React**: Beautiful icons and graphics
- **Local Storage**: Data persistence without backend
- **CSS3**: Modern styling with flexbox and grid
- **JavaScript ES6+**: Modern JavaScript features

## 📋 Prerequisites

- Node.js (version 14 or higher)
- npm or yarn package manager

## 🚀 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd internship-management
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

## 👥 Default Login Credentials

### Admin Account
- **Username**: `admin`
- **Password**: `admin123`

### Demo Users
Additional user accounts can be created through the admin panel.

## 📱 Usage Guide

### For Users
1. **Login** with your credentials
2. **Dashboard** provides an overview of your data
3. **Navigation** through the sidebar to different sections
4. **Add Data** using the forms in each section
5. **Edit/Delete** existing records as needed

### For Admins
1. **Login** with admin credentials
2. **Admin Dashboard** shows system-wide statistics
3. **User Management** to create and manage user accounts
4. **View All Data** to see comprehensive analytics

## 📊 Data Structure

### Academic Details
- Institution name
- Degree type
- Subject/Field of study
- Marks/GPA
- Year of passing

### Internship Details
- Company name
- Project details
- Role/Position
- Duration (from/to dates)
- Location
- Description of responsibilities

### Work Experience
- Company name
- Project details
- Role/Position
- Duration (from/to dates)
- Location
- Job description and achievements

### Certificates
- Certificate name
- Domain/Field
- Issuing organization

### Skills
- Skill name
- Category (technical/soft skills)

## 🗂️ Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── auth/            # Authentication components
│   ├── admin/           # Admin-specific components
│   ├── common/          # Shared components (Header, Sidebar, Layout)
│   └── forms/           # Data entry forms
├── hooks/               # Custom React hooks
├── pages/               # Main page components
├── services/            # Data management services
├── utils/               # Utility functions and constants
└── assets/              # Static assets
```

## 🔧 Development

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Code Style Guidelines
- Use functional components with hooks
- Follow React best practices
- Use modern ES6+ features
- Keep components modular and reusable
- Use meaningful variable and function names

## 🚀 Deployment

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy the `dist` folder** to your hosting provider

## 🔒 Data Storage

All data is stored locally in the browser's localStorage:
- No external database required
- Data persists across browser sessions
- Easy to backup and restore
- Privacy-focused approach

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 🐛 Known Issues

- Data is lost if localStorage is cleared
- No data synchronization across devices
- Limited to single browser storage

## 🔮 Future Enhancements

- Export data to CSV/PDF
- Import data from external sources
- Advanced search and filtering
- Data visualization charts
- Email notifications
- Multi-language support
- Theme customization
- Backup and restore functionality

## 📞 Support

For support and questions, please open an issue in the repository or contact the development team.

---

**Built with ❤️ using React and modern web technologies**+ Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

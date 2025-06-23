// Constants for the application
export const USER_ROLES = {
  USER: 'user',
  ADMIN: 'admin'
};

export const STORAGE_KEYS = {
  USERS: 'portal_users',
  CURRENT_USER: 'portal_current_user',
  ACADEMIC_DETAILS: 'portal_academic_details',
  INTERNSHIPS: 'portal_internships',
  WORK_EXPERIENCE: 'portal_work_experience',
  CERTIFICATES: 'portal_certificates',
  SKILLS: 'portal_skills'
};

export const FORM_TYPES = {
  ACADEMIC: 'academic',
  INTERNSHIP: 'internship',
  WORK_EXPERIENCE: 'work_experience',
  CERTIFICATE: 'certificate',
  SKILL: 'skill'
};

// Default admin user
export const DEFAULT_ADMIN = {
  id: 'admin',
  username: 'admin',
  password: 'admin123',
  name: 'Administrator',
  role: USER_ROLES.ADMIN
};

// Navigation menu items
export const USER_MENU_ITEMS = [
  { path: '/dashboard', label: 'Dashboard', icon: 'LayoutDashboard' },
  { path: '/academic', label: 'Academic Details', icon: 'GraduationCap' },
  { path: '/internships', label: 'Internships', icon: 'Briefcase' },
  { path: '/work-experience', label: 'Work Experience', icon: 'Building' },
  { path: '/certificates', label: 'Certificates', icon: 'Award' },
  { path: '/skills', label: 'Skills', icon: 'Brain' }
];

export const ADMIN_MENU_ITEMS = [
  { path: '/admin', label: 'Admin Dashboard', icon: 'Shield' },
  { path: '/admin/users', label: 'User Management', icon: 'Users' },
  { path: '/admin/data', label: 'All Data', icon: 'Database' }
];

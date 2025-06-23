import React from 'react';
import { useAuth } from '../hooks/useAuth.jsx';
import dataService from '../services/dataService.js';
import { LayoutDashboard, GraduationCap, Briefcase, Building, Award, Brain, Users } from 'lucide-react';

const Dashboard = () => {
  const { user, isAdmin } = useAuth();
  const [stats, setStats] = React.useState({
    academicDetails: 0,
    internships: 0,
    workExperience: 0,
    certificates: 0,
    skills: 0
  });

  React.useEffect(() => {
    if (user) {
      const userStats = dataService.getUserStats(user.username);
      setStats(userStats);
    }
  }, [user]);
  const StatCard = ({ icon: IconComponent, title, count, color, description }) => (
    <div style={{
      background: 'white',
      padding: '2rem',
      borderRadius: '10px',
      border: '1px solid #e9ecef',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      textAlign: 'center',
      transition: 'transform 0.2s',
      cursor: 'pointer'
    }}
    onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
    onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
    >
      <IconComponent size={48} style={{ color, marginBottom: '1rem' }} />
      <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '2.5rem', color: '#333' }}>{count}</h3>
      <p style={{ margin: '0 0 0.5rem 0', color: '#333', fontWeight: 'bold', fontSize: '1.1rem' }}>{title}</p>
      <p style={{ margin: 0, color: '#666', fontSize: '0.9rem' }}>{description}</p>
    </div>
  );

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        marginBottom: '2rem',
        paddingBottom: '1rem',
        borderBottom: '2px solid #e9ecef'
      }}>
        <LayoutDashboard size={32} style={{ marginRight: '1rem', color: '#667eea' }} />
        <div>
          <h1 style={{ margin: 0, color: '#333' }}>
            Welcome back, {user?.name || user?.username}!
          </h1>
          <p style={{ margin: '0.5rem 0 0 0', color: '#666' }}>
            {isAdmin ? 'Admin Dashboard - Manage users and view all data' : 'Your Personal Dashboard'}
          </p>
        </div>
      </div>

      {isAdmin ? (
        // Admin Dashboard
        <div style={{
          background: '#f0f4ff',
          padding: '2rem',
          borderRadius: '10px',
          marginBottom: '2rem',
          border: '1px solid #c7d7ff'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
            <Users size={24} style={{ marginRight: '0.5rem', color: '#667eea' }} />
            <h2 style={{ margin: 0, color: '#333' }}>Admin Quick Actions</h2>
          </div>
          <p style={{ color: '#666', marginBottom: '1rem' }}>
            As an administrator, you can manage users and view comprehensive data analytics.
          </p>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <a href="/admin/users" style={{
              background: '#667eea',
              color: 'white',
              padding: '0.75rem 1.5rem',
              borderRadius: '5px',
              textDecoration: 'none',
              fontWeight: 'bold'
            }}>
              Manage Users
            </a>
            <a href="/admin" style={{
              background: '#28a745',
              color: 'white',
              padding: '0.75rem 1.5rem',
              borderRadius: '5px',
              textDecoration: 'none',
              fontWeight: 'bold'
            }}>
              View Analytics
            </a>
          </div>
        </div>
      ) : (
        // User Dashboard
        <>
          <div style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            padding: '2rem',
            borderRadius: '10px',
            marginBottom: '2rem',
            textAlign: 'center'
          }}>
            <h2 style={{ margin: '0 0 1rem 0' }}>Your Data Collection Progress</h2>
            <p style={{ margin: 0, fontSize: '1.1rem', opacity: 0.9 }}>
              Track and manage your academic details, work experience, and skills all in one place.
            </p>
          </div>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
            gap: '1.5rem',
            marginBottom: '2rem'
          }}>
            <StatCard 
              icon={GraduationCap} 
              title="Academic Details" 
              count={stats.academicDetails} 
              color="#28a745"
              description="Educational background and qualifications"
            />
            <StatCard 
              icon={Briefcase} 
              title="Internships" 
              count={stats.internships} 
              color="#17a2b8"
              description="Internship experiences and projects"
            />
            <StatCard 
              icon={Building} 
              title="Work Experience" 
              count={stats.workExperience} 
              color="#ffc107"
              description="Professional work history"
            />
            <StatCard 
              icon={Award} 
              title="Certificates" 
              count={stats.certificates} 
              color="#dc3545"
              description="Professional certifications earned"
            />
            <StatCard 
              icon={Brain} 
              title="Skills" 
              count={stats.skills} 
              color="#6f42c1"
              description="Technical and soft skills"
            />
          </div>

          <div style={{
            background: '#f8f9fa',
            padding: '2rem',
            borderRadius: '10px',
            border: '1px solid #e9ecef'
          }}>
            <h3 style={{ margin: '0 0 1rem 0', color: '#333' }}>Quick Actions</h3>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
              gap: '1rem'
            }}>
              {[
                { path: '/academic', label: 'Add Academic Details', icon: GraduationCap, color: '#28a745' },
                { path: '/internships', label: 'Add Internship', icon: Briefcase, color: '#17a2b8' },
                { path: '/work-experience', label: 'Add Work Experience', icon: Building, color: '#ffc107' },
                { path: '/certificates', label: 'Add Certificate', icon: Award, color: '#dc3545' },
                { path: '/skills', label: 'Add Skill', icon: Brain, color: '#6f42c1' }
              ].map((item) => {
                const IconComponent = item.icon;
                return (
                  <a
                    key={item.path}
                    href={item.path}
                    style={{
                      background: 'white',
                      padding: '1rem',
                      borderRadius: '8px',
                      border: '1px solid #e9ecef',
                      textDecoration: 'none',
                      color: '#333',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      transition: 'all 0.2s',
                      fontWeight: 'bold'
                    }}
                    onMouseOver={(e) => {
                      e.target.style.borderColor = item.color;
                      e.target.style.boxShadow = `0 2px 8px ${item.color}20`;
                    }}
                    onMouseOut={(e) => {
                      e.target.style.borderColor = '#e9ecef';
                      e.target.style.boxShadow = 'none';
                    }}
                  >
                    <IconComponent size={20} style={{ color: item.color }} />
                    {item.label}
                  </a>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;

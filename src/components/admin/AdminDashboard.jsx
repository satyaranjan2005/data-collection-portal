import React, { useState, useEffect } from 'react';
import dataService from '../../services/dataService.js';
import authService from '../../services/authService.js';
import { Database, Users, GraduationCap, Briefcase, Building, Award, Brain } from 'lucide-react';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalAcademicDetails: 0,
    totalInternships: 0,
    totalWorkExperience: 0,
    totalCertificates: 0,
    totalSkills: 0
  });

  const [recentData, setRecentData] = useState({
    academicDetails: [],
    internships: [],
    workExperience: [],
    certificates: [],
    skills: []
  });

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = () => {
    // Get user stats
    const users = authService.getAllUsers().filter(user => user.role !== 'admin');
    
    // Get all data
    const allData = dataService.getAllData();
    
    setStats({
      totalUsers: users.length,
      totalAcademicDetails: allData.academicDetails.length,
      totalInternships: allData.internships.length,
      totalWorkExperience: allData.workExperience.length,
      totalCertificates: allData.certificates.length,
      totalSkills: allData.skills.length
    });

    // Get recent data (last 5 entries of each type)
    setRecentData({
      academicDetails: allData.academicDetails
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 3),
      internships: allData.internships
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 3),
      workExperience: allData.workExperience
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 3),
      certificates: allData.certificates
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 3),
      skills: allData.skills
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 5)
    });
  };
  const StatCard = ({ icon: IconComponent, title, count, color }) => (
    <div style={{
      background: 'white',
      padding: '1.5rem',
      borderRadius: '10px',
      border: '1px solid #e9ecef',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      textAlign: 'center'
    }}>
      <IconComponent size={40} style={{ color, marginBottom: '1rem' }} />
      <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '2rem', color: '#333' }}>{count}</h3>
      <p style={{ margin: 0, color: '#666', fontWeight: 'bold' }}>{title}</p>
    </div>
  );
  const RecentDataCard = ({ title, data, icon: IconComponent, color, renderItem }) => (
    <div style={{
      background: 'white',
      borderRadius: '10px',
      border: '1px solid #e9ecef',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      overflow: 'hidden'
    }}>
      <div style={{
        background: color,
        color: 'white',
        padding: '1rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem'
      }}>
        <IconComponent size={20} />
        <h3 style={{ margin: 0 }}>{title}</h3>
      </div>
      <div style={{ padding: '1rem' }}>
        {data.length === 0 ? (
          <p style={{ color: '#666', fontStyle: 'italic' }}>No recent data</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {data.map(renderItem)}
          </div>
        )}
      </div>
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
        <Database size={32} style={{ marginRight: '1rem', color: '#667eea' }} />
        <h1 style={{ margin: 0, color: '#333' }}>Admin Dashboard</h1>
      </div>

      {/* Statistics Cards */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
        gap: '1rem',
        marginBottom: '2rem'
      }}>
        <StatCard 
          icon={Users} 
          title="Total Users" 
          count={stats.totalUsers} 
          color="#667eea" 
        />
        <StatCard 
          icon={GraduationCap} 
          title="Academic Details" 
          count={stats.totalAcademicDetails} 
          color="#28a745" 
        />
        <StatCard 
          icon={Briefcase} 
          title="Internships" 
          count={stats.totalInternships} 
          color="#17a2b8" 
        />
        <StatCard 
          icon={Building} 
          title="Work Experience" 
          count={stats.totalWorkExperience} 
          color="#ffc107" 
        />
        <StatCard 
          icon={Award} 
          title="Certificates" 
          count={stats.totalCertificates} 
          color="#dc3545" 
        />
        <StatCard 
          icon={Brain} 
          title="Skills" 
          count={stats.totalSkills} 
          color="#6f42c1" 
        />
      </div>

      {/* Recent Data */}
      <h2 style={{ marginBottom: '1.5rem', color: '#333' }}>Recent Activity</h2>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', 
        gap: '1rem'
      }}>
        <RecentDataCard
          title="Recent Academic Details"
          data={recentData.academicDetails}
          icon={GraduationCap}
          color="#28a745"
          renderItem={(item) => (
            <div key={item.id} style={{ 
              padding: '0.75rem', 
              background: '#f8f9fa', 
              borderRadius: '5px',
              fontSize: '0.9rem'
            }}>
              <div style={{ fontWeight: 'bold', color: '#333' }}>{item.name}</div>
              <div style={{ color: '#666' }}>{item.degree} in {item.subject}</div>
              <div style={{ color: '#888', fontSize: '0.8rem' }}>{item.institution}</div>
            </div>
          )}
        />

        <RecentDataCard
          title="Recent Internships"
          data={recentData.internships}
          icon={Briefcase}
          color="#17a2b8"
          renderItem={(item) => (
            <div key={item.id} style={{ 
              padding: '0.75rem', 
              background: '#f8f9fa', 
              borderRadius: '5px',
              fontSize: '0.9rem'
            }}>
              <div style={{ fontWeight: 'bold', color: '#333' }}>{item.name}</div>
              <div style={{ color: '#666' }}>{item.role} at {item.company}</div>
              <div style={{ color: '#888', fontSize: '0.8rem' }}>{item.project}</div>
            </div>
          )}
        />

        <RecentDataCard
          title="Recent Work Experience"
          data={recentData.workExperience}
          icon={Building}
          color="#ffc107"
          renderItem={(item) => (
            <div key={item.id} style={{ 
              padding: '0.75rem', 
              background: '#f8f9fa', 
              borderRadius: '5px',
              fontSize: '0.9rem'
            }}>
              <div style={{ fontWeight: 'bold', color: '#333' }}>{item.name}</div>
              <div style={{ color: '#666' }}>{item.role} at {item.company}</div>
              <div style={{ color: '#888', fontSize: '0.8rem' }}>{item.project}</div>
            </div>
          )}
        />

        <RecentDataCard
          title="Recent Certificates"
          data={recentData.certificates}
          icon={Award}
          color="#dc3545"
          renderItem={(item) => (
            <div key={item.id} style={{ 
              padding: '0.75rem', 
              background: '#f8f9fa', 
              borderRadius: '5px',
              fontSize: '0.9rem'
            }}>
              <div style={{ fontWeight: 'bold', color: '#333' }}>{item.name}</div>
              <div style={{ color: '#666' }}>{item.certificate}</div>
              <div style={{ color: '#888', fontSize: '0.8rem' }}>{item.domain}</div>
            </div>
          )}
        />

        <div style={{
          background: 'white',
          borderRadius: '10px',
          border: '1px solid #e9ecef',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          overflow: 'hidden',
          gridColumn: 'span 2'
        }}>
          <div style={{
            background: '#6f42c1',
            color: 'white',
            padding: '1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <Brain size={20} />
            <h3 style={{ margin: 0 }}>Recent Skills</h3>
          </div>
          <div style={{ padding: '1rem' }}>
            {recentData.skills.length === 0 ? (
              <p style={{ color: '#666', fontStyle: 'italic' }}>No recent skills</p>
            ) : (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {recentData.skills.map((item) => (
                  <span
                    key={item.id}
                    style={{
                      background: '#6f42c1',
                      color: 'white',
                      padding: '0.25rem 0.75rem',
                      borderRadius: '15px',
                      fontSize: '0.8rem',
                      fontWeight: 'bold'
                    }}
                  >
                    {item.skill} ({item.name})
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

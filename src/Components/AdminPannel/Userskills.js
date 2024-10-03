import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Typography, Chip, CircularProgress, Grid, Paper } from '@mui/material';
import './Userskill.css'; // Import the CSS file

const UserSkills = () => {
  const { userId } = useParams(); // Get userId from URL parameters
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserSkills = async () => {
      try {
        const response = await axios.get('http://49.204.232.254:90/users/getall');
        const users = response.data?.data || [];
        // Find the user with the matching userId
        const user = users.find((user) => user._id === userId);
        if (user) {
          setSkills(user.skills || []); // Set the user's skills or an empty array if none exist
        } else {
          setError('User not found');
        }
      } catch (error) {
        console.error('Error fetching users:', error);
        setError('Failed to load skills');
      } finally {
        setLoading(false);
      }
    };

    fetchUserSkills();
  }, [userId]);

  if (loading) {
    return <CircularProgress size={60} />;
  }

  if (error) {
    return <Typography color="error" className="error-message">{error}</Typography>;
  }

  return (
    <div className="user-skills-container">
      <Typography variant="h4" gutterBottom className="title">
        Skills for User ID: {userId}
      </Typography>
      <Grid container spacing={2}>
        {skills.length > 0 ? (
          skills.map((skill, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Paper className="skill-card">
                <Chip label={skill.skillname} color="primary" className="skill-chip" />
                <Typography variant="body2">
                  <strong>Experience:</strong> {skill.experiences} years
                </Typography>
                <Typography variant="body2">
                  <strong>Qualification:</strong> {skill.qualifications}
                </Typography>
                <Typography variant="body2">
                  <strong>Languages:</strong> {skill.languages.join(', ')}
                </Typography>
                <Typography variant="body2">
                  <strong>Status:</strong> {skill.status}
                </Typography>

                {/* Certificates Section */}
                {skill.certificates && skill.certificates.length > 0 && (
                  <div className="certificates-section">
                    <Typography variant="body2">
                      <strong>Certificates:</strong>
                    </Typography>
                    {skill.certificates.map((certificate, certIndex) => (
                      <Typography key={certIndex} variant="body2">
                        <a href={`http://49.204.232.254:90/${certificate}`} target="_blank" rel="noopener noreferrer">
                          View Certificate {certIndex + 1}
                        </a>
                      </Typography>
                    ))}
                  </div>
                )}
              </Paper>
            </Grid>
          ))
        ) : (
          <Typography className="no-skills-message">No skills found</Typography>
        )}
      </Grid>
    </div>
  );
};

export default UserSkills;

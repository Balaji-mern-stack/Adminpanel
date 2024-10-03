import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2'; // For better alert UI
import {
  Typography,
  Button,
  CircularProgress,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Container,
  Box,
} from '@mui/material';

const UserDetails = () => {
  const { id: userId } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) {
      console.error('User ID is missing');
      return;
    }

    axios
      .get(`http://49.204.232.254:90/users/getbyid/${userId}`) // Replace with the actual API URL
      .then((response) => {
        setUser(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching user details:', error);
        setLoading(false);
      });
  }, [userId]);

  const updateSkillStatus = (skillId, newStatus) => {
    axios
      .post('http://49.204.232.254:90/admin/status', {
        userId,
        skillId,
        status: newStatus,
      })
      .then((response) => {
        console.log('Skill status updated:', response.data);
        Swal.fire('Success!', `Skill status updated to ${newStatus}.`, 'success');
      })
      .catch((error) => {
        console.error('Error updating skill status:', error);
        Swal.fire('Error!', 'Failed to update skill status. Please try again.', 'error');
      });
  };

  if (loading) return <CircularProgress />; // Show spinner when loading

  return (
    <Container>
      <Card variant="outlined">
        <CardContent>
          <Typography variant="h4" gutterBottom sx={{ fontFamily: 'Poppins' }}>
            User Details
          </Typography>
          <Typography variant="h6" sx={{ fontFamily: 'Poppins' }}>Username: {user?.username}</Typography>
          <Typography variant="h6" sx={{ fontFamily: 'Poppins' }}>Email: {user?.email}</Typography>

          <Typography variant="h5" sx={{ marginTop: 3, fontFamily: 'Poppins' }}>
            Skills
          </Typography>
          <List>
            {user.skills && user.skills.length > 0 ? (
              user.skills.map((skill) => (
                <ListItem
                  key={skill._id}
                  sx={{
                    backgroundColor:
                      skill.status === 'Approved'
                        ? 'green.100'
                        : skill.status === 'Rejected'
                        ? 'red.100'
                        : 'grey.100',
                    borderRadius: '8px',
                    marginBottom: '10px',
                    fontFamily: 'Poppins',
                  }}
                >
                  <ListItemText
                    primary={`${skill.skillname} - Status: ${skill.status}`}
                    sx={{ fontFamily: 'Poppins' }}
                  />
                  <Box sx={{ marginLeft: 'auto' }}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => updateSkillStatus(skill._id, 'Approved')}
                      sx={{ marginRight: 1, fontFamily: 'Poppins' }}
                    >
                      Approve
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => updateSkillStatus(skill._id, 'Rejected')}
                      sx={{ fontFamily: 'Poppins' }}
                    >
                      Reject
                    </Button>
                  </Box>
                </ListItem>
              ))
            ) : (
              <Typography sx={{ fontFamily: 'Poppins' }}>No skills found.</Typography>
            )}
          </List>
        </CardContent>
      </Card>
    </Container>
  );
};

export default UserDetails;

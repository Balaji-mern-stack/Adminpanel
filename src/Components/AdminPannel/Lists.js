// UserList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
  CircularProgress,
} from '@mui/material';
import './List.css'; // Custom CSS for additional styles

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get('http://49.204.232.254:90/users/getall')
      .then((response) => {
        setUsers(response.data?.data || []);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
        setError('Failed to load user data');
        setLoading(false);
      });
  }, []);

  const viewUserDetails = (userId) => {
    if (userId) {
      navigate(`/user/${userId}`);
    } else {
      console.error('Invalid user ID');
    }
  };

  const viewUserSkills = (userId) => {
    if (userId) {
      navigate(`/user-skills/${userId}`);
    } else {
      console.error('Invalid user ID');
    }
  };

  if (loading) {
    return (
      <div className="loading">
        <CircularProgress size={60} />
        <Typography variant="h6">Loading users...</Typography>
      </div>
    );
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <div className="user-list">
      <Typography variant="h4" gutterBottom className="title">
        Users List
      </Typography>
      <TableContainer component={Paper} sx={{ boxShadow: 4 }}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead sx={{ backgroundColor: '#f4f4f4' }}>
            <TableRow>
              <TableCell className="table-header">Username</TableCell>
              <TableCell className="table-header">Email</TableCell>
              <TableCell className="table-header">Phone Number</TableCell>
              <TableCell className="table-header">Image</TableCell>
              <TableCell className="table-header">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.length > 0 ? (
              users.map((user) => (
                <TableRow key={user._id}>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.phonenumber}</TableCell>
                  <TableCell>
                    {user.image && user.image.length > 0 ? (
                      user.image.map((imgUrl, index) => (
                        <a
                          key={index}
                          href={`http://49.204.232.254:90/api${imgUrl}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <img
                            src={`http://49.204.232.254:90/api${imgUrl}`}
                            alt={`User ${user.username}`}
                            className="user-image"
                          />
                        </a>
                      ))
                    ) : (
                      'No image'
                    )}
                  </TableCell>
                  <TableCell>
                    {/* Single View Skills button for each user */}
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={() => viewUserSkills(user._id)}
                    >
                      View Skills
                    </Button>
                    {/* Action button to view user details */}
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => viewUserDetails(user._id)}
                      sx={{ fontSize: '14px', marginLeft: '10px' }}
                    >
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5}>
                  <Typography>No users found</Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default UserList;

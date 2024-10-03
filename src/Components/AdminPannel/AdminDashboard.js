import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Drawer, List, ListItem, ListItemIcon, ListItemText, Container, Grid, Card, CardContent, Button, LinearProgress, ListItemButton } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faCog, faUser, faSignOutAlt, faChartBar, faBell, faUsers, faChartPie } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard">
      <Sidebar />
      <div className="main-content">
        <Topbar />
        <DashboardContent />
      </div>
    </div>
  );
};

const Sidebar = () => {
  return (
    <Drawer
      variant="permanent"
      anchor="left"
    >
      <List>
        <ListItemButton component={Link} to="/dashboard">
          <ListItemIcon>
            <FontAwesomeIcon icon={faChartBar} />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItemButton>

        <ListItemButton component={Link} to="/users">
          <ListItemIcon>
            <FontAwesomeIcon icon={faUsers} />
          </ListItemIcon>
          <ListItemText primary="Users" />
        </ListItemButton>

        <ListItemButton component={Link} to="/category">
          <ListItemIcon>
            <FontAwesomeIcon icon={faChartPie} />
          </ListItemIcon>
          <ListItemText primary="Category" />
        </ListItemButton>

        <ListItemButton component={Link} to="/logout">
          <ListItemIcon>
            <FontAwesomeIcon icon={faSignOutAlt} style={{ color: "red" }} />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItemButton>
      </List>
    </Drawer>
  );
};

const Topbar = () => {
  return (
    <AppBar position="fixed">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Admin Panel
        </Typography>
        <IconButton edge="end" color="inherit" href="#profile">
          <FontAwesomeIcon icon={faUser} />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

const DashboardContent = () => {
  return (
    <Container sx={{ mt: 12 }}>
      <Grid container spacing={3}>
        {/* Quick Stats Row */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <FontAwesomeIcon icon={faUsers} size="3x" />
              <Typography variant="h5">Total Users</Typography>
              <Typography variant="h6">1,234 Active Users This Month</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <FontAwesomeIcon icon={faChartPie} size="3x" />
              <Typography variant="h5">Analytics</Typography>
              <Typography variant="h6">8,567 Page Views This Week</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <FontAwesomeIcon icon={faBell} size="3x" />
              <Typography variant="h5">New Notifications</Typography>
              <Typography variant="h6">42 Alerts This Week</Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Detailed Content Row */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h5">Site Traffic Overview</Typography>
              <LinearProgress variant="determinate" value={60} sx={{ mb: 2 }} />
              <Typography>The traffic on your website has increased by 20% in the last week. Keep up the good work!</Typography>
              <Button variant="contained" color="primary" href="#analytics">View Details</Button>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h5">Recent Activity</Typography>
              <List>
                <ListItem>User A logged in</ListItem>
                <ListItem>New user registered</ListItem>
                <ListItem>Analytics data updated</ListItem>
                <ListItem>New comment posted</ListItem>
              </List>
              <Button variant="contained" color="primary" href="#activity" sx={{ mt: 2 }}>View All Activity</Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Settings and User Management Row */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h5">Manage Users</Typography>
              <Typography>Control user permissions and manage user profiles from a centralized interface.</Typography>
              <Button variant="contained" color="primary" href="#users">Manage Users</Button>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h5">System Settings</Typography>
              <Typography>Configure system-wide settings, update security parameters, and manage notifications.</Typography>
              <Button variant="contained" color="primary" href="#settings">Go to Settings</Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AdminDashboard;

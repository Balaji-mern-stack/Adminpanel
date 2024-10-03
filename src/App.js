import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserList from './Components/AdminPannel/Lists'; // Adjust import path as needed
import UserDetails from './Components/AdminPannel/Access'; // Adjust import path as needed
import UserSkills from './Components/AdminPannel/Userskills'; // Adjust import path as needed
import CategoryPage from './Components/AdminPannel/CategoryPage';
import AdminDashboard from './Components/AdminPannel/AdminDashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserList />} />
        <Route path="/dash" element={<AdminDashboard/>} />
        <Route path="/category" element={<CategoryPage />} />
        <Route path="/user/:id" element={<UserDetails />} />
        <Route path="/user-skills/:userId" element={<UserSkills />} />
      </Routes>
    </Router>
  );
}

export default App;

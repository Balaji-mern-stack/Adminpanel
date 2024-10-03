import React, { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import { Card } from "react-bootstrap";

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://49.204.232.254:90/users/getall");
        console.log("Fetched Users:", response.data);

        if (response.data) {
          setUsers(response.data.data);
        } else {
          setError("Invalid data format from API");
        }
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch users");
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

 
  const columns = [
    {
      name: "Username",
      selector: (row) => row.username || "N/A",
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email || "N/A",
      sortable: true,
    },
    {
      name: "Password",
      selector: (row) => row.password || "N/A",
      sortable: true,
    },
    {
      name: "Phone Number",
      selector: (row) => row.phonenumber || "N/A",
      sortable: true,
    },
    {
      name: "Images",
      selector: (row) => {
        const imageUrl = Array.isArray(row.image) ? row.image[0] : row.image;
        const fixedImageUrl = imageUrl ? imageUrl.replace(/^\/+/, "") : null; // Remove leading slashes
        return fixedImageUrl ? (
          <a
            href={`http://49.204.232.254:90/api/Data/Images/${fixedImageUrl}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={`http://49.204.232.254:90/api/Data/Images/${fixedImageUrl}`}
              alt="User"
              style={{ width: "50px", height: "50px", objectFit: "cover" }}
            />
          </a>
        ) : (
          "N/A"
        );
      },
      sortable: true,
    },
    {
      name: "Skillname",
      selector: (row) =>
        Array.isArray(row.skills) && row.skills.length > 0
          ? row.skills.map((skill) => skill.skillname || "N/A").join(", ")
          : "N/A",
      sortable: true,
    },
    {
      name: "Experience",
      selector: (row) =>
        Array.isArray(row.skills) && row.skills.length > 0
          ? row.skills.map((skill) => skill.experiences || "N/A").join(", ")
          : "N/A",
      sortable: true,
    },
    {
      name: "Qualifications",
      selector: (row) =>
        Array.isArray(row.skills) && row.skills.length > 0
          ? row.skills.map((skill) => skill.qualifications || "N/A").join(", ")
          : "N/A",
      sortable: true,
    },
    {
      name: "Certificates",
      selector: (row) =>
        Array.isArray(row.skills) && row.skills.length > 0
          ? row.skills.map((skill) => skill.certificates || "N/A").join(", ")
          : "N/A",
      sortable: true,
    },
    {
      name: "Approved",
      selector: (row) => (
        <div>
          <button
            onClick={() => handleApprove(row.id)}
            style={{
              marginRight: "10px",
              padding: "5px 10px",
              backgroundColor: "#4CAF50",
              color: "#FFF",
              border: "none",
              borderRadius: "4px",
            }}
          >
            Approved
          </button>
          <button
            onClick={() => handleDecline(row.id)}
            style={{
              padding: "5px 10px",
              backgroundColor: "#F44336",
              color: "#FFF",
              border: "none",
              borderRadius: "4px",
            }}
          >
            Not Approved
          </button>
        </div>
      ),
      sortable: false,
    },
  ];

  if (loading) return <p className="loading-text">Loading...</p>;
  if (error) return <p className="error-text">{error}</p>;

  return (
    <Card className="users-card">
      <button className="btn-add-user">+ Add User</button>
      <Card.Title className="users-card-title">Users</Card.Title>
      <div className="table-responsive">
        <DataTable
          columns={columns}
          data={users}
          pagination
          highlightOnHover
          pointerOnHover
          responsive
        />
      </div>
    </Card>
  );
};

export default UsersPage;

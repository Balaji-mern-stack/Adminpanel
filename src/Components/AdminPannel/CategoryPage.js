import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import { Card } from 'react-bootstrap';
import './CategoryPage.css'; // Ensure this path is correct

const CategoryPage = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState({ category: '', description: '' }); // New category state
  const [adding, setAdding] = useState(false); // Track if adding a new category
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        // Updated API URL
        const response = await axios.get('http://49.204.232.254:90/category/all');
        console.log('Fetched Data:', response.data);
        setCategories(response.data.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch categories');
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Handle input change for new category
  const handleInputChange = (e) => {
    setNewCategory({
      ...newCategory,
      [e.target.name]: e.target.value
    });
  };

  // Handle add category button click
  const handleAddCategory = () => {
    setAdding(true);
  };

  // Handle save new category
  const handleSaveCategory = () => {
    setCategories([...categories, newCategory]); // Add the new category to the list
    setNewCategory({ category: '', description: '' }); // Reset new category fields
    setAdding(false); // Stop adding mode
  };

  const columns = [
    {
      name: 'ID',
      selector: row => row._id || 'New',
      sortable: true,
    },
    {
      name: 'Category',
      selector: row => row.category,
      sortable: true,
    },
    {
      name: 'Description',
      selector: row => row.description,
      sortable: true,
    }
  ];

  if (loading) return <p className="loading-text">Loading...</p>;
  if (error) return <p className="error-text">{error}</p>;

  return (
    <Card className="category-card">
      <button className='btnadd' onClick={handleAddCategory}>+ Add Category</button>
      <Card.Title className="category-card-title">Categories</Card.Title>

      {/* Render form for new category if adding */}
      {adding && (
        <div className="new-category-form">
          <input
            type="text"
            name="category"
            placeholder="Category Name"
            value={newCategory.category}
            onChange={handleInputChange}
            className="form-input"
          />
          <input
            type="text"
            name="description"
            placeholder="Description"
            value={newCategory.description}
            onChange={handleInputChange}
            className="form-input"
          />
          <button className="btnsave" onClick={handleSaveCategory}>Save Category</button>
        </div>
      )}

      <div className="table-responsive">
        <DataTable
          columns={columns}
          data={categories}
          pagination
          highlightOnHover
          pointerOnHover
          responsive
          customStyles={{
            rows: {
              style: {
                minHeight: '50px',
                '&:not(:last-of-type)': {
                  borderBottomStyle: 'solid',
                  borderBottomWidth: '1px',
                  borderBottomColor: '#E2E8F0'
                }
              },
            },
            headCells: {
              style: {
                paddingLeft: '16px',
                paddingRight: '16px',
                backgroundColor: '#3182CE',
                color: '#FFF',
                fontSize: '16px',
                fontWeight: '600',
                textTransform: 'uppercase'
              },
            },
            cells: {
              style: {
                paddingLeft: '8px',
                paddingRight: '8px',
                backgroundColor: '#F7FAFC',
                color: '#2D3748',
                fontSize: '15px'
              },
            },
          }}
        />
      </div>
    </Card>
  );
};

export default CategoryPage;

import React, { useState } from 'react';
import api from '../utils/axios';
import '../styles/AdminAddFood.css';

const AdminAddFood = () => {
  const [foodData, setFoodData] = useState({
    name: '',
    price: '',
    category: '',
    description: ''
  });
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState('');
  const token = localStorage.getItem('token');

  const handleChange = (e) => {
    setFoodData({ ...foodData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // 1. Upload image
      const formData = new FormData();
      formData.append('image', imageFile);

      const uploadRes = await api.post('/foods/upload-image', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });

      // 2. Create food
      const imageUrl = uploadRes.data.imageUrl;

      await api.post('/foods', { ...foodData, image: imageUrl }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      alert('Food item added!');
      setFoodData({ name: '', price: '', category: '', description: '' });
      setImageFile(null);
      setPreview('');
    } catch (err) {
      console.error(err);
      alert('Upload failed');
    }
  };

  return (
    <div className="add-food-container">
      <h2>Add New Food Item</h2>
      <form onSubmit={handleSubmit} className="add-food-form">
        <input name="name" placeholder="Food Name" value={foodData.name} onChange={handleChange} required />
        <input name="price" placeholder="Price" type="number" value={foodData.price} onChange={handleChange} required />
        <input name="category" placeholder="Category" value={foodData.category} onChange={handleChange} required />
        <textarea name="description" placeholder="Description" value={foodData.description} onChange={handleChange} />
        
        <input type="file" accept="image/*" onChange={handleImageChange} />
        {preview && <img src={preview} alt="Preview" className="food-preview" />}
        
        <button type="submit">Add Food</button>
      </form>
    </div>
  );
};

export default AdminAddFood;

import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export function AddForm({ onAddToy }) {
  const [toyData, setToyData] = useState({
    name: '',
    price: '',
    labels: '',
    inStock: '',
    img: '',
  });

  const imgUrl = 'https://robohash.org/'

  const handleChange = (e) => {
    const { name, value } = e.target;
    setToyData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleAddToy = () => {
    // Convert labels input into an array (comma-separated)
    const labelsArray = toyData.labels.split(',').map((label) => label.trim());

    // Update toyData with the array of labels
    const updatedToyData = { ...toyData, labels: labelsArray };

    // Call the onAddToy function with the updated toyData
    onAddToy(updatedToyData);

    // Clear the form after adding the toy
    setToyData({
      name: '',
      price: '',
      labels: '',
      inStock: '',
      img: '',
    });
  };

  return (
    <div>
      <TextField
        label="Name"
        name="name"
        value={toyData.name}
        onChange={handleChange}
        variant="outlined"
      />
      <TextField
        label="Price"
        name="price"
        value={toyData.price}
        onChange={handleChange}
        variant="outlined"
        type="number"
      />
      <TextField
        label="Labels (comma-separated)"
        name="labels"
        value={toyData.labels}
        onChange={handleChange}
        variant="outlined"
      />
      <TextField
        label="inStock"
        name="inStock"
        value={toyData.inStock}
        onChange={handleChange}
        variant="outlined"
        type="number"
      />
      <TextField
        label="Image URL"
        name="img"
        value={`${imgUrl}${toyData.name}`}
        onChange={handleChange}
        variant="outlined"
      />

      <Button variant="contained" color="primary" onClick={handleAddToy}>
        Add Toy
      </Button>
    </div>
  );
}
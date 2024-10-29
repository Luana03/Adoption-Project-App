import React, { useState } from 'react';
import './App.css';

function App() {
  const [animal, setAnimal] = useState({
    name: '',
    type: '',
    age: '',
    description: '',
    donor_contact: '',
    gender: '',
    images: [], // Change to an array to hold multiple images
  });

  const [animals, setAnimals] = useState([]); // New state for registered animals
  const [selectedImage, setSelectedImage] = useState(null); // State for the selected image for viewing

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAnimal({
      ...animal,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files); // Convert FileList to array
    const imageUrls = files.map(file => URL.createObjectURL(file)); // Create object URLs for each file
    setAnimal({ ...animal, images: imageUrls }); // Update state with the array of image URLs
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const animalData = {
      ...animal,
    };

    setAnimals([...animals, animalData]); // Add the new animal to the list
    alert('Animal Registrado Sucesso!');
    setAnimal({ name: '', type: '', age: '', description: '', donor_contact: '', gender: '', images: [] }); // Reset form
  };

  const handleImageClick = (image) => {
    setSelectedImage(image); // Set the clicked image to display in larger size
  };

  const handleCloseModal = () => {
    setSelectedImage(null); // Close the modal
  };

  return (
    <div className="App">
      <h1>Registro de animais para Adoção</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Tipo <span className="suggestion">(gato, cachorro, etc)</span>:</label>
          <input
            type="text"
            name="type"
            value={animal.type}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Sexo do Animal <span className="suggestion">(fêmea, macho)</span>:</label>
          <input
            type="text"
            name="gender"
            value={animal.gender}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Quantidade </label>
          <input
            type="text"
            name="quantity"
            value={animal.quantity}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Idade <span className="suggestion">(estimativa)</span>:</label>
          <input
            type="text"
            name="age"
            value={animal.age}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Descrição <span className="suggestion">(saúde, condições em que foi encontrado, bairro etc)</span>:</label>
          <textarea
            name="description"
            value={animal.description}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Contato do Doador:</label>
          <textarea
            name="donor_contact"
            value={animal.donor_contact}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Imagens:</label>
          <input
            type="file"
            name="images"
            accept="image/*"
            onChange={handleImageChange}
            multiple // Allow multiple file selection
            required
          />
        </div>
        {animal.images.length > 0 && (
          <div>
            <h3>Image Previews ({animal.images.length} selected):</h3>
            {animal.images.map((image, index) => (
              <img key={index} src={image} alt={`Animal ${index + 1}`} style={{ width: '100px', height: 'auto', margin: '5px', cursor: 'pointer' }} onClick={() => handleImageClick(image)} />
            ))}
          </div>
        )}
        <button type="submit">Registrar Animal</button>
      </form>

      {/* Separate display section for registered animals */}
      <div style={{ marginTop: '40px' }}>
        <h2>Animais Disponíveis para Adoção:</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
          {animals.map((animal, index) => (
            <div key={index} style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '5px' }}>
              <h3>{animal.name}</h3>
              <p>Type: {animal.type}</p>
              <p>Age: {animal.age}</p>
              <p>Description: {animal.description}</p>
              <p>Donor Contact: {animal.donor_contact}</p>
              {animal.images.length > 0 && (
                <img
                  src={animal.images[0]} // Display the first image in the list
                  alt={animal.name}
                  style={{ width: '150px', height: 'auto', cursor: 'pointer' }}
                  onClick={() => handleImageClick(animal.images[0])} // Click to view larger
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Modal for displaying the selected image */}
      {selectedImage && (
        <div className="modal" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="close" onClick={handleCloseModal}>&times;</span>
            <img src={selectedImage} alt="Large Animal" style={{ width: '100%', height: 'auto' }} />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

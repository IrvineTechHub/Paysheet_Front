import React, { useState } from 'react';
import '../css/UploadImage.css';

function UploadImage() {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <h2>Upload Image</h2>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
      />
      {selectedImage && (
        <div className="preview-container">
          <h3>Preview:</h3>
          <img src={selectedImage} alt="Uploaded Preview" />
        </div>
      )}
    </div>
  );
}

export default UploadImage;

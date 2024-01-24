import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/UploadImage.css';

function UploadImage() {
  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate();

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target.result);
        // 이미지 업로드 후 ModifyInfo 페이지로 이동
        navigate('/modifyinfo', { state: { selectedImage: e.target.result } });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <h1>Upload Image</h1>
      <div className="upload-container">
        <input type="file" accept="image/*" onChange={handleImageChange} />
        {selectedImage && (
          <div className="preview-container">
            <h3>미리보기:</h3>
            <img src={selectedImage} alt="업로드된 미리보기" />
          </div>
        )}
      </div>
    </div>
  );
}

export default UploadImage;

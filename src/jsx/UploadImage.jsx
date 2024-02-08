import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/UploadImage.css";

function UploadImage() {
  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate();
  const [img_file, setFile] = useState(null);

  const handleImageChange = (event) => {
    const img_file = event.target.files[0];

    if (img_file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target.result);
        setFile(img_file);
      };
      reader.readAsDataURL(img_file);
    }
  };

  const uploadFile = async () => {
    if (!img_file) {
      console.error("이미지를 선택하세요.");
      return;
    }

    const formData = new FormData();
    formData.append("img_file", img_file);

    try {
      const res = await fetch("http://127.0.0.1:5000/upload/upload_img", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      console.log("Response Data:", data);

      // Check if the upload was successful
      if (res.ok) {
        console.log(data.message); // Log the success message
      } else {
        console.error(data.error); // Log any error message
      }
      // Navigate to the 'modifyinfo' route with extracted text
      navigate("/modifyinfo", {
        state: { ocrData: data, selectedImage: selectedImage },
      });
    } catch (error) {
      console.error("Error sending file:", error);
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
            <button onClick={uploadFile}>확인</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default UploadImage;

import { useState } from "react";

const ImageUpload = ({ onImageUpload }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");

  const handleImageChange = (event) => {
      const file = event.target.files[0];
      if(file) 
          setSelectedFile(file);
  };

  const handleUpload = async () => {
      if(!selectedFile){
          setUploadStatus("Please select a file before uploading");
          return;
      }

      const formData = new FormData();
      formData.append("image", selectedFile);

      try{
        //   const response = await fetch("http://localhost:2508/uploadImage", {
            const response = await fetch("https://email-builder-backend-jfx8.onrender.com/uploadImage", {
              method : "POST",
              body : formData,
          });

          if(response.ok){
              const result = await response.json();
              setUploadStatus("Upload successful!");
              onImageUpload(result.imageUrl);
          } 
          else{
              const errorResponse = await response.text();
              setUploadStatus(`Error uploading image: ${errorResponse}`);
          }
      } 
      catch(error){
          setUploadStatus(`Error uploading image: ${error.message}`);
      }
  };

  return (
      <div>
          {/* <h4>Image Upload</h4> */}
          <input className="fileInput" type="file" onChange={handleImageChange} />
          <br />
          <br />
          <button className="fileInputButton" onClick={handleUpload}>Upload Logo</button>
          {uploadStatus && <h3 className="uploadStatus">{uploadStatus}</h3>}
      </div>
  );
};

export default ImageUpload;
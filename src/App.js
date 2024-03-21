import React, { useState } from 'react';
import './App.css';

function App() {
      const token = "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";
     
      const [inputData ,setInputData] =useState("");
      const [imgSrc, setImgSrc] = useState("");
    
      async function query() {
        try {
            const response = await fetch(
                "https://api-inference.huggingface.co/models/Melonie/text_to_image_finetuned", {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                method: "POST",
                body: JSON.stringify({
                    "inputs": inputData
                }),
            });
            const result = await response.blob();
            return result;
        } catch (error) {
            console.error("Error:", error);
        }
    }

     
    async function handleClick() {
      try {
          const response = await query();
          const convertToObjectUrl = URL.createObjectURL(response);
          setImgSrc(convertToObjectUrl);
      } catch (error) {
          console.error("Error:", error);
      }
  }

  return (
    <div className="App">
        <h1>Image Genrater App</h1>
        <input type="text" value={inputData} onChange={(e) => setInputData(e.target.value)} placeholder="Type here..." />
        <button onClick={handleClick}>Search</button>
        <img id="imglk" src={imgSrc} alt="" />
    </div>
   );
}
export default App;

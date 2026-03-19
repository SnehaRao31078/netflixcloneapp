
import "./edit.css";
import {useParams,useNavigate} from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
function Edit()
{
   const{id}=useParams() 
     const [file, setFile] = useState(null);
     const[video,setVideo]=useState(null);
     const [title, setTitle] = useState("");
     const [description, setDescription] = useState("");
     const [language, setLanguage] = useState("");
     const navigate=useNavigate();
     


     useEffect(() => {
    axios.get(`https://netflix-cloneapp-backend.onrender.com/movies/${id}`)
      .then(res => {
        
        setTitle(res.data.title);
        setDescription(res.data.description);
        setLanguage(res.data.language);
        setFile(res.data.file);
      })
      .catch(err => console.log(err));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("language", language);
     formData.append("image", file); 
    formData.append("video",video) ;

    axios.put(`https://netflix-cloneapp-backend.onrender.com/movies/${id}`, formData)
      .then(res => {
        navigate("/admindash");
      })
      .catch(err => console.log(err));
  };
    return(

<div className="product-page">
      <div className="product-wrapper">
        <div className="container">
    
 <h1>Update Movies</h1>

 <form onSubmit={handleSubmit}>
    <input type="text"
    placeholder="Title"
    onChange={(e) => setTitle(e.target.value)}
    value={title}
    />
    <input type="text"
    placeholder="Description"
    
     onChange={(e) => setDescription(e.target.value)}
     value={description}/>
    

     <input type="text"
    placeholder="Language"
     onChange={(e) => setLanguage(e.target.value)}
     value={language}/>

     <input type="file"
    onChange={(e) => setFile(e.target.files[0])}
   
   />
 <input type="file"
  onChange={(e) => setVideo(e.target.files[0])}
/>
<button type="submit">Update</button>
 </form>
 </div></div>
 </div>


    );
}
export default Edit;
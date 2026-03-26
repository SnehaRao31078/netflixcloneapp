import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import  "/product.css";

function Addproduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [file, setFile] = useState(null);       
  const [video, setVideo] = useState(null);    
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [language, setLanguage] = useState("");
  const [category, setCategory] = useState("");
  const [plan, setPlan] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [videoPreview, setVideoPreview] = useState("");

  useEffect(() => {
    if (id) {
      axios
        .get(`${import.meta.env.VITE_API_URL}/products/${id}`)
        .then((res) => {
          setTitle(res.data.title);
          setDescription(res.data.description);
          setLanguage(res.data.language);
          setCategory(res.data.category);
          setPlan(res.data.plan);
          setImagePreview(res.data.file);
          setVideoPreview(res.data.video);
        });
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("language", language);
    formData.append("category", category);
    formData.append("plan", plan);

    if (file) formData.append("file", file);
    if (video) formData.append("video", video);

    if (id) {
      await axios.put(`${import.meta.env.VITE_API_URL}/products/${id}`, formData);
      alert("Updated Successfully");
    } else {
      await axios.post(`${import.meta.env.VITE_API_URL}/products`, formData);
      alert("Added Successfully");
    }

    navigate("/view");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="Title" onChange={(e)=>setTitle(e.target.value)} value={title}/>
      <input placeholder="Description" onChange={(e)=>setDescription(e.target.value)} value={description}/>
      <input placeholder="Language" onChange={(e)=>setLanguage(e.target.value)} value={language}/>

      <select onChange={(e)=>setCategory(e.target.value)} value={category}>
        <option value="">Category</option>
        <option value="sci-fi horror">Sci-Fi Horror</option>
      </select>

      <input type="file" onChange={(e)=>setFile(e.target.files[0])} />

      {imagePreview && (
        <img
          src={`${import.meta.env.VITE_API_URL}/Images/${imagePreview}`}
          width="120"
        />
      )}

      <input type="file" onChange={(e)=>setVideo(e.target.files[0])} />

      {videoPreview && (
        <video
          src={`${import.meta.env.VITE_API_URL}/Images/${videoPreview}`}
          width="120"
          controls
        />
      )}

      <button type="submit">Submit</button>
    </form>
  );
}

export default Addproduct;
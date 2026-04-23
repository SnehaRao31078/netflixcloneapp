import "./edit.css";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function Edit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [file, setFile] = useState(null);
  const [video, setVideo] = useState(null);

  const [imagePreview, setImagePreview] = useState("");
  const [videoPreview, setVideoPreview] = useState("");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [language, setLanguage] = useState("");

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/movies/${id}`)
      .then((res) => {
        setTitle(res.data.title);
        setDescription(res.data.description);
        setLanguage(res.data.language);

        setImagePreview(res.data.file);
        setVideoPreview(res.data.video);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("title", title);
    formData.append("description", description);
    formData.append("language", language);

    if (file) {
      formData.append("file", file);
    }

    if (video) {
      formData.append("video", video);
    }

    axios
      .put(`${import.meta.env.VITE_API_URL}/movies/${id}`, formData)
      .then(() => {
        alert("Movie updated successfully");
        navigate("/admindash");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="product-page">
      <div className="product-wrapper">
        <div className="container">
          <h1>Update Movie</h1>

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <input
              type="text"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <input
              type="text"
              placeholder="Language"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            />

            <input type="file" onChange={(e) => setFile(e.target.files[0])} />

            {imagePreview && <img src={imagePreview} width="120" />}

            <input type="file" onChange={(e) => setVideo(e.target.files[0])} />

            {videoPreview && <video src={videoPreview} width="120" controls />}

            <button type="submit">Update</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Edit;


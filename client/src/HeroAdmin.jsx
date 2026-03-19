import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./hero.css";

function HeroAdmin() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videoLink, setVideoLink] = useState("");

  useEffect(() => {
    if (id) {
      axios.get(`${import.meta.env.VITE_API_URL}/banners/${id}`)
        .then((res) => {
          setTitle(res.data.title);
          setDescription(res.data.description);
          setVideoLink(res.data.videoLink);
        })
        .catch((err) => console.log(err));
    }
  }, [id]);

  const convertYoutubeLink = (link) => {
    if (link.includes("watch?v=")) {
      const videoId = link.split("v=")[1].split("&")[0];
      setVideoLink(`https://www.youtube.com/embed/${videoId}`);
    } else {
      setVideoLink(link);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { title, description, videoLink };
    try {
      if (id) {
       await axios.put(
  `${import.meta.env.VITE_API_URL}/banners/${id}`,data);
        alert("Banner updated successfully");
      } else {
        await axios.post(`${import.meta.env.VITE_API_URL}/banners`,data);
        alert("Banner added successfully");
      }
      navigate("/heroview");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="product-page">
      <div className="product-wrapper">
        <div className="container">
          <h1>{id ? "Update Banner" : "Add Banner"}</h1>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Paste YouTube Trailer Link"
              value={videoLink}
              onChange={(e) => convertYoutubeLink(e.target.value)}
            />
            <button type="submit">{id ? "Update Banner" : "Add Banner"}</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default HeroAdmin;
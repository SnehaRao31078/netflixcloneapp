import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./product.css";

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
        })
        .catch((err) => console.log(err));
    }
  }, [id]);

  const removeImage = () => {
    setImagePreview("");
    setFile(null);
  };

  const removeVideo = () => {
    setVideoPreview("");
    setVideo(null);
  };

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

    try {
      if (id) {
        await axios.put(
          `${import.meta.env.VITE_API_URL}/products/${id}`,
          formData,
        );
        alert("Updated Successfully");
      } else {
        await axios.post(`${import.meta.env.VITE_API_URL}/products`, formData);
        alert("Added Successfully");
      }

      navigate("/view");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="product-page">
      <div className="product-wrapper">
        <div className="container">
          <h1>{id ? "Update Movie" : "Add Movie"}</h1>

          <form onSubmit={handleSubmit}>
            <input
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <input
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <input
              placeholder="Language"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            />
            <div>
              <select
                className="inputfield"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Select Category</option>
                <option value="made in india">Made in India</option>
                <option value="sci-fi horror">Sci-Fi Horror</option>
              </select>
            </div>

            <div>
              <select
                className="inputfield"
                value={plan}
                onChange={(e) => setPlan(e.target.value)}
              >
                <option value="">Select Plan</option>
                <option value="basic">Basic</option>
                <option value="Standard">Standard</option>
                <option value="premium">Premium</option>
              </select>
            </div>

            <input
              type="file"
              name="file"
              onChange={(e) => setFile(e.target.files[0])}
            />

            {imagePreview && (
              <div style={{ position: "relative", display: "inline-block" }}>
                <img
                  src={`${import.meta.env.VITE_API_URL}/Images/${imagePreview}`}
                  width="120"
                  alt="preview"
                />
                <p className="cross" onClick={removeImage}>
                  X
                </p>
              </div>
            )}

            <input
              type="file"
              name="video"
              onChange={(e) => setVideo(e.target.files[0])}
            />

            {videoPreview && (
              <div style={{ position: "relative", display: "inline-block" }}>
                <video
                  src={`${import.meta.env.VITE_API_URL}/Images/${videoPreview}`}
                  width="120"
                  controls
                />
                <p className="cross" onClick={removeVideo}>
                  X
                </p>
              </div>
            )}

            <button type="submit">{id ? "Update Movie" : "Add Movie"}</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Addproduct;

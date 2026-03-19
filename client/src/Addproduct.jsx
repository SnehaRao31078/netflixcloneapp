import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./product.css";

function Addproduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [language, setLanguage] = useState("");
  const [category, setCategory] = useState("");
  const [videoLink, setVideoLink] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const[plan,setPlan]=useState("");

  useEffect(() => {
    if (id) {
      axios
        .get("http://localhost:3001/products/" + id)

        .then((res) => {
          setTitle(res.data.title);
          setDescription(res.data.description);
          setLanguage(res.data.language);
          setCategory(res.data.category);
          setImagePreview(res.data.file);
          setVideoLink(res.data.videoLink);
          setPlan(res.data.plan)

        })

        .catch((err) => console.log(err));
    }
  }, []);
  

  const convertYoutubeLink = (link) => {
    if (link.includes("watch?v=")) {
      const videoId = link.split("v=")[1];

      const embedLink = "https://www.youtube.com/embed/" + videoId;

      setVideoLink(embedLink);
    } else {
      setVideoLink(link);
    }
  };
  const removeImage = () => {
    setImagePreview("");
    setFile(null);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("title", title);
    formData.append("description", description);
    formData.append("language", language);
    formData.append("category", category);
    formData.append("videoLink", videoLink);
    formData.append("plan",plan)

    if (file) {
      formData.append("image", file);
    }

    try {
      if (id) {
        await axios.put("http://localhost:3001/products/" + id, formData);

        alert("Movie updated successfully");
      } else {
        await axios.post("http://localhost:3001/products", formData);

        alert("Movie added successfully");
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

            <input type="file" onChange={(e) => setFile(e.target.files[0])} />

            {imagePreview && (
              <div
                style={{
                  position: "relative",
                  display: "inline-block",
                  marginTop: "10px",
                }}
              >
                <img
                  src={"http://localhost:3001/Images/" + imagePreview}
                  width="120"
                  style={{ borderRadius: "5px" }}
                />

                <p type="button"onClick={removeImage}  className="cross" >
                  X
                </p>
              </div>
            )}
            <input
              type="text"
              placeholder="Paste YouTube Trailer Link"
              value={videoLink}
              onChange={(e) => convertYoutubeLink(e.target.value)}
            />

            <button type="submit">{id ? "Update Movie" : "Add Movie"}</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Addproduct;

import { useEffect, useState } from "react";
import axios from "axios";
import "./view.css";
import { Link } from "react-router-dom";

function ViewProducts() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/products`)
      .then((res) => {
        setMovies(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`${import.meta.env.VITE_API_URL}/products/${id}`)
      .then(() => {
        alert("Deleted successfully");

        
        setMovies(movies.filter((movie) => movie._id !== id));
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="view">
      <h2>Movies List</h2>

      <table border="1">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Language</th>
            <th>Category</th>
            <th>Image</th>
            <th>Video</th>
            <th>Plan</th>
            <th colSpan={2}>Action</th>
          </tr>
        </thead>

        <tbody>
          {movies.map((movie) => (
            <tr key={movie._id}>
              <td>{movie.title}</td>
              <td>{movie.description}</td>
              <td>{movie.language}</td>
              <td>{movie.category}</td>

              
              <td>
                <img
                   src={movie.file}  
                  width="100"
                  alt={movie.title}
                />
              </td>

             
              <td>
                {movie.video ? (
                  <video
                    width="220"
                    height="120"
                    muted
                    loop
                    autoPlay
                    playsInline
                    poster={movie.file}
                  >
                    <source
                      src={movie.video}
                      type="video/mp4"
                    />
                  </video>
                ) : (
                  <p>No Video</p>
                )}
              </td>

              <td>{movie.plan}</td>

              <td>
                <Link to={`/edit/${movie._id}`}>
                  <button className="up">Edit</button>
                </Link>
              </td>

              <td>
                <button
                  className="del"
                  onClick={() => handleDelete(movie._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ViewProducts;
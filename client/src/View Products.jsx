import { useEffect, useState } from "react";
import axios from "axios";
import "./view.css";
import { Link } from "react-router-dom";

function ViewProducts() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios
      .get("https://netflix-cloneapp-backend.onrender.com/products")

      .then((res) => {
        setMovies(res.data);
      })

      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (id) => {
    axios
      .delete("https://netflix-cloneapp-backend.onrender.com/products/" + id)

      .then(() => {
        alert("Deleted successfully");

        window.location.reload();
      })

      .catch((err) => console.log(err));
  };

  return (
    <div className="view">
      <h2>Movies List</h2>

      <table border="1">
        <tr>
          <th>Title</th>
          <th>Description</th>
          <th>Language</th>
          <th>Category</th>
          <th>Image</th>
          <th>Trailer</th>
          <th>Plan</th>
          <th colSpan={2}>Action</th>
        </tr>

        {movies.map((movie) => {
          return (
            <tr key={movie._id}>
              <td>{movie.title}</td>

              <td>{movie.description}</td>

              <td>{movie.language}</td>

              <td>{movie.category}</td>

              <td>
                <img
                  src={"https://netflix-cloneapp-backend.onrender.com/Images/" + movie.file}
                  width="100"
                />
              </td>

              <td>
                {movie.videoLink ? (
                  <iframe
                    width="220"
                    height="120"
                    src={movie.videoLink}
                    title="trailer"
                    allowFullScreen
                  ></iframe>
                ) : (
                  <p>No Trailer</p>
                )}
              </td>
<td>
  {movie.plan}
</td>
              <td>
                <Link to={`/edit/${movie._id}`}>
                  <button className="up">Edit</button>
                </Link>
              </td>

              <td>
                <button className="del" onClick={() => handleDelete(movie._id)}>
                  Delete
                </button>
              </td>
            </tr>
          );
        })}
      </table>
    </div>
  );
}

export default ViewProducts;

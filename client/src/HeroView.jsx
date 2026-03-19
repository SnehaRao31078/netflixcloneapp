import { useEffect, useState } from "react";
import axios from "axios";
import "./heroview.css";
import { Link } from "react-router-dom";

function HeroView() {
  const [banner, setBanner] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/banners")

      .then((res) => {
        setBanner(res.data);
      })

      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (id) => {
    axios
      .delete("http://localhost:3001/banners/" + id)

      .then(() => {
        alert("Deleted successfully");

        window.location.reload();
      })

      .catch((err) => console.log(err));
  };

  return (
    <div className="view">
      <h2>Banner List</h2>

      <table border="1">
        <tr>
          <th>Title</th>
          <th>Description</th>
          
          <th>Trailer</th>
          <th colSpan={2}>Action</th>
        </tr>

        {banner.map((banner) => {
          return (
            <tr key={banner._id}>
              <td>{banner.title}</td>

              <td>{banner.description}</td>

              <td>
                {banner.videoLink ? (
                  <iframe
                    width="220"
                    height="120"
                    src={banner.videoLink}
                    title="trailer"
                    allowFullScreen
                  ></iframe>
                ) : (
                  <p>No Trailer</p>
                )}
              </td>

              <td>
                <Link to={`/heroesedit/${banner._id}`}>
                  <button className="up">Edit</button>
                </Link>
              </td>

              <td>
                <button className="del" onClick={() => handleDelete(banner._id)}>
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

export default HeroView;

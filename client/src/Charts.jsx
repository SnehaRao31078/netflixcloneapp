import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

function Charts() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/products`)
      .then(res => res.json())
      .then(result => {

        // Step 1: create empty object
        const counts = {};

        // Step 2: count categories automatically
        result.forEach(item => {
          const category = item.category || "Other";

          if (counts[category]) {
            counts[category]++;
          } else {
            counts[category] = 1;
          }
        });

        // Step 3: convert object → array
        const chartData = Object.keys(counts).map(key => ({
          name: key,
          movies: counts[key]
        }));

        setData(chartData);
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />

        <Bar dataKey="movies" fill="green" />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default Charts;
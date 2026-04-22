import React, { useEffect, useState } from "react";
import { PieChart, Pie, Tooltip, Cell, Legend } from "recharts";

function Charts() {
  const [data, setData] = useState([]);

  const COLORS = ["blue", "green", "orange"];

  

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/plans`) 
      .then(res => res.json())
      .then(result => {

        let basic = 0;
        let standard = 0;
        let premium = 0;

        result.forEach(item => {
          const plan = item.plan?.toLowerCase();

          if (plan === "basic") basic++;
          else if (plan === "standard") standard++;
          else if (plan === "premium") premium++;
        });

        const chartData = [
          { name: "Basic", value: basic },
          { name: "Standard", value: standard },
          { name: "Premium", value: premium }
        ];

        setData(chartData);
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <PieChart width={500} height={300}>
      <Pie data={data} dataKey="value" nameKey="name" outerRadius={100}>
        {data.map((item, index) => (
          <Cell key={index} fill={COLORS[index]} />
        ))}
      </Pie>

      <Tooltip />
      <Legend />
    </PieChart>
  );
}

export default Charts;
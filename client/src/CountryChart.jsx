import { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import axios from "axios";

function CountryChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/plans`);

        let countryCount = {};

        res.data.forEach((item) => {
          if (!item.country || item.country.toLowerCase() === "unknown") return;

          const country = item.country;

          if (countryCount[country]) {
            countryCount[country]++;
          } else {
            countryCount[country] = 1;
          }
        });

        const chartData = Object.keys(countryCount).map((country) => ({
          name: country,
          value: countryCount[country],
        }));

        setData(chartData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPlans();
  }, []);

  const COLORS = [
    "#FFBB28",
    "#FF8042",
   
  ];

  return (
    <div style={{ width: "100%", height: 450 }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            cx="50%"
            cy="45%"
            innerRadius={60}
            outerRadius={100}
            label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>

          <Tooltip />
           <Legend
            verticalAlign="right"
            align="center"
            iconType="square"
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default CountryChart;
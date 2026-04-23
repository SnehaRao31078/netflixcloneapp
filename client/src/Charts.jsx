import { useEffect,useState } from "react";
import {Pie,PieChart,Cell,Tooltip, ResponsiveContainer} from "recharts";
import axios from "axios";
function Charts(){
    const [data,setData]=useState([]);

useEffect(()=>
{
const fetchedata =async ()=>
{
    try
    {
       const res=await axios.get(`${import.meta.env.VITE_API_URL}/plans`);
       const FormattedData=res.data.map(item=>
       ({
          name:item.plan,
          value:item.price

       })
       )
       setData(FormattedData);

    }
    catch(error)
    {
     console.error("Error Fetching MongoDB data")   
    }
};
fetchedta();

},[]);

const COLORS=["#0088FE","#00C49F","#FF8828"];
 return(
<>
<ResponsiveContainer>
<PieChart width={200} height={200}>
<Pie data={data}  value="plan"
cx="50%"
cy="50%"
outerRadius={100}
fill="#8884d8"
label
>
    {data.map((entry,index)=>
    {
        <Cell key={`cell-${index}`}
        fill={COLORS[index%COLORS.length]}></Cell>
    })}
    <Tooltip></Tooltip>


</Pie>
</PieChart>
</ResponsiveContainer>
</>
    );
}
export default Charts;
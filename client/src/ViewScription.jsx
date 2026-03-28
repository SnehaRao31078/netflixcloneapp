import { Link } from "react-router-dom";
import axios from "axios";
import{useEffect,useState} from "react";
import "./viewsub.css";
function ViewScription()
{
    const[subscribes,setSubscribe]=useState([]);
   
    useEffect(()=>
    {
        axios.get("http://localhost:3001/plans")
        .then((res)=>
        {
            setSubscribe(res.data);
        })

.catch((err)=>console.log(err));
    },[]);
    const handleDelete =(id)=>
    {
        axios.delete(`http://localhost:3001/plans/${id}`)
        .then(()=>
        {
        alert("Deleted Successfully");
    });
}
    return(
        <>
        <div className="view">
            <h1>Subscription List</h1>
            <table border="1">
                <thead>
<tr>
    <th>Email </th>
    <th>Card Details</th>
    <th>Cardholder name</th>
    <th>Country</th>
    <th>Plan</th>
    <th>Price</th>
    <th colspan={2}>Action</th>

</tr>
 </thead>
 <tbody>
    {subscribes.map((subscribe)=>{
        return(

            <tr key={subscribe._id}>
                <td>{subscribe.email}</td>
                <td>{subscribe.card}</td>
                <td>{subscribe.holder}</td>
                <td>{subscribe.country}</td>
                <td>{subscribe.plan}</td>
                <td>{subscribe.price}</td>
                  <td>
                    <Link to={`/edit/${subscribe._id}`}>
                     <button className="up">Edit</button>
                     </Link>
                  </td>
                 <td>
                    <button
                    className="del" onClick={() => handleDelete(subscribe._id)}>Delete</button>
                 </td>


            </tr>
          
        );
    }
    
    )}
 </tbody>
</table>
 </div>
 </>
    );
}
export default ViewScription;
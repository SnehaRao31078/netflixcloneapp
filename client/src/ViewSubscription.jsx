
import axios from "axios";
import{useEffect,useState} from "react";
import "./viewsub.css";
function ViewScription()
{
    const[subscribes,setSubscribe]=useState([]);
   
    useEffect(()=>
    {
        axios
        .get(`${import.meta.env.VITE_API_URL}/plans`)
        .then((res)=>
        {
            setSubscribe(res.data);
        })

.catch((err)=>console.log(err));
    },[]);
    
    return(
        <>
        <div className="view">
            <h1>Subscription List</h1>
            <table border="1">
                <thead>
<tr>
    <th>Email </th>
    <th>Country</th>
    <th>Plan</th>
    <th>Price</th>
    <th>Payment ID</th>
    

</tr>
 </thead>
 <tbody>
    {subscribes.map((subscribe)=>{
        return(

            <tr key={subscribe._id}>
                <td>{subscribe.email}</td>
                
                <td>{subscribe.country}</td>
                <td>{subscribe.plan}</td>
                <td>{subscribe.price}</td>
                <td>{subscribe.paymentId}</td>
                  


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
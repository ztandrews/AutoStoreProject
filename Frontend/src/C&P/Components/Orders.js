import React, {useEffect,useState}from 'react'
import axios from "axios";
import { loadStripe, CardElement, Elements,Consumercheckout } from "@stripe/stripe-js";
import  secureLocalStorage  from  "react-secure-storage";

export default function Orders() {
  const [items, setItems] = useState([]);
  const user_email=secureLocalStorage.getItem('email')
  useEffect(() => {
  const fetchData = async () => {
    const stripe =  require('stripe')('sk_test_51MjlSpFmJBZ50mnVsR6IJPJ9XSD7jygfyXQ6Z7EF3c7XvKJ92x3pdsCQ2COwBtvXMJiH6bmYta8ALe6PKCgU72T800Dw8jlhmK');
    const sessions2 = await  stripe.checkout.sessions.list();
    const paymentIntents = await stripe.paymentIntents.list();
    let session_data = sessions2.data
    let payment_data = paymentIntents.data
    let o = []
    let itemids=[]

    //Get all customer orders by email
    for (let i =0;i<session_data.length;i++){
      if(session_data[i].customer_email===user_email & session_data[i].payment_status=="paid"){
        itemids.push(session_data[i].payment_intent)
        let order_object = {'id':session_data[i].payment_intent,'desc':payment_data[i].description,'total':session_data[i].amount_total,'payment_status':session_data[i].payment_status,'status':session_data[i].status}
        o.push(order_object)
      }
    }
    setItems(o)
  }

  fetchData()
}, [])
  return (
    <div className='container'> 
      <h1>Orders</h1>
      <h3>Hello, {user_email}</h3>
      <br></br>
      <h4>All Orders</h4>
      <hr></hr>
      {
            items.map((item,i) => {
            return (
              <div className='row' key={item.id}>
                <h4>{item.desc}</h4>
                <h5>Total: {item.total}</h5>
                <h5>Payment Status: {item.payment_status}</h5>
                <h5>Order Status: {item.status}</h5>
                <br></br>
                <br></br>
              </div>
            )
          })
        }
    </div>
  )
}

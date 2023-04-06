import React, {useEffect,useState}from 'react'
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
//import Modal from 'react-modal';
import { Modal, Button } from 'react-bootstrap'
const MidSection = () => {
    const [items, setItems] = useState([]);
    const [cart, setCart] = useState([]);
    const [fullCart,setFullCart] = useState([]);
    const [modalIsOpen, setIsOpen] = useState(false);
    const [cartTotal,setTotal] = useState(0);
    const [emp, setEmp] = useState("Cart is Empty")
    useEffect(() => {
    const username = localStorage.getItem('user')
    const user_email=localStorage.getItem('email')
    axios.get("https://8taym3bose.execute-api.us-east-2.amazonaws.com/getVehicles").then((res) => {
    const vehicles = res.data.body; 
      setItems(JSON.parse(vehicles));
    });
  }, []);
    const addToCart= (_id,_name,_price) => {
        let currentCart = cart
        var found=false
        var index = 0
        for (let k=0;k<currentCart.length;k++){
          if(currentCart[k].price==_id){
            found=true
            index=k
          }else{
            continue
          }
        }
        if(found===true){
          //let newCount = currentCart[index].quantity+1
          //currentCart.splice(index,1)
          //var newItems2 = {'price':_id,'quantity':newCount}
          //setCart([...currentCart,newItems2])
          //var newItems3 = {'price':_id,'quantity':newCount,'name':_name,'carPrice':_price}
          //setFullCart([...fullCart,newItems3])
          alert('This item is already in your cart!')
        }else{
          var newItems = {'price':_id,'quantity':1}
          var newItems2 = {'price':_id,'quantity':1,'name':_name,'carPrice':_price}
          setTotal(cartTotal+_price)
          setFullCart([...fullCart,newItems2])
          setCart([...cart, newItems])
          setEmp(" ")
        }
    }
  const handleClick = async e => {
        let s = localStorage.getItem('email')
        const stripe = await loadStripe('pk_test_51MjlSpFmJBZ50mnV6L1RnyCUeFsoMX4FrO4So5TeMrgPVjBGSDxCuKO9RausgP5I9ZaptEbsOvUqkiMOli76jYrm00xUCB6XDh')
        const  {error} = await stripe.redirectToCheckout({
            lineItems:cart,
            mode:"payment",
            successUrl:'https://main.d2k3yp2l56fg0c.amplifyapp.com/success',
            cancelUrl:'https://main.d2k3yp2l56fg0c.amplifyapp.com/cancel',
            billingAddressCollection:'required',
            shippingAddressCollection: {allowedCountries:['US']},
            submitType:'pay',
            customerEmail:s
        })
    }

    function openModal() {
    setIsOpen(true);
    }
    function closeModal() {
    setIsOpen(false);
  }
  function afterOpenModal() {
    // references are now sync'd and can be accessed.
  }
    const removeFromCart = (id_,_price) => {
      let cart2 = cart
      let current_cart = fullCart
      var index_of_car=0
      for (let j = 0; j<current_cart.length;j++){
        if (current_cart[j].price==id_){
          index_of_car=j
          if (cart2.length==1){
          setFullCart([])
          setCart([])
          setTotal(0)
          setEmp("Cart is Empty")
        }else{
        //current_cart.splice(index_of_car,1)
        //cart2.splice(index_of_car,1)
        //setFullCart(current_cart)
        //setCart(cart2)
        setFullCart(current_cart.filter(item=> item.price !== id_))
        setCart(cart2.filter(item=> item.price !== id_))
        setTotal(cartTotal-_price)
        }
        }else{
          continue
        }
      }
    }
  return (
  <div>
    <h1>Store</h1>
    <section className="py-5">
       <button className="btn btn-outline-dark mt-auto" onClick={openModal}>Cart</button>
      <Modal show={modalIsOpen} size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      onHide={closeModal}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <h1 className='center'>Cart</h1>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='center'>
          <h2>{emp}</h2>
          {
            fullCart.map((item,i) => {
            return (
              <div className='row' key={item.veichle_stripe_id}>
                <h4 className='row'>{item.name} <br></br>${item.carPrice}</h4>
                <button className="btn btn-outline-dark mt-auto" onClick={()=>removeFromCart(item.price,item.carPrice)}>Remove</button>

              </div>
            )
          })
        }
        <hr></hr>
        <h5>Total: ${cartTotal}</h5>
         <button className="btn btn-outline-dark mt-auto" onClick={handleClick}>Checkout</button>
         </div>
        </Modal.Body>
      </Modal>
    <div className="container px-4 px-lg-5 mt-5">
      <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
 {
            items.map((item,i) => {
                return (
                  <div key = {item.veichle_stripe_id}>
                    <div className="col mb-5">
          <div className="card h-100">
            <img className="card-img-top" src="https://i.pinimg.com/736x/6a/fb/08/6afb08e233f126c3dabff441c31e06ab--vector-for-free-clip-art-free.jpg" alt="..." />
            <div className="card-body p-4">
              <div className="text-center">
                    <h4>{item.veichle_name}</h4>
                    <h5>${item.veichle_price}</h5>
                    </div>
                    </div>
                    <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
              <div className="text-center">
                     <button className="btn btn-outline-dark mt-auto" onClick={()=>addToCart(item.veichle_stripe_id,item.veichle_name,item.veichle_price)}>Add To Cart</button>
                    </div>
                    </div>
                    </div>
                    </div>
                    </div>
                );
            })
        }
        </div>
    </div>
  </section>
</div>

  )

}

export default MidSection
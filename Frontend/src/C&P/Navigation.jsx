import React from 'react'
import {useState} from 'react';
import CartPop from './Components/CartPop';

const Navigation = () => {
    const handleClick = async e => {
      localStorage.setItem('email','')
    }
  const [importCartPop,setButtonPopup1] = useState(false)
  console.log(importCartPop)
  return (
  <div>
  <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <div className="container px-4 px-lg-5">
      <a className="navbar-brand" href="/shop">CS-611 Car Store</a>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4">
          <li className="nav-item">
            <a className="nav-link active" aria-current="page" href="/shop">Home</a>
          </li>
          <a onClick={handleClick} className="nav-link" href="/">Logout</a>
          <a className="nav-link" href="/orders">Orders</a>
        </ul>
        <form className="d-flex">
        </form>
      </div>
    </div>
  </nav>

  <CartPop trigger={importCartPop} setTrigger={setButtonPopup1}>
        <h3 className='headerPopup1' style={{fontSize: "2rem"}}>Buy Our Things</h3>
  </CartPop>

</div>



  )
}
export default Navigation
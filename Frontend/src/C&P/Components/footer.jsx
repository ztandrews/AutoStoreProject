import React, {useEffect,useState}from 'react'
import { Modal, Button } from 'react-bootstrap'

export const Footer = () => {
    const [modalIsOpen, setIsOpen] = useState(false);
    function openModal() {
    setIsOpen(true);
    }
    function closeModal() {
    setIsOpen(false);
  }
  return (
    <div>
      <Modal show={modalIsOpen} size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      onHide={closeModal}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <h1>Privacy Policy</h1>
            <h5>Last Updated: 4/18/2023</h5>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h6>
<h5>Policy</h5>
At our car store, we take your privacy very seriously. We understand that your personal information is sensitive and we are committed to protecting it. This Privacy Policy explains how we collect, use, and disclose your personal information when you use our website and services.
<br></br>
<br></br>
<h5>Collection and Use of Personal Information</h5>
We collect personal information when you create an account to use our services. This information may include your name, email address,and phone number. We use this information to process your orders, fulfill your requests, and communicate with you about your purchases. We do not collect payment information, as our payment processor, Stripe, collects and stores it only.  Stripe is a trusted third-party payment processor that handles all payment information securely and in accordance with their own privacy policies.
<br></br>
We do not sell or share your personal information with third parties, except as necessary to provide our services to you. We may share your information with Stripe to process payments.
<br></br>
<br></br>
<h5>Data Encryption</h5>
We use encryption to protect all user data, including payment information. Our website uses SSL encryption to secure your connection and ensure that your personal information is transmitted securely. We also store your data in a secure database that is encrypted and password protected.
<br></br>
<br></br>
<h5>Agreement</h5>
By using our website and services, you consent to our collection, use, and disclosure of your personal information as described in this Privacy Policy. If you have any questions or concerns about our privacy practices, please contact us at cs611group@gmail.com. We may update this Privacy Policy from time to time, so please review it periodically.</h6>
        </Modal.Body>
      </Modal>
  <footer className="py-5 bg-dark fixed-bottom">
    <div className="container">
      <p className="m-0 text-center text-white">
        Copyright © CS-611 Car Store 2023<br></br>
        <a href='#' onClick={openModal}>View our Privacy Policy</a>
      </p>
    </div>
  </footer>
</div>

  )

}
export default Footer
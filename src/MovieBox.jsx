import React, { useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Button } from 'react-bootstrap'; // Import from react-bootstrap

export default function MovieBox({ title, poster_path, vote_average, release_date, overview }) {
 
  const API_IMG = "https://image.tmdb.org/t/p/w500/";
  
  // State to control the modal
  const [showModal, setShowModal] = useState(false);
  
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  return (
    <div className='card text-center bg-secondary mb-3'>
      <div className="card-body">
        <img className='card-img-top' style={{width:"100%",height:"85%"}} src={API_IMG + poster_path} alt="" />
        <div className="card-body">
          <button type='button' className='btn btn-dark' onClick={handleShow}>View More</button>
          <Modal show={showModal} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <img className='card-img-top' src={API_IMG + poster_path} alt="" />
              <h3>{title}</h3>
              <h4>ImDb: {vote_average}</h4>
              <h5>Release Date: {release_date}</h5><br /><br />
              <h6>Overview</h6>
              <p>{overview}</p>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </div>
  )
}

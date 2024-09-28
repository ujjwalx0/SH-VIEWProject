import React, { useState, useEffect } from 'react';
import { getStandardHours, getTodayHours, getUpcomingSpecialHours } from '../services/api';
import { StandardHours, SpecialHours, HoursDTO } from '../types';
import StandardHoursComponent from './StandardHoursComponent';
import SpecialHoursComponent from './SpecialHoursComponent';
import AddSpecialHoursForm from './AddSpecialHoursForm';
import { Modal, Button } from 'react-bootstrap';
import ApiSummary from './APIsummary';

const HoursManagement: React.FC = () => {
  const [standardHours, setStandardHours] = useState<StandardHours[]>([]);
  const [todayHours, setTodayHours] = useState<HoursDTO | null>(null);
  const [specialHours, setSpecialHours] = useState<SpecialHours[]>([]);
  const [showSpecialHours, setShowSpecialHours] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showApiSummary, setShowApiSummary] = useState(false); // State for API Summary modal

  useEffect(() => {
    fetchStandardHours();
    fetchTodayHours();
    fetchSpecialHours();
  }, []);

  const fetchStandardHours = async () => {
    const response = await getStandardHours();
    setStandardHours(response.data);
  };

  const fetchTodayHours = async () => {
    const response = await getTodayHours();
    setTodayHours(response.data);
  };

  const fetchSpecialHours = async () => {
    const response = await getUpcomingSpecialHours();
    setSpecialHours(response);
  };

  const handleShowSpecialHours = () => {
    setShowSpecialHours(true);
  };

  const handleCloseSpecialHours = () => {
    setShowSpecialHours(false);
  };

  const handleShowApiSummary = () => {
    setShowApiSummary(true);
  };

  const handleCloseApiSummary = () => {
    setShowApiSummary(false);
  };

  return (
    <div className="container text-center mt-5">
      

      <div className="mb-4">
        <Button className="btn btn-primary btn-sm rounded mx-2" onClick={handleShowSpecialHours}>
          Show Special Hours
        </Button>
        <Button className="btn btn-success btn-sm rounded mx-2" onClick={() => setShowForm(true)}>
          Add Special Hours
        </Button>
        <Button className="btn btn-info btn-sm  rounded mx-2" onClick={handleShowApiSummary}>
          Brief About Assesment solution
        </Button> 
      </div>

      <StandardHoursComponent 
        standardHours={standardHours} 
        todayHours={todayHours} 
        specialHours={specialHours} 
      />
      
      <Modal show={showForm} onHide={() => setShowForm(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Special Hours</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddSpecialHoursForm setShowForm={setShowForm} fetchSpecialHours={fetchSpecialHours} />
        </Modal.Body>
      </Modal>

      <Modal show={showSpecialHours} onHide={handleCloseSpecialHours}>
        <Modal.Header closeButton>
          <Modal.Title>Upcoming Special Hours</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <SpecialHoursComponent specialHours={specialHours} fetchSpecialHours={fetchSpecialHours} handleClose={handleCloseSpecialHours} />
        </Modal.Body>
      </Modal>

      {/* Modal for API Summary */}
      <Modal show={showApiSummary} onHide={handleCloseApiSummary}>
        <Modal.Header closeButton>
          <Modal.Title>API Summary</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ApiSummary />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseApiSummary}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default HoursManagement;

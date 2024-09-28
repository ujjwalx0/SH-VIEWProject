import React, { useEffect, useState } from 'react';
import { SpecialHours } from '../types';
import { deleteSpecialHours } from '../services/api';
import { Button, Modal } from 'react-bootstrap';
import AddSpecialHoursForm from './AddSpecialHoursForm';

interface Props {
  specialHours: SpecialHours[];
  fetchSpecialHours: () => void;
  handleClose: () => void;
}

const SpecialHoursComponent: React.FC<Props> = ({ specialHours, fetchSpecialHours, handleClose }) => {
  const [showEditForm, setShowEditForm] = useState(false);
  const [selectedSpecialHour, setSelectedSpecialHour] = useState<SpecialHours | null>(null);

  useEffect(() => {
    fetchSpecialHours();
  }, []); 

  const handleEdit = (specialHour: SpecialHours) => {
    setSelectedSpecialHour(specialHour);
    setShowEditForm(true);
};


  const handleDelete = async (id: number) => {
    const confirmed = window.confirm('Are you sure you want to delete this special hour?');
    if (confirmed) {
      await deleteSpecialHours(id);
      fetchSpecialHours();
    }
  };

  const handleCloseEditForm = () => {
    setShowEditForm(false);
    setSelectedSpecialHour(null);
  };

  return (
    <div className="mt-4">
      {specialHours.length > 0 ? (
        <ul className="list-group">
          {specialHours.map((specialHour) => (
            <li key={specialHour.id} className="list-group-item d-flex justify-content-between align-items-center">
              {`${specialHour.date}: ${specialHour.openTime} - ${specialHour.closeTime} (${specialHour.message})`}
              <div className='d-flex gap-2'>
                <Button variant="warning" size="sm" onClick={() => handleEdit(specialHour)}>Edit</Button>
                <Button variant="danger" size="sm" onClick={() => handleDelete(specialHour.id)}>Delete</Button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No upcoming special hours</p>
      )}
     <div className="d-flex justify-content-end mt-3">
  <Button variant="secondary" onClick={handleClose}>
    Close
  </Button>
</div>



      
      <Modal show={showEditForm} onHide={handleCloseEditForm}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Special Hours</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedSpecialHour && (
            <AddSpecialHoursForm 
              setShowForm={setShowEditForm} 
              fetchSpecialHours={fetchSpecialHours} 
              specialHour={selectedSpecialHour} 
              closeModal={handleCloseEditForm} 
            />
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default SpecialHoursComponent;

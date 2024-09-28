import React, { useEffect, useState } from 'react';
import { addSpecialHours, updateSpecialHours } from '../services/api';
import { SpecialHours } from '../types';
import { Button, Form, Alert } from 'react-bootstrap';
import axios, { AxiosError } from 'axios';

interface Props {
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
  fetchSpecialHours: () => void;
  specialHour?: SpecialHours; 
  closeModal?: () => void; 
}

const AddSpecialHours: React.FC<Props> = ({ setShowForm, fetchSpecialHours, specialHour }) => {
  const [specialHours, setSpecialHours] = useState<SpecialHours>({
    id: specialHour ? specialHour.id : 0,
    date: specialHour ? specialHour.date : '',
    openTime: specialHour ? specialHour.openTime : '',
    closeTime: specialHour ? specialHour.closeTime : '',
    message: specialHour ? specialHour.message : '',
  });

  const [responseMessage, setResponseMessage] = useState<string | null>(null);
  const [responseType, setResponseType] = useState<'success' | 'error' | null>(null);

  useEffect(() => {
    if (specialHour) {
      setSpecialHours({
        id: specialHour.id,
        date: specialHour.date.split('/').join('-'),
        openTime: specialHour.openTime,
        closeTime: specialHour.closeTime,
        message: specialHour.message,
      });
    } else {
      setSpecialHours({ id: 0, date: '', openTime: '', closeTime: '', message: '' });
    }
  }, [specialHour]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSpecialHours({ ...specialHours, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formattedHours: SpecialHours = {
      id: specialHours.id,
      date: specialHours.date.split('-').join('/'), 
      openTime: specialHours.openTime,
      closeTime: specialHours.closeTime,
      message: specialHours.message,
    };

    try {
      let response;
      if (specialHour) {
        response = await updateSpecialHours(specialHours.id, formattedHours);
      } else {
        response = await addSpecialHours(formattedHours);
      }

      if (response.status === 'OK' || response.status === 'CREATED') {
        setResponseType('success');
        setResponseMessage(response.message);
        fetchSpecialHours(); 
        window.location.reload();

      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      const axiosError = error as AxiosError;

      if (axios.isAxiosError(axiosError) && axiosError.response) {
        const errorMessage = axiosError.response.data?.message || 'An error occurred. Please try again later.';
        setResponseType('error');
        setResponseMessage(errorMessage);
      } else {
        console.error('Error adding/updating special hours:', error);
        setResponseType('error');
        setResponseMessage('An unexpected error occurred. Please try again later.');
      }
    }
  };

  return (
    <div className="text-center">
      {responseMessage && (
        <Alert variant={responseType === 'success' ? 'success' : 'danger'}>
          {responseMessage}
        </Alert>
      )}
      <Form onSubmit={handleSubmit}>
        <table className="table">
          <tbody>
            <tr>
              <td>
                <Form.Label>Date</Form.Label>
                <Form.Control
                  type="date"
                  name="date"
                  value={specialHours.date}
                  onChange={handleChange}
                  required
                />
              </td>
            </tr>
            <tr>
              <td>
                <Form.Label>Open Time</Form.Label>
                <Form.Control
                  type="time"
                  name="openTime"
                  value={specialHours.openTime}
                  onChange={handleChange}
                  required
                />
              </td>
            </tr>
            <tr>
              <td>
                <Form.Label>Close Time</Form.Label>
                <Form.Control
                  type="time"
                  name="closeTime"
                  value={specialHours.closeTime}
                  onChange={handleChange}
                  required
                />
              </td>
            </tr>
            <tr>
              <td>
                <Form.Label>Message</Form.Label>
                <Form.Control
                  type="text"
                  name="message"
                  value={specialHours.message}
                  onChange={handleChange}
                  required
                />
              </td>
            </tr>
          </tbody>
        </table>
        <Button type="submit" variant="primary" className="mt-3">
          {specialHour ? 'Update Special Hours' : 'Add Special Hours'}
        </Button>
        <Button variant="secondary" className="mt-3 ms-2" onClick={() => setShowForm(false)}>
          Cancel
        </Button>
      </Form>
    </div>
  );
};

export default AddSpecialHours;

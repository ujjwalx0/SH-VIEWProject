import React from 'react';
import { StandardHours, HoursDTO, SpecialHours } from '../types';

interface Props {
  standardHours: StandardHours[];
  todayHours: HoursDTO | null;
  specialHours: SpecialHours[];
}

const StandardHoursComponent: React.FC<Props> = ({ standardHours, todayHours, specialHours }) => {
  const isToday = (dayOfWeek: string) => todayHours?.dayOfWeek === dayOfWeek;

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':');
    const period = +hours >= 12 ? 'PM' : 'AM';
    const formattedHours = +hours % 12 || 12;
    return `${formattedHours}:${minutes} ${period}`;
  };

  const todaySpecialHoursMessage = todayHours?.message || null;
  const todayOpenTime = todayHours?.openTime ? formatTime(todayHours.openTime) : null;
  const todayCloseTime = todayHours?.closeTime ? formatTime(todayHours.closeTime) : null;
  //const todayDayOfWeek = todayHours?.dayOfWeek || null;

  return (
    <div className="container mt-4 row align-items-center justify-content-center">
      <h2 className="text-center">Regular Hours</h2>
   
      <div className=" rounded col-6" >
        <ul className="list-group">

          {standardHours.map((hour) => (
            <li key={hour.id} className={`list-group-item ${isToday(hour.dayOfWeek) ? 'list-group-item-success' : ''}`}>
              {hour.dayOfWeek}: {formatTime(hour.openTime)} - {formatTime(hour.closeTime)} 
              {isToday(hour.dayOfWeek) && <strong> (Today)</strong>}
            </li>
          ))}
        </ul>
      </div>
      {todayHours && todaySpecialHoursMessage !="Regular hours" && (
        <div className="alert alert-danger col-6 rounded " role="alert">
          <strong>Special Hours for  Today </strong>
          <table className="table table-sm " style={{ width: 'auto', margin: '0 auto' }}>
            <tbody>
              <tr>
                <td><strong>Open Time:</strong></td>
                <td>{todayOpenTime}</td>
              </tr>
              <tr>
                <td><strong>Close Time:</strong></td>
                <td>{todayCloseTime}</td>
              </tr>
              {todaySpecialHoursMessage && (
                <tr>
                  <td><strong>Message:</strong></td>
                  <td>{todaySpecialHoursMessage}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default StandardHoursComponent;

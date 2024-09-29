import React from 'react';
import { StandardHours, HoursDTO, SpecialHours } from '../types';

interface Props {
  standardHours: StandardHours[];
  todayHours: HoursDTO | null;
  specialHours: SpecialHours[];
}

const StandardHoursComponent: React.FC<Props> = ({ standardHours, todayHours }) => {
  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':');
    const period = +hours >= 12 ? 'PM' : 'AM';
    const formattedHours = +hours % 12 || 12;
    return `${formattedHours}:${minutes} ${period} ET`;
  };

  const todaySpecialHoursMessage = todayHours?.message || null;
  const todayOpenTime = todayHours?.openTime ? formatTime(todayHours.openTime) : null;
  const todayCloseTime = todayHours?.closeTime ? formatTime(todayHours.closeTime) : null;

  const groupedHours: { [key: string]: StandardHours[] } = {};

  standardHours.forEach(hour => {
    const key = `${hour.openTime}-${hour.closeTime}`;
    if (!groupedHours[key]) {
      groupedHours[key] = [];
    }
    groupedHours[key].push(hour);
  });

  return (
    <div className="container mt-4 row align-items-center justify-content-center ">
      <h2 className="text-center">OPERATING HOURS</h2>

      <div className="rounded col col-lg-4 col-md-6 col-sm-12 ">
        <table className="table table-sm">
          <tbody>
            {todayHours && todaySpecialHoursMessage !== "Regular hours" && (
              <tr className='table-danger'>
                <td colSpan={2} className=" text-danger mb-3 border-0" role="alert">
                  <strong> {todaySpecialHoursMessage}<br /></strong>
                  {todayOpenTime} - {todayCloseTime}
                </td>
              </tr>
            )}

            {Object.entries(groupedHours).map(([key, hours]) => {
              const [openTime, closeTime] = key.split('-');
              const formattedOpenTime = formatTime(openTime);
              const formattedCloseTime = formatTime(closeTime);

              const days = hours.map(hour => hour.dayOfWeek);
              let displayDays: string;

              if (days.length === 1) {
                displayDays = days[0]; 
              } else if (days.length === 2) {
                displayDays = `${days[0]} - ${days[1]}`; 
              } else {
                displayDays = `${days[0]} - ${days[days.length - 1]}`;
              }

              return (
                <React.Fragment key={key}>
                  <tr className='table-danger'>
                    <th className="font-weight-bold border-0">{displayDays}</th>
                  </tr>
                  <tr className='table-danger'>
                    <td className="text-muted border-0">{formattedOpenTime} – {formattedCloseTime}</td>
                  </tr>
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StandardHoursComponent;

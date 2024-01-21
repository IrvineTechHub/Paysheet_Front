import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import '../App.css';

const ModifyInfo = () => {
  const location = useLocation();
  const selectedImage = location.state && location.state.selectedImage;

  const initialData = [
    { date: '6/23/2023', day: 'Thursday', timeIn: '09:00', timeOut: '11:00', timeIn2: '13:00', timeOut2: '18:00' },
    { date: '6/24/2023', day: 'Friday', timeIn: '10:00', timeOut: '11:00', timeIn2: '14:00', timeOut2: '19:00' },
    { date: '6/25/2023', day: 'Saturday', timeIn: '10:30', timeOut: '11:45', timeIn2: '13:30', timeOut2: '19:00' },
  ];

  const [data, setData] = useState(initialData);
  const [isEditing, setIsEditing] = useState(false);
  const [editableData, setEditableData] = useState(null);
  const [ratePerHour, setRatePerHour] = useState(''); // rate per hour
  const [overtimePay, setOvertimePay] = useState(''); // overtime pay

  const handleEditTable = (item) => {
    setIsEditing(true);
    setEditableData({ ...item });
  };

  const handleSave = () => {
    const updatedData = data.map((item) =>
      item.date === editableData.date ? { ...item, day: editableData.day } : item
    );
    setData(updatedData);
    setEditableData(null);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditableData(null);
    setIsEditing(false);
  };

  const handleSaveAll = () => {
    const updatedData = data.map((item) => ({ ...item, day: editableData.day }));
    setData(updatedData);
    setEditableData(null);
    setIsEditing(false);
  };

  const handleCellEdit = (field, value) => {
    if (isEditing) {
      setEditableData((prevData) => ({
        ...prevData,
        [field]: value,
      }));
    }
  };

  return (
    <div>
      <h2>Modify Information</h2>
      <div className="modify-info-container">
        {selectedImage && (
          <div className="image-preview">
            <h3>Uploaded Image :</h3>
            <img src={selectedImage} alt="Uploaded Image" style={{ maxWidth: '100%' }} />
          </div>
        )}
        {!selectedImage && (
          <div className="empty-image-preview">
            <p>No image uploaded</p>
          </div>
        )}
        {selectedImage && (
          <div className="info-section">
            <h3>Jiwon</h3>
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Day</th>
                  <th>TimeIn</th>
                  <th>TimeOut</th>
                  <th>TimeIn</th>
                  <th>TimeOut</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item) => (
                  <tr key={item.date} onClick={() => handleEditTable(item)}>
                    <td>{item.date}</td>
                    <td>{item.day}</td>
                    <td>
                      {isEditing ? (
                        <input
                          type="text"
                          value={editableData?.timeIn || ''}
                          onChange={(e) => handleCellEdit('timeIn', e.target.value)}
                        />
                      ) : (
                        item.timeIn
                      )}
                    </td>
                    <td>
                      {isEditing ? (
                        <input
                          type="text"
                          value={editableData?.timeOut || ''}
                          onChange={(e) => handleCellEdit('timeOut', e.target.value)}
                        />
                      ) : (
                        item.timeOut
                      )}
                    </td>
                    <td>
                      {isEditing ? (
                        <input
                          type="text"
                          value={editableData?.timeIn2 || ''}
                          onChange={(e) => handleCellEdit('timeIn2', e.target.value)}
                        />
                      ) : (
                        item.timeIn2
                      )}
                    </td>
                    <td>
                      {isEditing ? (
                        <input
                          type="text"
                          value={editableData?.timeOut2 || ''}
                          onChange={(e) => handleCellEdit('timeOut2', e.target.value)}
                        />
                      ) : (
                        item.timeOut2
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {isEditing && (
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
                <button style={{ fontSize: '0.9rem', padding: '4px 8px', marginRight: '8px' }} onClick={handleSaveAll}>
                  Save All
                </button>
                <button style={{ fontSize: '0.9rem', padding: '4px 8px' }} onClick={handleCancel}>
                  Cancel All
                </button>
              </div>
            )}
          </div>
        )}
      </div>
      {selectedImage && (
        <div className="user-input-section" style={{ display: 'flex', justifyContent: 'flex-end', margin: '16px 0' }}>
          <div style={{ marginRight: '16px' }}>
            <label>
              Rate per Hour:
              <input
                type="text"
                value={ratePerHour}
                onChange={(e) => setRatePerHour(e.target.value)}
              />
            </label>
          </div>
          <div>
            <label>
              Overtime Pay:
              <input
                type="text"
                value={overtimePay}
                onChange={(e) => setOvertimePay(e.target.value)}
              />
            </label>
          </div>
        </div>
      )}
      {selectedImage && (
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '15px' }}>
          <Link to="/Paysheet">
            <button style={{ fontSize: '1.0rem', padding: '5px 10px' }}>Submit</button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default ModifyInfo;

import React, { useState } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import '../App.css';

const ModifyInfo = () => {
  const location = useLocation();
  const selectedImage = location.state && location.state.selectedImage;

  const initialData = [
    { date: '6/23/2023', day: 'Thursday', timeIn: '09:00', timeOut: '11:00', timeIn2: '13:00', timeOut2: '18:00' },
    { date: '6/24/2023', day: 'Friday', timeIn: '10:00', timeOut: '11:00', timeIn2: '14:00', timeOut2: '19:00' },
    { date: '6/25/2023', day: 'Saturday', timeIn: '10:30', timeOut: '11:45', timeIn2: '13:30', timeOut2: '19:00' },
    { date: '6/26/2023', day: 'Sunday', timeIn: '10:30', timeOut: '11:45', timeIn2: '13:30', timeOut2: '19:00' },
    { date: '6/27/2023', day: 'Monday', timeIn: '10:30', timeOut: '11:45', timeIn2: '13:30', timeOut2: '19:00' },
    { date: '6/28/2023', day: 'Tuesday', timeIn: '10:30', timeOut: '11:45', timeIn2: '13:30', timeOut2: '19:00' },
    { date: '6/29/2023', day: 'Wednesday', timeIn: '10:30', timeOut: '11:45', timeIn2: '13:30', timeOut2: '19:00' },
  ];

  const [data, setData] = useState(initialData);
  const [isEditing, setIsEditing] = useState(false);
  const [ratePerHour, setRatePerHour] = useState(''); // rate per hour
  const [overtimePay, setOvertimePay] = useState(''); // overtime pay
  const [name, setName] = useState('Jiwon'); // name
  const navigate = useNavigate();

  const handleModify = () => { // 수정 버튼 시 수정 모드 전환
    setIsEditing(true);
  };

  const isTimeFormatValid = (time) => {
    // 간단한 시간 형식 체크 함수
    const timeRegex = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;
    return timeRegex.test(time);
  };

  const isDateFormatValid = (date) => {
    // 간단한 날짜 형식 체크 함수 (MM/DD/YYYY)
    const dateRegex = /^(0?[1-9]|1[0-2])\/(0?[1-9]|[12][0-9]|3[01])\/\d{4}$/;
    return dateRegex.test(date);
  };

  const handleSaveAll = () => { // 수정 내용 일괄 저장
    // 이름이 문자인지 확인
    const isNameValid = /^[a-zA-Z]+$/.test(name);
    if (!isNameValid) {
      alert('Invalid name format. Please use only letters.');
      return;
    }

    // date 형식이 맞는지 확인하고 저장
    const isDateFormatError = data.some((item) => !isDateFormatValid(item.date));
    if (isDateFormatError) {
      alert('Invalid date format. Please use Month/Date/Year format.');
      return;
    }

    // day가 문자인지 확인
    const isDayValid = data.every((item) => /^[a-zA-Z]+$/.test(item.day));
    if (!isDayValid) {
      alert('Invalid day format. Please use only letters for the day.');
      return;
    }

    // timeIn, timeOut 형식이 맞는지 확인하고 저장
    const isTimeFormatError = data.some((item) => !isTimeFormatValid(item.timeIn) || !isTimeFormatValid(item.timeOut) || !isTimeFormatValid(item.timeIn2) || !isTimeFormatValid(item.timeOut2));
    if (isTimeFormatError) {
      alert('Invalid time format. Please use HH:mm format.');
      return;
    }
    setIsEditing(false);
  };

  const handleCancelAll = () => { // 수정 내용 일괄 취소
    setIsEditing(false);
  };

  const handleRatePerHourChange = (e) => { // rate per hour 저장
    setRatePerHour(e.target.value);
  };

  const handleOvertimePayChange = (e) => { // overtime pay 저장
    setOvertimePay(e.target.value);
  };

  const handleNameChange = (e) => { // name 저장
    setName(e.target.value);
  };

  const handleSubmit = () => { // submit 버튼 눌렀을 때 rate per hour, overtime pay 저장
    // ratePerHour과 overtimePay가 숫자인지 확인
    if (!/^\d+$/.test(ratePerHour) || !/^\d+$/.test(overtimePay)) {
      alert('Rate per Hour and Overtime Pay must be numeric values.');
      return;
    }

    navigate('/Paysheet');
  };

  return (
    <div>
      <h1>Modify Information</h1>
      <div className="modify-info-container">
        {selectedImage && (
          <div className="image-preview">
            <h3>Uploaded Image :</h3>
            <img src={selectedImage} alt="Uploaded Image" style={{ maxWidth: '95%' }} />
          </div>
        )}
        {!selectedImage && (
          <div className="empty-image-preview">
            <p>No image uploaded</p>
          </div>
        )}
        {selectedImage && (
          <div className="info-section">
            <h3>
              {isEditing ? (
                <input type="text" value={name} onChange={handleNameChange} />
              ) : (
                name
              )}
            </h3>
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
                {data.map((item, index) => (
                  <tr key={index}>
                    <td>{isEditing ? <input type="text" value={item.date} onChange={(e) => setData(prevData => {
                      const newData = [...prevData];
                      newData[index].date = e.target.value;
                      return newData;
                    })} style={{ width: '90px' }} /> : item.date}</td>
                    <td>{isEditing ? <input type="text" value={item.day} onChange={(e) => setData(prevData => {
                      const newData = [...prevData];
                      newData[index].day = e.target.value;
                      return newData;
                    })} style={{ width: '80px' }} /> : item.day}</td>
                    <td>{isEditing ? <input type="text" value={item.timeIn} onChange={(e) => setData(prevData => {
                      const newData = [...prevData];
                      newData[index].timeIn = e.target.value;
                      return newData;
                    })} /> : item.timeIn}</td>
                    <td>{isEditing ? <input type="text" value={item.timeOut} onChange={(e) => setData(prevData => {
                      const newData = [...prevData];
                      newData[index].timeOut = e.target.value;
                      return newData;
                    })} /> : item.timeOut}</td>
                    <td>{isEditing ? <input type="text" value={item.timeIn2} onChange={(e) => setData(prevData => {
                      const newData = [...prevData];
                      newData[index].timeIn2 = e.target.value;
                      return newData;
                    })} /> : item.timeIn2}</td>
                    <td>{isEditing ? <input type="text" value={item.timeOut2} onChange={(e) => setData(prevData => {
                      const newData = [...prevData];
                      newData[index].timeOut2 = e.target.value;
                      return newData;
                    })} /> : item.timeOut2}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {isEditing && (
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
                <button style={{ fontSize: '0.9rem', padding: '4px 8px', marginRight: '8px' }} onClick={handleSaveAll}>
                  Save All
                </button>
                <button style={{ fontSize: '0.9rem', padding: '4px 8px' }} onClick={handleCancelAll}>
                  Cancel All
                </button>
              </div>
            )}
          </div>
        )}
      </div>
      {selectedImage && !isEditing && (
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '15px' }}>
          <button style={{ fontSize: '1.0rem', padding: '5px 10px' }} onClick={handleModify}>
            Modify
          </button>
        </div>
      )}
      {selectedImage && (
        <div className="user-input-section" style={{ display: 'flex', justifyContent: 'flex-end', margin: '16px 0' }}>
          <div style={{ marginRight: '16px' }}>
            <label>
              Rate per Hour:
              <input
                type="text"
                value={ratePerHour}
                onChange={handleRatePerHourChange}
              />
            </label>
          </div>
          <div>
            <label>
              Overtime Pay:
              <input
                type="text"
                value={overtimePay}
                onChange={handleOvertimePayChange}
              />
            </label>
          </div>
        </div>
      )}
      {selectedImage && (
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '15px' }}>
          <button
            style={{ fontSize: '1.0rem', padding: '5px 10px' }}
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default ModifyInfo;

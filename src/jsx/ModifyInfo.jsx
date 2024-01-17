// ModifyInfo.jsx

import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import '../App.css'; // App.css 파일을 import

const ModifyInfo = () => {
  const location = useLocation();
  const selectedImage = location.state && location.state.selectedImage;

  // 초기 데이터 설정
  const initialData = [
    { date: '6/23/2023', day: 'Thursday', timeIn: 10, timeOut: 10, timeIn2: 10, timeOut2: 10 },
    { date: '7/23/2023', day: 'Friday', timeIn: 20, timeOut: 10, timeIn2: 10, timeOut2: 10 },
    { date: '8/23/2023', day: 'Saturday', timeIn: 30, timeOut: 10, timeIn2: 10, timeOut2: 10 },
  ];

  // 상태 설정
  const [data, setData] = useState(initialData);

  // 입력 값을 관리하기 위한 상태 설정
  const [editableData, setEditableData] = useState({ date: '', day: '', timeIn: '', timeOut: '', timeIn2: '', timeOut2: '' });

  // 수정 상태를 관리하기 위한 상태 설정
  const [isEditing, setIsEditing] = useState(false);

  // 표 전체 클릭 시 수정 모드로 전환
  const handleEditTable = (item) => {
    setIsEditing(true);
    setEditableData(item);
  };

  // 수정된 데이터 저장
  const handleSave = () => {
    // 현재 데이터를 복제하고 수정된 값을 적용
    const updatedData = data.map(item =>
      item.date === editableData.date ? { ...item, day: editableData.day } : item
    );

    // 수정된 데이터로 상태 업데이트
    setData(updatedData);

    // 수정 모드 종료
    setEditableData({ date: '', day: '', timeIn: '', timeOut: '', timeIn2: '', timeOut2: '' });
    setIsEditing(false);
  };

  // 취소 버튼 클릭 시 수정 모드 종료
  const handleCancel = () => {
    setEditableData({ date: '', day: '', timeIn: '', timeOut: '', timeIn2: '', timeOut2: '' });
    setIsEditing(false);
  };

  // 모든 데이터 수정 완료 후 Save All 버튼 클릭 시 호출
  const handleSaveAll = () => {
    // 모든 데이터 저장
    // 예시로 현재는 day만 수정되도록 설정되어 있습니다. 다른 필드도 필요에 따라 수정 가능합니다.
    const updatedData = data.map(item => ({ ...item, day: editableData.day }));

    // 수정된 데이터로 상태 업데이트
    setData(updatedData);

    // 수정 모드 종료
    setEditableData({ date: '', day: '', timeIn: '', timeOut: '', timeIn2: '', timeOut2: '' });
    setIsEditing(false);
  };

  // 편집 모드인 경우 모든 셀을 수정 가능하도록 처리
  const handleCellEdit = (item, field) => {
    if (isEditing) {
      setEditableData({ ...editableData, [field]: item[field] });
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
        <div className="info-section">
          <h3>Somi</h3>
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
              {data.map(item => (
                <tr key={item.date} onClick={() => handleEditTable(item)}>
                  <td>{item.date}</td>
                  <td>{item.day}</td>
                  <td
                    onClick={() => handleCellEdit(item, 'timeIn')}
                  >
                    {isEditing ? (
                      <input
                        type="text"
                        value={editableData.timeIn}
                        onChange={(e) => setEditableData({ ...editableData, timeIn: e.target.value })}
                      />
                    ) : (
                      item.timeIn
                    )}
                  </td>
                  <td
                    onClick={() => handleCellEdit(item, 'timeOut')}
                  >
                    {isEditing ? (
                      <input
                        type="text"
                        value={editableData.timeOut}
                        onChange={(e) => setEditableData({ ...editableData, timeOut: e.target.value })}
                      />
                    ) : (
                      item.timeOut
                    )}
                  </td>
                  <td
                    onClick={() => handleCellEdit(item, 'timeIn2')}
                  >
                    {isEditing ? (
                      <input
                        type="text"
                        value={editableData.timeIn2}
                        onChange={(e) => setEditableData({ ...editableData, timeIn2: e.target.value })}
                      />
                    ) : (
                      item.timeIn2
                    )}
                  </td>
                  <td
                    onClick={() => handleCellEdit(item, 'timeOut2')}
                  >
                    {isEditing ? (
                      <input
                        type="text"
                        value={editableData.timeOut2}
                        onChange={(e) => setEditableData({ ...editableData, timeOut2: e.target.value })}
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
            <div style={{ marginTop: '10px' }}>
              <button onClick={handleSaveAll}>Save All</button>
              <button onClick={handleCancel}>Cancel All</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModifyInfo;

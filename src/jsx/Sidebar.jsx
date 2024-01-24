import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../css/Sidebar.css'; 

function Sidebar() {
  const location = useLocation();

  return (
    <div className="sidebar" style={{ width: '250px', backgroundColor: '#FFF3F3' }}>
      <div className="sidebar-title" style={{ margin: '15px 0 30px', textAlign: 'center' }}>
        <Link to="/Paysheet">
          <img src="/assets/title.png" alt="Title" style={{ maxWidth: '80%' }} />
        </Link>
      </div>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        <li style={{ marginLeft: '8px', marginBottom: '10px' }}>
          <Link to="/UploadImage" className={location.pathname === '/UploadImage' ? 'selected-link' : ''}>
            <img src="/assets/icon.png" alt="Icon 1" style={{ marginRight: '8px' }} /> Upload Image
          </Link>
        </li>
        <li style={{ marginLeft: '8px', marginBottom: '10px' }}>
          <Link to="/ModifyInfo" className={location.pathname === '/ModifyInfo' ? 'selected-link' : ''}>
            <img src="/assets/icon2.png" alt="Icon 2" style={{ marginRight: '8px' }} /> Modify Information
          </Link>
        </li>
        <li style={{ marginLeft: '8px', marginBottom: '10px' }}>
          <Link to="/Paysheet" className={location.pathname === '/Paysheet' ? 'selected-link' : ''}>
            <img src="/assets/icon3.png" alt="Icon 3" style={{ marginRight: '8px' }} /> Payroll Overview
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
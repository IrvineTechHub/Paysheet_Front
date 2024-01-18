import React from 'react';
import { Link } from 'react-router-dom';

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar-title">
        <Link to="/UploadImage">
          <img src="/assets/title.png" alt="Title" />
        </Link>
      </div>
      <ul>
        <li>
          <Link to="/UploadImage">Upload Image</Link>
        </li>
        <li>
          <Link to="/ModifyInfo">Modify Information</Link>
        </li>
        <li>
          <Link to="/Paysheet">Payroll Overview</Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;

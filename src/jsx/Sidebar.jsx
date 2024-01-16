import React from 'react';
import { Link } from 'react-router-dom';

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar-title">
        <img src="/assets/title.png" alt="Title" />
      </div>
      <ul>
        <li>
          <Link to="/Paysheet">Payroll Overview</Link>
        </li>
        <li>
          <Link to="/UploadImage">Upload Image</Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
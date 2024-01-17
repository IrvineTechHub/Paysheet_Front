import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Paysheet from './jsx/Paysheet';
import UploadImage from './jsx/UploadImage';
import ModifyInfo from './jsx/ModifyInfo';
import Sidebar from './jsx/Sidebar';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Sidebar />
        <div className="content">
          <Routes>
            <Route path="/paysheet" element={<Paysheet />} />
            <Route path="/modifyinfo" element={<ModifyInfo />} />
            <Route path="/uploadimage" element={<UploadImage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;

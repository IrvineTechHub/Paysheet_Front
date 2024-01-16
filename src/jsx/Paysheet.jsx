import React from 'react';
import '../css/Paysheet.css';

function Paysheet() {
  // 가상의 데이터
  const paysheetData = [
    { id: 1, employee: 'John Doe', salary: 5000 },
    { id: 2, employee: 'Jane Smith', salary: 6000 }
  ];

  return (
    <div>
      <h2>Payroll Overview</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Employee</th>
            <th>Salary</th>
          </tr>
        </thead>
        <tbody>
          {paysheetData.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.employee}</td>
              <td>{item.salary}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Paysheet;
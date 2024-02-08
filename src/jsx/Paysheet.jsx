import React, { useState, useEffect } from 'react';
import '../css/Paysheet.css';

function Paysheet() {
  // 가상의 데이터
  const [testData, setTestData] = useState([]);

  const paysheetData = [
    { month: 6, employee: 'Somi', totalHours: 60, salary: 5000 },
    { month: 6, employee: 'Jiwon', totalHours: 60, salary: 6000 },
    { month: 7, employee: 'Jiwon', totalHours: 60, salary: 6000 },
    { month: 7, employee: 'Somi', totalHours: 55, salary: 5500 },
    { month: 8, employee: 'Somi', totalHours: 55, salary: 5500 },
    // 데이터 추가해서 테스트
  ];

  useEffect(() => {
    const fetchPaysheetData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/payroll/payroll');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setTestData(data);
        console.log("Fetched data:", data); // 응답 데이터를 바로 로그에 찍음
      } catch (error) {
        console.error("Failed to fetch paysheet data:", error);
      }
    };
  
    fetchPaysheetData();
  }, []);
  

  // 월별로 자동분류
  const groupedData = paysheetData.reduce((acc, item) => {
    const month = item.month;
    if (!acc[month]) {
      acc[month] = [];
    }
    acc[month].push(item);
    return acc;
  }, {});

  // Sort the keys in reverse order (latest to earliest)
  const sortedMonths = Object.keys(groupedData).sort((a, b) => b - a);

  return (
    <div>
      <h2>Payroll Overview</h2>
      {sortedMonths.map((month) => (
        <div key={month}>
          <h3>Month {month}</h3>
          <table>
            <thead>
              <tr>
                <th>Employee</th>
                <th>Total Hours</th>
                <th>Salary</th>
              </tr>
            </thead>
            <tbody>
              {groupedData[month].map((item, index) => (
                <tr key={index}>
                  <td>{item.employee}</td>
                  <td>{item.totalHours}</td>
                  <td>{item.salary}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}

export default Paysheet;

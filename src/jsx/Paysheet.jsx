import React from 'react';
import '../css/Paysheet.css';

function Paysheet() {
  // 가상의 데이터
  const paysheetData = [
    { month: 6, employee: 'Somi', totalHours: 60, salary: 5000 },
    { month: 6, employee: 'Jiwon', totalHours: 60, salary: 6000 },
    { month: 7, employee: 'Jiwon', totalHours: 60, salary: 6000 },
    { month: 7, employee: 'Somi', totalHours: 55, salary: 5500 },
    { month: 8, employee: 'Somi', totalHours: 55, salary: 5500 },
    // 데이터 추가해서 테스트
  ];

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
      <h1>Payroll Overview</h1>
      <div>
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
                    <td className="pink-cell">{item.salary}</td> {/* 클래스 추가 */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Paysheet;
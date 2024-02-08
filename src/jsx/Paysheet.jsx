import React, { useState, useEffect } from "react";
import "../css/Paysheet.css";

function formatYearMonth(input) {
  // 입력값을 '-' 기준으로 분할
  const parts = input.split("-");

  // 년도와 월을 분리
  const year = parts[0];
  let month = parts[1];

  // 월이 한 자리 수인 경우, 앞에 '0'을 추가
  if (month.length === 1) {
    month = "0" + month;
  }

  // 변환된 년도와 월을 '-'로 다시 결합하여 반환
  return `${year}-${month}`;
}

function Paysheet() {
  // 가상의 데이터
  const [testData, setTestData] = useState([]);

  const [paysheetData, setPaysheetData] = useState([]);
  // const paysheetData = [
  // { month: 6, employee: "Somi", totalHours: 60, salary: 5000 },
  // { month: 6, employee: "Jiwon", totalHours: 60, salary: 6000 },
  //   { month: 7, employee: "Jiwon", totalHours: 60, salary: 6000 },
  //   { month: 7, employee: "Somi", totalHours: 55, salary: 5500 },
  //   { month: 8, employee: "Somi", totalHours: 55, salary: 5500 },
  //   // 데이터 추가해서 테스트
  // ];

  useEffect(() => {
    const fetchPaysheetData = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:5000/api/pay`);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        console.log("response", data);
        setPaysheetData(data);
        console.log(data);
        setTestData(data);
        console.log("Fetched data:", data); // 응답 데이터를 바로 로그에 찍음
      } catch (error) {
        console.error("Failed to fetch paysheet data:", error);
      }
    };

    fetchPaysheetData();
  }, []);

  // 월별로 자동분류
  // const groupedData = paysheetData.reduce((acc, item) => {
  //   const month = item.month;
  //   if (!acc[month]) {
  //     acc[month] = [];
  //   }
  //   acc[month].push(item);
  //   return acc;
  // }, {});

  // // Sort the keys in reverse order (latest to earliest)
  // const sortedMonths = Object.keys(groupedData).sort((a, b) => b - a);

  return (
    <div>
      <h2>Payroll Overview</h2>
      <table>
        <thead>
          <tr>
            <th>Time</th>
            <th>Employee</th>
            <th>Total Hours</th>
            <th>Salary</th>
          </tr>
        </thead>
        <tbody>
          {paysheetData.map((item, index) => (
            <tr key={index}>
              <td>{formatYearMonth(item.time)}</td>
              <td>{item.employee}</td>
              <td>{item.totalHours}</td>
              <td>{item.salary}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Paysheet;

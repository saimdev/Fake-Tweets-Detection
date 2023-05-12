import React from "react";

export function SearchDetails({ reports }) {
  return (
    <table className="w-100">
      <thead>
        <tr>
          <th>Id</th>
          <th>Report Name</th>
          <th>Result</th>
        </tr>
      </thead>
      <tbody>
        {reports.map((report, index) => {
          return (
            <tr key={report.id}>
              <td>{index+1}</td>
              <td>{report.name}</td>
              <td>{report.result}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

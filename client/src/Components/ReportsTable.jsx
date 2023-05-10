import React from "react";

export function ReportsTable({ reports }) {
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
        {reports.map((report) => {
          return (
            <tr key={report.id}>
              <td>{report.id}</td>
              <td>{report.name}</td>
              <td>{report.result}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

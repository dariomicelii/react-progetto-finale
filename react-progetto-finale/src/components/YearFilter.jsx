import React from "react";

function YearFilter({ years, selectedYear, setSelectedYear }) {
  return (
    <select
      className="form-select mb-4 rounded-5"
      value={selectedYear}
      onChange={(e) => setSelectedYear(e.target.value)}
    >
      <option value="">Tutti gli anni</option>
      {years.map((year) => (
        <option key={year} value={year}>
          {year}
        </option>
      ))}
    </select>
  );
}

export default YearFilter;

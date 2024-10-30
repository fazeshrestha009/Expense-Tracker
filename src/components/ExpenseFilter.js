import React from 'react';

function ExpenseFilter({ onFilterChange }) {
  return (
    <div className="flex gap-4 mt-6">
      <div>
        <label className="block text-gray-700">Start Date</label>
        <input type="date" onChange={(e) => onFilterChange("startDate", e.target.value)} className="w-full p-2 border border-gray-300 rounded mt-1" />
      </div>
      <div>
        <label className="block text-gray-700">End Date</label>
        <input type="date" onChange={(e) => onFilterChange("endDate", e.target.value)} className="w-full p-2 border border-gray-300 rounded mt-1" />
      </div>
    </div>
  );
}

export default ExpenseFilter;

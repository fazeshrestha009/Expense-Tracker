import React from 'react';

function ExpenseTable({ expenses }) {
  return (
    <table className="min-w-full bg-white border border-gray-200">
      <tbody>
        {expenses.map((expense, index) => (
          <tr key={index} className="hover:bg-gray-100">
            <td className="py-2 px-4 border-b">{expense.name}</td>
            <td className="py-2 px-4 border-b">Rs {expense.amount}</td>
            <td className="py-2 px-4 border-b">{expense.date}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ExpenseTable;

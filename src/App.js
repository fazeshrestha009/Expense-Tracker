import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseTable.js';

function App() {
  const [expenses, setExpenses] = useState([]);
  const addExpense = (expense) => {
    setExpenses((prevExpenses) => [...prevExpenses, expense]);
  };

  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      <Sidebar />
      <div className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-6">Expense Tracker</h1>
        <ExpenseForm onAddExpense={addExpense} />
        <ExpenseList expenses={expenses} />
      </div>
    </div>
  );
}

export default App;

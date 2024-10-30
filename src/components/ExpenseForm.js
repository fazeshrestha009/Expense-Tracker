import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';

const ExpenseForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [expenses, setExpenses] = useState([]);
  const [filteredExpenses, setFilteredExpenses] = useState([]);
  const [totalExpense, setTotalExpense] = useState(0);
  const [filterDates, setFilterDates] = useState({
    startDate: '',
    endDate: ''
  });

  const onSubmit = (data) => {
    const newExpense = {
      name: data.name,
      amount: parseFloat(data.amount),
      date: new Date(data.date).toISOString().split('T')[0],
    };
    setExpenses([...expenses, newExpense]);
  };

  useEffect(() => {
    const total = filteredExpenses.reduce((acc, expense) => acc + expense.amount, 0);
    setTotalExpense(total);
  }, [filteredExpenses]);

  useEffect(() => {
    const filtered = expenses.filter((expense) => {
      const expenseDate = new Date(expense.date);
      const startDate = filterDates.startDate ? new Date(filterDates.startDate) : null;
      const endDate = filterDates.endDate ? new Date(filterDates.endDate) : null;

      return (!startDate || expenseDate >= startDate) && (!endDate || expenseDate <= endDate);
    });
    setFilteredExpenses(filtered);
  }, [filterDates, expenses]);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-6">Add New Expense</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white shadow-md rounded-lg p-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Expense Name</label>
            <input
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black" 
              {...register('name', { required: true })}
            />
            {errors.name && <span className="text-red-500 text-sm mt-1">This field is required</span>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Amount</label>
            <input
              type="number"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black" 
              {...register('amount', { required: true, validate: value => value > 0 })}
            />
            {errors.amount && <span className="text-red-500 text-sm mt-1">Amount must be a positive number</span>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Date</label>
            <input
              type="date"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black" 
              {...register('date', {
                required: true,
                validate: value => new Date(value) <= new Date(),
              })}
            />
            {errors.date && <span className="text-red-500 text-sm mt-1">Date must be today or earlier</span>}
          </div>
        </div>

        <div className="flex justify-end mt-4">
          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Add Expense
          </button>
        </div>
      </form>

      <h2 className="text-2xl font-semibold mt-10 mb-4">Filter Expenses</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-white">Start Date</label>
          <input
            type="date"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black" 
            value={filterDates.startDate}
            onChange={(e) => setFilterDates({ ...filterDates, startDate: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-white">End Date</label>
          <input
            type="date"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black" 
            value={filterDates.endDate}
            onChange={(e) => setFilterDates({ ...filterDates, endDate: e.target.value })}
          />
        </div>
      </div>

      <h2 className="text-2xl font-semibold mt-10 mb-4">Expense List</h2>
      <table className="min-w-full table-auto bg-white shadow-md rounded-lg">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Name</th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Amount</th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Date</th>
          </tr>
        </thead>
        <tbody className="text-black">
          {filteredExpenses.map((expense, index) => (
            <tr key={index} className="border-b">
              <td className="px-4 py-2">{expense.name}</td>
              <td className="px-4 py-2">Rs {expense.amount}</td>
              <td className="px-4 py-2">{expense.date}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3 className="text-xl font-semibold mt-6">
        Total Expense: <span className="text-red-500">Rs {totalExpense}</span>
      </h3>
    </div>
  );
};

export default ExpenseForm;

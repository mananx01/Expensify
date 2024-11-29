"use client"
import React, { useState } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";


const ExpenseSplitter = () => {
  const [expenses, setExpenses] = useState([
    {
      id: 1,
      name: "Dinner",
      amount: 1200,
      members: [
        { name: "Manan", amount: 300 },
        { name: "Yash", amount: 500 },
        { name: "Ansh", amount: 200 },
        { name: "Khushi", amount: 200 }
      ],
    },
    {
      id: 2,
      name: "Groceries",
      amount: 730,
      members: [
        { name: "Ansh", amount: 150 },
        { name: "Rohan", amount: 380},
        { name: "Sarthak", amount: 200},
      ],
    },
    {
      id: 3,
      name: "Movie Tickets",
      amount: 200,
      members: [
        { name: "Ansh", amount: 100 },
        { name: "Yash", amount: 100 },
      ],
    },
  ]);

  const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#8dd1e1"];


  const [expenseName, setExpenseName] = useState("");
  const [amount, setAmount] = useState("");
  const [members, setMembers] = useState("");
  const [selectedMember, setSelectedMember] = useState(null);
  const [editedAmount, setEditedAmount] = useState("");

  const equalAmount = parseFloat(amount) / (members.split(",").length);

  const handleAddExpense = (e) => {
    e.preventDefault();
    const newExpense = {
      id: expenses.length + 1,
      name: expenseName,
      amount: parseFloat(amount),
      members: members.split(",").map((member) => ({
        name: member.trim(),
        amount: equalAmount,
      })),
    };
    setExpenses([...expenses, newExpense]);
    setExpenseName("");
    setAmount("");
    setMembers("");
  };

  const handleUpdateMemberAmount = () => {
    if (selectedMember && editedAmount !== "") {
      const { expenseId, member } = selectedMember;
      setExpenses((prevExpenses) =>
        prevExpenses.map((expense) =>
          expense.id === expenseId
            ? {
                ...expense,
                members: expense.members.map((m) =>
                  m.name === member.name
                    ? { ...m, amount: parseFloat(editedAmount) }
                    : m
                ),
              }
            : expense
        )
      );
      setSelectedMember(null);
      setEditedAmount("");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-bl from-slate-100 via-slate-200 to-slate-300 p-8 font-sans">
      <h1 className="text-4xl font-bold text-center text- mb-8">
        Group Expense Split
      </h1>
      <div className="grid gap-6 lg:grid-cols-2">
        <div>
          {expenses.map((expense) => (
            <div
              key={expense.id}
              className="mb-4 p-4 bg-white shadow-md rounded-lg border-l-4 border-primary w-full"
            >
              <h3 className="text-xl font-semibold text-gray-800">
                {expense.name} -{" "}
                <span className="text-green-600">${expense.amount}</span>
              </h3>
              <ul className="mt-2 text-gray-600">
                {expense.members.map((member, index) => (
                  <li key={index} className="flex justify-between items-center py-1">
                    <span>
                      - {member.name}:{" "}
                      <span className="text-blue-600">${member.amount.toFixed(2)}</span>
                    </span>
                    <button
                      onClick={() => {
                        setSelectedMember({ expenseId: expense.id, member });
                        setEditedAmount(member.amount.toString());
                      }}
                      className="text-indigo-500 hover:underline"
                    >
                      Edit
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <form
          onSubmit={handleAddExpense}
          className="p-6 bg-white shadow-md rounded-lg"
        >
          <h2 className="text-2xl font-semibold text-primary mb-4">
            Add New Expense
          </h2>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Expense Name
            </label>
            <input
              type="text"
              value={expenseName}
              onChange={(e) => setExpenseName(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Amount
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Members (comma-separated)
            </label>
            <input
              type="text"
              value={members}
              onChange={(e) => setMembers(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-primary text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            Add Expense
          </button>
        </form>
      </div>

      {selectedMember && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4">
              Edit {selectedMember.member.name}'s Amount
            </h3>
            <input
              type="number"
              value={editedAmount}
              onChange={(e) => setEditedAmount(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 mb-4"
            />
            <button
              onClick={handleUpdateMemberAmount}
              className="w-full py-2 px-4 bg-primary text-white font-semibold rounded-lg hover:bg-blue-700 mb-2"
            >
              Save
            </button>
            <button
              onClick={() => setSelectedMember(null)}
              className="w-full py-2 px-4 bg-gray-300 text-black font-semibold rounded-lg hover:bg-gray-400"
            >
              Close
            </button>
          </div>
        </div>
      )}

          
    <div className="p-6 flex flex-wrap justify-between gap-6 bg-gray-100 border border-gray-300 rounded-md shadow-lg mt-8">
      {expenses.map((expense) => (
        <div
          key={expense.id}
          className="w-full lg:w-[48%] p-6 bg-white shadow-md rounded-lg border border-gray-200"
        >
          <h4 className="text-xl font-semibold text-gray-800 mb-4">
            {expense.name} - <span className="text-green-600">Expense Split</span>
          </h4>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={expense.members}
                dataKey="amount"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                innerRadius={60}
                fill="#82ca9d"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
                labelStyle={{
                  fontSize: "12px",
                  fontWeight: "500",
                  fill: "#555",
                }}
              >
                {expense.members.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(255, 255, 255, 0.9)",
                  borderRadius: "8px",
                  border: "1px solid #ccc",
                  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-6 grid grid-cols-2 gap-3 text-sm text-gray-700">
            {expense.members.map((member, index) => (
              <div
                key={index}
                className="flex items-center p-2 border border-gray-200 rounded-lg bg-gray-50"
              >
                <div
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
                ></div>
                <span className="ml-2">
                  {member.name}: <span className="font-semibold">${member.amount.toFixed(2)}</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
          
    </div>
  );
};

export default ExpenseSplitter;

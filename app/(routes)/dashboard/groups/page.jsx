"use client"
import React, { useState } from "react";

const ExpenseSplitter = () => {
  const [expenses, setExpenses] = useState([
    {
      id: 1,
      name: "Dinner",
      amount: 100,
      members: [
        { name: "Manan", amount: 50 },
        { name: "Yash", amount: 50 },
      ],
    },
    {
      id: 2,
      name: "Groceries",
      amount: 150,
      members: [{ name: "Ansh", amount: 150 }],
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

  const [expenseName, setExpenseName] = useState("");
  const [amount, setAmount] = useState("");
  const [members, setMembers] = useState("");
  const [selectedMember, setSelectedMember] = useState(null);

  const handleAddExpense = (e) => {
    e.preventDefault();
    const newExpense = {
      id: expenses.length + 1,
      name: expenseName,
      amount: parseFloat(amount),
      members: members.split(",").map((member) => ({
        name: member.trim(),
        amount: 0,
      })),
    };
    setExpenses([...expenses, newExpense]);
    setExpenseName("");
    setAmount("");
    setMembers("");
  };

  const handleUpdateMemberAmount = (expenseId, memberName, newAmount) => {
    setExpenses((prevExpenses) =>
      prevExpenses.map((expense) =>
        expense.id === expenseId
          ? {
              ...expense,
              members: expense.members.map((member) =>
                member.name === memberName
                  ? { ...member, amount: parseFloat(newAmount) }
                  : member
              ),
            }
          : expense
      )
    );
    setSelectedMember(null);
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
              className="mb-4 p-4 bg-white shadow-md rounded-lg border-l-4 border-primary"
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
                      onClick={() =>
                        setSelectedMember({ expenseId: expense.id, member })
                      }
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
              defaultValue={selectedMember.member.amount}
              onChange={(e) =>
                handleUpdateMemberAmount(
                  selectedMember.expenseId,
                  selectedMember.member.name,
                  e.target.value
                )
              }
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 mb-4"
            />
            <button
              onClick={() => setSelectedMember(null)}
              className="w-full py-2 px-4 bg-primary text-white font-semibold rounded-lg hover:bg-blue-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExpenseSplitter;

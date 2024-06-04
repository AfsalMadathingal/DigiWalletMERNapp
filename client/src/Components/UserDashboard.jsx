// src/components/Dashboard.js

import React from 'react';

const UserDashboard = () => {
    return (
        <div className="grad-bg xs:p-10    lg:h-screen lg:p-24">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-white  p-6 rounded-lg shadow border">
              <h3 className="text-gray-500">Balance</h3>
              <p className="text-3xl font-semibold">$45,678.90</p>
              <p className="text-green-500">+20% month over month</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-gray-500">Transactions</h3>
              <p className="text-3xl font-semibold">2,405</p>
              <p className="text-green-500">+33% month over month</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-gray-500">Payment Requests</h3>
              <p className="text-3xl font-semibold">10,353</p>
              <p className="text-red-500">-8% month over month</p>
            </div>
          </div>
    
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-gray-500">Send Money</h3>
              <form className="mt-4">
                <div className="mb-4">
                  <label className="block text-gray-700">Recipient</label>
                  <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" placeholder="Recipient Email" />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Amount</label>
                  <input type="number" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" placeholder="Amount" />
                </div>
                <button type="submit" className="w-full bg-blue-900 text-white py-2 rounded-md hover:bg-blue-600">Send</button>
              </form>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-gray-500">Recent Transactions</h3>
              <ul>
                {[
                  { id: 1, recipient: 'Alice', amount: '$100', date: '2023-06-01' },
                  { id: 2, recipient: 'Bob', amount: '$250', date: '2023-06-02' },
                  { id: 3, recipient: 'Charlie', amount: '$75', date: '2023-06-03' },
                  { id: 4, recipient: 'David', amount: '$300', date: '2023-06-04' },
                ].map(transaction => (
                  <li key={transaction.id} className="flex justify-between items-center my-2">
                    <div>
                      <p className="text-gray-800">{transaction.recipient}</p>
                      <p className="text-gray-500 text-sm">{transaction.date}</p>
                    </div>
                    <p className="text-gray-800">{transaction.amount}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
    
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-gray-500">Transaction Overview</h3>
              {/* Example line chart - use your preferred chart library */}
              <div className="h-48 bg-gray-200 flex items-center justify-center">Line Chart</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-gray-500">Monthly Expenses</h3>
              {/* Example bar chart - use your preferred chart library */}
              <div className="h-48 bg-gray-200 flex items-center justify-center">Bar Chart</div>
            </div>
          </div>
        </div>
      );
    };
export default UserDashboard;

import React from "react";

const Setting = () => {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8 space-y-10">
      <h1 className="text-4xl font-bold text-gray-800">Settings</h1>

      {/* Profile Settings */}
      <section className="bg-white p-6 rounded-2xl shadow-md border space-y-4">
        <h2 className="text-2xl font-semibold text-gray-700">Profile</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Name
            </label>
            <input
              type="text"
              placeholder="Enter your name"
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>
        </div>
      </section>

      {/* Budget Settings */}
      <section className="bg-white p-6 rounded-2xl shadow-md border space-y-4">
        <h2 className="text-2xl font-semibold text-gray-700">
          Budget Preferences
        </h2>
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Monthly Budget Limit
          </label>
          <input
            type="number"
            placeholder="Enter monthly budget limit"
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>
      </section>

      {/* Save Button */}
      <div className="text-right">
        <button className="bg-yellow-400 hover:bg-yellow-500 transition text-white font-semibold px-6 py-3 rounded-lg">
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default Setting;

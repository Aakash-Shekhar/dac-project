import React from "react";
import { MdDashboard } from "react-icons/md";
import { IoIosSettings } from "react-icons/io";
import { CiLogin } from "react-icons/ci";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      <div className="p-3 shadow-lg h-20 flex justify-between items-center">
        <h1 className="text-3xl font-bold">Expense Tracker</h1>

        <div>
          <button className="mr-4 text-xl font-bold rounded-md p-2 bg-yellow-300 hover:bg-yellow-400 cursor-pointer border border-2 border-yellow-500">
            <div className="flex justify-center items-center">
              <CiLogin />
              <p>LogIn</p>
            </div>
          </button>
          <button className="mr-4 text-xl font-bold rounded-md p-2 bg-red-500 hover:bg-red-600 cursor-pointer border border-2 border-red-700">
            <div className="flex justify-center items-center">
              <img src="image/add-user.png" alt="" width="20px" height="20px" />
              <p>SignUp</p>
            </div>
          </button>
        </div>
      </div>

      <div className="p-3 h-auto w-1/6 mt-4 shadow-lg">
        <ul className="space-y-6">
          <li>
            <Link
              to="/dashboard"
              className="mb-4 flex font-bold text-lg mb-16 mt-4"
            >
              <MdDashboard size={25} />
              <p className="pl-2">Dashboard</p>
            </Link>
          </li>

          <li>
            <Link to="/income" className="mb-4 flex font-bold text-lg mb-16 ">
              <img src="image/icons8-income-50.png" alt="" width="25px" />
              <p className="pl-2">Income</p>
            </Link>
          </li>

          <li>
            <Link to="/expense" className="mb-4 flex font-bold text-lg mb-16">
              <img src="image/icons8-expense-50.png" alt="" width="25px" />
              <p className="pl-2">Expense</p>
            </Link>
          </li>

          <li>
            <Link to="/budget" className="mb-4 flex font-bold text-lg mb-16">
              <img src="image/icons8-budget-50.png" alt="" width="25px" />
              <p className="pl-2">Budget</p>
            </Link>
          </li>

          <li>
            <Link to="/setting" className="mb-4 flex font-bold text-lg mb-16">
              <IoIosSettings size={25} />
              <p className="pl-2">setting</p>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;

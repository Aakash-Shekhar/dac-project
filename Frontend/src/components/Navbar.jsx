import React from "react";
import { Link } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { IoIosSettings } from "react-icons/io";

const navLinks = [
  { to: "/dashboard", label: "Dashboard", icon: <MdDashboard size={22} /> },
  {
    to: "/income",
    label: "Income",
    icon: <img src="/image/icons8-income-50.png" width="22" />,
  },
  {
    to: "/expense",
    label: "Expense",
    icon: <img src="/image/icons8-expense-50.png" width="22" />,
  },
  {
    to: "/budget",
    label: "Budget",
    icon: <img src="/image/icons8-budget-50.png" width="22" />,
  },
  { to: "/setting", label: "Setting", icon: <IoIosSettings size={22} /> },
];

const Navbar = () => {
  return (
    <aside
      className="bg-white h-full w-full md:w-64 p-4"
      style={{ display: "flex", flexDirection: "column" }}
    >
      <ul className="space-y-4">
        {navLinks.map(({ to, label, icon }) => (
          <li key={label}>
            <Link
              to={to}
              className="flex items-center gap-3 text-gray-800 text-lg font-semibold hover:bg-yellow-200 p-2 rounded-md transition-transform transform hover:scale-105"
              style={{ textDecoration: "none" }}
            >
              {icon}
              <span>{label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Navbar;

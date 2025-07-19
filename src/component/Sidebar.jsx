import React, { useContext } from "react";
import { AdminContext } from "../context/AdminContext";
import { NavLink, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const { aToken, adminLogout } = useContext(AdminContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    adminLogout();
    // Redirect to main website home page
    const frontendUrl = import.meta.env.VITE_FRONTEND_URL || "https://prescripto-frontend-ten.vercel.app";
    window.location.href = frontendUrl;
  };

  return (
    <div className="min-h-screen bg-white border-r">
      {aToken && (
        <ul className="text-[#515151] mt-5">
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? "bg-[#F2F3FF] border-r-4 border-[#5f6FFF]" : ""
              }`
            }
            to="/admin-dashboard"
          >
            <p>Dashboard</p>
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? "bg-[#F2F3FF] border-r-4 border-[#5f6FFF]" : ""
              }`
            }
            to="/all-appointment"
          >
            <p>Appointments</p>
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? "bg-[#F2F3FF] border-r-4 border-[#5f6FFF]" : ""
              }`
            }
            to="/add-doctor"
          >
            <p>Add Doctor</p>
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? "bg-[#F2F3FF] border-r-4 border-[#5f6FFF]" : ""
              }`
            }
            to="/doctor-list"
          >
            <p>Doctor List</p>
          </NavLink>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer text-red-600 hover:bg-red-50 border-r-4 border-transparent hover:border-red-500 transition-all duration-200 cursor-pointer transform transition-transform duration-200 active:scale-95 hover:shadow-2xl"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <p>Logout</p>
          </button>
        </ul>
      )}
    </div>
  );
};

export default Sidebar;

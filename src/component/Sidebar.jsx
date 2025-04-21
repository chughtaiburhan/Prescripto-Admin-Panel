import React, { useContext } from "react";
import {AdminContext} from "../context/AdminContext";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const { aToken } = useContext(AdminContext);

  return (
    <div className="min-h-screen bg-white border-r">
      {aToken && (
        <ul className="text-[#515151] mt-5">
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? "bg-[#F2F3FF] border-r-4 border-[#5f6FFF]" : ""
              }`
            }
            to="/admin-dashboard"
          >
            <p>Dashboard</p>
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? "bg-[#F2F3FF] border-r-4 border-[#5f6FFF]" : ""
              }`
            }
            to="/all-appointment"
          >
            <p>Appointments</p>
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? "bg-[#F2F3FF] border-r-4 border-[#5f6FFF]" : ""
              }`
            }
            to="/add-doctor"
          >
            <p>Add Doctor</p>
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? "bg-[#F2F3FF] border-r-4 border-[#5f6FFF]" : ""
              }`
            }
            to="/doctor-list"
          >
            <p>Doctor List</p>
          </NavLink>
        </ul>
      )}
    </div>
  );
};

export default Sidebar;

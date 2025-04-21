import React, { useEffect, useContext } from "react"; 
import { AdminContext } from "../../context/AdminContext";

const Dashboard = () => {
  const { dashboardStats, getDashboardStats } = useContext(AdminContext);

  useEffect(() => {
    getDashboardStats();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white shadow rounded-lg p-4">
          <h2 className="text-lg font-semibold">Total Users</h2>
          <p className="text-3xl font-bold text-[#5f6FFF]">{dashboardStats.totalUsers}</p>
        </div>
        <div className="bg-white shadow rounded-lg p-4">
          <h2 className="text-lg font-semibold">Total Appointments</h2>
          <p className="text-3xl font-bold text-gray-500">{dashboardStats.totalAppointments}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

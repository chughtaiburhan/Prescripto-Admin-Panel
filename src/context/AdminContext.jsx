import { createContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
export const AdminContext = createContext(null); // Initialize with null or a default value

const AdminContextProvider = ({ children }) => {
  const [aToken, setAToken] = useState(
    localStorage.getItem("aToken") ? localStorage.getItem("aToken") : ""
  );
  const [doctors, setDoctors] = useState([]);
  const [appointment, setAppointment] = useState([]);
  const [dashboardStats, setDashboardStats] = useState({
    totalUsers: 0,
    totalAppointments: 0,
  });
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const calculateAge = (dob) => {
    if (!dob) return "N/A";
    const birthDate = new Date(dob);
    const ageDiff = Date.now() - birthDate.getTime();
    const ageDate = new Date(ageDiff);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  };

  const getAllDoctors = async () => {
    try {
      const { data } = await axios.post(
        `${backendUrl}admin/all-doctor`,
        {},
        { headers: { aToken } }
      );
      if (data.success) {
        setDoctors(data.doctors);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const changeAvailiblity = async (docId) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}admin/change-availiblity`,
        { docId },
        { headers: { aToken } }
      );
      if (data.success) {
        toast.success(data.message);
        await getAllDoctors();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getAllAppointment = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}admin/appointment-list`, {
        headers: { aToken },
      });
      if (data.success) {
        setAppointment(data.appointment);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getDashboardStats = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}admin/dashboard-stats`, {
        headers: { aToken },
      });

      if (data.success) {
        setDashboardStats({
          totalUsers: data.totalUsers,
          totalAppointments: data.totalAppointments,
        });
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const value = {
    aToken,
    setAToken,
    backendUrl,
    doctors,
    getAllDoctors,
    changeAvailiblity,
    getAllAppointment,
    appointment,
    setAppointment,
    calculateAge,
    dashboardStats,
    setDashboardStats,
    getDashboardStats,
  };

  return (
    <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
  );
};

export default AdminContextProvider;

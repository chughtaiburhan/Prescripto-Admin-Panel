import { createContext, useCallback, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
export const AdminContext = createContext(null);

const AdminContextProvider = ({ children }) => {
  const [aToken, setAToken] = useState(
    localStorage.getItem("adminToken") ? localStorage.getItem("adminToken") : ""
  );
  const [doctors, setDoctors] = useState([]);
  const [appointment, setAppointment] = useState([]);
  const [dashboardStats, setDashboardStats] = useState({
    totalUsers: 0,
    totalAppointments: 0,
  });
  const [loading, setLoading] = useState(false);
  const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000/api";

  const calculateAge = (dob) => {
    if (!dob) return "N/A";
    const birthDate = new Date(dob);
    const ageDiff = Date.now() - birthDate.getTime();
    const ageDate = new Date(ageDiff);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  };

  // Doctor Login (from main website)
  const doctorLogin = async (email, password) => {
    setLoading(true);
    try {
      const { data } = await axios.post(`${backendUrl}/api/user/login`, {
        email,
        password,
      });

      if (data.success) {
        // Check if the user is a doctor
        if (data.userData.role === "doctor") {
          setAToken(data.token);
          localStorage.setItem("adminToken", data.token);
          localStorage.setItem("adminRole", "doctor");
          localStorage.setItem("adminUserData", JSON.stringify(data.userData));
          toast.success("Doctor login successful!");
          return { success: true };
        } else {
          toast.error("Access denied. Only doctors can access this panel.");
          return { success: false, message: "Access denied" };
        }
      } else {
        toast.error(data.message);
        return { success: false, message: data.message };
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      toast.error(errorMessage);
      return { success: false, message: errorMessage };
    } finally {
      setLoading(false);
    }
  };



  // Admin/Doctor Logout
  const adminLogout = () => {
    setAToken("");
    setDoctors([]);
    setAppointment([]);
    setDashboardStats({
      totalUsers: 0,
      totalAppointments: 0,
    });
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminRole");
    localStorage.removeItem("adminUserData");
    toast.success("Logged out successfully!");
  };

  // Get All Doctors
  const getAllDoctors = async () => {
    setLoading(true);
    try {
      const { data } = await axios.post(`${backendUrl}/api/admin/all-doctor`, {}, {
        headers: { Authorization: `Bearer ${aToken}` },
      });
      if (data.success) {
        setDoctors(data.doctors);
        return { success: true, doctors: data.doctors };
      } else {
        toast.error(data.message);
        return { success: false, message: data.message };
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      toast.error(errorMessage);
      return { success: false, message: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // Change Doctor Availability
  const changeAvailiblity = async (docId) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/admin/change-availability`,
        { docId },
        {
          headers: { Authorization: `Bearer ${aToken}` },
        }
      );
      if (data.success) {
        toast.success(data.message);
        await getAllDoctors();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  // Get All Appointments
  const getAllAppointment = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${backendUrl}/api/admin/appointment-list`, {
        headers: { Authorization: `Bearer ${aToken}` },
      });

      if (!data) {
        throw new Error("No data received from server");
      }

      if (data.success) {
        setAppointment(data.appointment);
        return data.appointment;
      } else {
        toast.error(data.message);
        return [];
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message || "Failed to fetch appointments");
      return [];
    } finally {
      setLoading(false);
    }
  }, [aToken, backendUrl]);

  // Get Dashboard Stats
  const getDashboardStats = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${backendUrl}/api/admin/dashboard-stats`, {
        headers: { Authorization: `Bearer ${aToken}` },
      });
      if (data.success) {
        setDashboardStats({
          totalUsers: data.totalUsers,
          totalAppointments: data.totalAppointments,
        });
        return { success: true, stats: data.stats };
      } else {
        toast.error(data.message);
        return { success: false, message: data.message };
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  // Add Doctor
  const addDoctor = async (doctorData) => {
    setLoading(true);
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/admin/add-doctor`,
        doctorData,
        {
          headers: { Authorization: `Bearer ${aToken}` },
        }
      );
      if (data.success) {
        toast.success("Doctor added successfully!");
        await getAllDoctors();
        return { success: true, doctor: data.doctor };
      } else {
        toast.error(data.message);
        return { success: false, message: data.message };
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      toast.error(errorMessage);
      return { success: false, message: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // Update Doctor Images
  const updateDoctorImages = async () => {
    setLoading(true);
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/admin/update-doctor-images`,
        {},
        {
          headers: { Authorization: `Bearer ${aToken}` },
        }
      );
      if (data.success) {
        toast.success(data.message);
        await getAllDoctors();
        return { success: true };
      } else {
        toast.error(data.message);
        return { success: false, message: data.message };
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      toast.error(errorMessage);
      return { success: false, message: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // Check Doctor Images Status
  const checkDoctorImages = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `${backendUrl}/api/admin/check-doctor-images`,
        {
          headers: { Authorization: `Bearer ${aToken}` },
        }
      );
      if (data.success) {
        console.log("Doctor images status:", data);
        toast.info(`Found ${data.brokenImages} broken images out of ${data.totalDoctors} doctors`);
        return { success: true, data };
      } else {
        toast.error(data.message);
        return { success: false, message: data.message };
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      toast.error(errorMessage);
      return { success: false, message: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // Fix All Doctor Images (Comprehensive)
  const fixAllDoctorImages = async () => {
    setLoading(true);
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/admin/fix-all-images`,
        {},
        {
          headers: { Authorization: `Bearer ${aToken}` },
        }
      );
      if (data.success) {
        console.log("Fix all images result:", data);
        toast.success(data.message);
        await getAllDoctors();
        return { success: true, data };
      } else {
        toast.error(data.message);
        return { success: false, message: data.message };
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      toast.error(errorMessage);
      return { success: false, message: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const value = {
    aToken,
    setAToken,
    backendUrl,
    doctors,
    setDoctors,
    appointment,
    setAppointment,
    dashboardStats,
    setDashboardStats,
    loading,
    setLoading,
    doctorLogin,
    adminLogout,
    getAllDoctors,
    changeAvailiblity,
    getAllAppointment,
    getDashboardStats,
    addDoctor,
    updateDoctorImages,
    checkDoctorImages,
    fixAllDoctorImages,
    calculateAge,
  };

  return (
    <AdminContext.Provider
      value={{
        aToken,
        setAToken,
        backendUrl,
        doctors,
        setDoctors,
        appointment,
        setAppointment,
        dashboardStats,
        setDashboardStats,
        loading,
        setLoading,
        doctorLogin,
        adminLogout,
        getAllDoctors,
        changeAvailiblity,
        getAllAppointment,
        getDashboardStats,
        addDoctor,
        updateDoctorImages,
        checkDoctorImages,
        fixAllDoctorImages,
        calculateAge,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;

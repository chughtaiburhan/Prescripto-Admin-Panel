import { useEffect, useContext } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AdminContext } from "./context/AdminContext";
import Navbar from "./component/Navbar";
import Sidebar from "./component/Sidebar";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Admin/Dashboard";
import AllAppointment from "./pages/Admin/AllAppointment";
import AddDoctor from "./pages/Admin/AddDoctor";
import DoctorList from "./pages/Admin/DoctorList";
import Login from "./pages/Login";

const App = () => {
  const { aToken, setAToken } = useContext(AdminContext);

  // Accept token from URL for automatic login
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    if (token) {
      localStorage.setItem("adminToken", token);
      setAToken(token);
      // Remove token from URL
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, [setAToken]);

  // If no token, show login page
  if (!aToken) {
    // Check if user just verified email and is a doctor
    const adminToken = localStorage.getItem("adminToken");
    const adminRole = localStorage.getItem("adminRole");

    if (adminToken && adminRole === "doctor") {
      // User just verified email as doctor, set the token
      setAToken(adminToken);
      return null; // Let the component render
    }

    // Show login page instead of redirecting
    return (
      <div className="bg-[#F8F9FD]">
        <ToastContainer />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Login />} />
        </Routes>
      </div>
    );
  }

  return (
    <div className="bg-[#F8F9FD]">
      <ToastContainer />
      <Navbar />
      <div className="flex items-start">
        <Sidebar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/admin-dashboard" element={<Dashboard />} />
          <Route path="/all-appointment" element={<AllAppointment />} />
          <Route path="/add-doctor" element={<AddDoctor />} />
          <Route path="/doctor-list" element={<DoctorList />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;

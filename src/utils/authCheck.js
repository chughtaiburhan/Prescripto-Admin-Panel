import axios from "axios";
import { toast } from "react-toastify";

const backendUrl =
  import.meta.env.VITE_BACKEND_URL || "http://localhost:3000/api";

export const checkDoctorAuth = async () => {
  // Check if we have URL parameters indicating doctor login
  const urlParams = new URLSearchParams(window.location.search);
  const doctorToken = urlParams.get("doctorToken");
  const doctorEmail = urlParams.get("doctorEmail");

  if (doctorToken && doctorEmail) {
    try {
      // Verify the token with the backend
      const { data } = await axios.post(`${backendUrl}/user/verify-token`, {
        token: doctorToken,
        email: doctorEmail,
      });

      if (data.success && data.userData.role === "doctor") {
        // Store doctor credentials
        localStorage.setItem("adminToken", doctorToken);
        localStorage.setItem("adminRole", "doctor");
        localStorage.setItem("adminUserData", JSON.stringify(data.userData));

        // Clean up URL
        window.history.replaceState(
          {},
          document.title,
          window.location.pathname
        );

        toast.success("Doctor authentication successful!");
        return true;
      }
    } catch (error) {
      console.error("Doctor auth check failed:", error);
    }
  }

  return false;
};

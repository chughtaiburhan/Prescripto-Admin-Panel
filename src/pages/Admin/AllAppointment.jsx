import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";
import { AppContext } from "../../context/AppContext";

const AllAppointment = () => {
  const { aToken, appointment, getAllAppointment } = useContext(AdminContext);
  const { calculateAge } = useContext(AppContext);

 useEffect(() => {
  if (aToken) {
    getAllAppointment();
  }
}, [aToken, getAllAppointment]); // ✅ Now this is safe

  return (
    <div className="w-full max-w-6xl m-5">
      <p className="mb-3 text-lg font-medium">All Appointments</p>
      <div className="bg-white border rounded text-sm max-h-[60vh] overflow-y-scroll">
        <div className="hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] grid-flow-col py-3 px-6 border-b">
          <p>#</p>
          <p>Patient</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Doctor</p>
          <p>Fees</p>
          <p>Actions</p>
        </div>
        {appointment.map((item, index) => (
          <div
            key={item._id}
            className="flex flex-wrap justify-between max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] items-center text-gray-500 py-3 px-6 hover:bg-gray-50"
          >
            <p className="max-sm:hidden">{index + 1}</p>
            <div className="flex items-center gap-2">
              <img
                className="w-8 h-8 object-cover rounded-full"
                src={item.userId?.image || "/default-user-image.png"}
                alt={item.userId?.name || "User"}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/default-user-image.png";
                }}
              />
              <p>{item.userId?.name || "Unknown"}</p>
            </div>
            <p className="max-sm:hidden">
              {item.userId?.dob ? calculateAge(item.userId.dob) : "N/A"}
            </p>
            <p>
              {item.slotDate || "N/A"}, {item.slotTime || ""}
            </p>
            <div className="flex flex-col">
              <p>{item.docId?.name || "Unknown Doctor"}</p>
              <p className="text-xs text-gray-400">
                {item.docId?.speciality || ""}
              </p>
            </div>
            <p>{item.amount || "N/A"}</p>
            <p>
              {item.cancelled ? (
                <span className="text-red-500 text-xs">Cancelled</span>
              ) : item.isCompleted ? (
                <span className="text-green-600 text-xs">Completed</span>
              ) : (
                <span className="text-yellow-600 text-xs">Upcoming</span>
              )}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllAppointment;

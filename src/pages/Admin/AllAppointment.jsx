import { useContext, useEffect, useState } from "react";
import { AdminContext } from "../../context/AdminContext";
import Skeleton from "react-loading-skeleton";
import { assets } from '../../assets/assets_frontend/assets';

// Status Badge Component
const StatusBadge = ({ status }) => {
  const statusStyles = {
    cancelled: 'bg-red-100 text-red-800',
    completed: 'bg-green-100 text-green-800',
    upcoming: 'bg-yellow-100 text-yellow-800',
  };

  const validStatus = status && statusStyles[status] ? status : 'upcoming';

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${statusStyles[validStatus] || 'bg-gray-100 text-gray-800'
      }`}>
      {validStatus.charAt(0).toUpperCase() + validStatus.slice(1)}
    </span>
  );
};

const AllAppointment = () => {
  const { getAllAppointment, calculateAge } = useContext(AdminContext);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasFetchedOnce, setHasFetchedOnce] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const fetchAppointments = async () => {
      try {
        if (!hasFetchedOnce) setLoading(true);
        const data = await getAllAppointment();
        if (isMounted) {
          setAppointments(data);
          setError(null);
          setHasFetchedOnce(true);
        }
      } catch (err) {
        if (isMounted) setError(err.message);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchAppointments();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [getAllAppointment, hasFetchedOnce]);

  // Render loading skeleton row
  const renderSkeletonRow = () => (
    <div className="grid grid-cols-1 sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] gap-4 items-center p-6 border-b bg-white">
      <div className="hidden sm:block"><Skeleton height={20} width={30} /></div>
      <div>
        <Skeleton height={20} width={150} />
        <Skeleton height={15} width={100} />
      </div>
      <div><Skeleton height={20} width={40} /></div>
      <div>
        <Skeleton height={20} width={100} />
        <Skeleton height={15} width={60} />
      </div>
      <div className="flex items-center gap-3">
        <Skeleton circle width={40} height={40} />
        <div>
          <Skeleton width={100} />
          <Skeleton width={70} />
        </div>
      </div>
      <div><Skeleton width={50} /></div>
      <div><Skeleton width={60} /></div>
    </div>
  );

  // Render a single appointment row
  const renderAppointmentRow = (appointment, index) => {
    const user = appointment.userId;
    const doctor = appointment.docId;

    const status = appointment.cancelled
      ? 'cancelled'
      : appointment.isCompleted
        ? 'completed'
        : 'upcoming';

    const slotDate = appointment.slotDate || 'Date Not Available';
    const slotTime = appointment.slotTime || 'Time Not Available';

    const rawAmount = Number(appointment.amount);
    const amount = isNaN(rawAmount) ? '$0.00' : `$${rawAmount.toFixed(2)}`;

    return (
      <div
        key={appointment._id || `${index}-fallback-key`}
        className="grid grid-cols-1 sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] gap-4 items-center p-6 border-b bg-white shadow-sm hover:shadow-lg transition-all duration-200"
      >
        <div className="hidden sm:block text-gray-500 font-semibold">{index + 1}</div>
        <div>
          <p className="font-medium text-gray-900">{user?.name || 'Unknown'}</p>
          <p className="text-sm text-gray-600">{user?.email || 'No email'}</p>
        </div>

        <div className="hidden sm:block text-sm text-gray-600">
          {user?.dob ? calculateAge(user.dob) : 'N/A'}
        </div>
        <div className="text-gray-600">
          <p className="font-medium">{slotDate}</p>
          <p className="text-xs text-gray-500">{slotTime}</p>
        </div>
        <div className="flex items-center gap-3">
          <img
            className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm hidden sm:block"
            src={doctor?.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(doctor?.name || "Doctor")}&background=5f6FFF&color=fff&size=48&rounded=true&bold=true`}
            alt={doctor?.name || 'Doctor'}
            loading="lazy"
            onError={(e) => {
              e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(doctor?.name || "Doctor")}&background=5f6FFF&color=fff&size=48&rounded=true&bold=true`;
            }}
          />
          <div>
            <p className="font-medium text-gray-900">{doctor?.name || 'Unknown Doctor'}</p>
            <p className="text-xs text-gray-500">{doctor?.speciality || 'Speciality Unknown'}</p>
          </div>
        </div>
        <div className="font-medium text-gray-900">{amount}</div>
        <StatusBadge status={status} />
      </div>
    );
  };

  // Render main component UI
  return (
    <div className="relative px-6 sm:px-8 py-8 min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 overflow-hidden">
      {/* 3D Medical Animated Background */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <img src={assets.appointment_img} alt="appointment-bg" className="absolute top-0 left-0 w-1/2 opacity-10 blur-lg animate-pulse" />
        <img src={assets.group_profiles} alt="group-bg" className="absolute bottom-0 right-0 w-1/3 opacity-10 blur-md animate-bounce" />
        <img src={assets.Dermatologist} alt="derm-bg" className="absolute top-1/3 left-1/4 w-32 opacity-10 animate-spin-slow" />
        <img src={assets.Pediatricians} alt="ped-bg" className="absolute bottom-10 left-1/3 w-24 opacity-10 animate-bounce" />
      </div>
      <div className="bg-white/90 rounded-3xl shadow-2xl overflow-hidden border border-blue-100 backdrop-blur-md">
        <div className="px-8 py-6 border-b bg-gradient-to-r from-blue-100 via-white to-purple-100 flex items-center justify-between">
          <h2 className="text-3xl font-extrabold text-blue-900 tracking-tight drop-shadow-lg flex items-center gap-3">
            <svg className="w-8 h-8 text-blue-400 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
            All Appointments <span className="ml-2 text-lg font-semibold text-blue-500">({appointments.length})</span>
          </h2>
        </div>
        {loading && !hasFetchedOnce ? (
          Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="p-4 border-b bg-gradient-to-r from-blue-50 via-white to-purple-50">
              {renderSkeletonRow()}
            </div>
          ))
        ) : error ? (
          <div className="p-6 text-center text-red-600 bg-red-50">
            {error} - Please try again later.
          </div>
        ) : appointments.length > 0 ? (
          <div className="divide-y bg-gradient-to-r from-blue-50 via-white to-purple-50">
            <div className="hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] gap-4 p-4 bg-blue-100/60 text-sm font-bold text-blue-700 rounded-t-2xl shadow">
              <div>#</div>
              <div>Patient</div>
              <div>Age</div>
              <div>Date & Time</div>
              <div>Doctor</div>
              <div>Fees</div>
              <div>Status</div>
            </div>
            {appointments.map(renderAppointmentRow)}
          </div>
        ) : (
          <div className="p-8 text-center text-blue-400 flex flex-col items-center gap-4">
            <img src={assets.appointment_img} alt="no-appointments" className="w-32 opacity-30 animate-pulse" />
            <span className="text-xl font-semibold">No appointments found.</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllAppointment;

import { useContext, useEffect, useState } from "react";
import { AdminContext } from "../../context/AdminContext";
import Skeleton from "react-loading-skeleton";

// Status Badge Component
const StatusBadge = ({ status }) => {
  const statusStyles = {
    cancelled: 'bg-red-100 text-red-800',
    completed: 'bg-green-100 text-green-800',
    upcoming: 'bg-yellow-100 text-yellow-800',
  };

  const validStatus = status && statusStyles[status] ? status : 'upcoming';

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
      statusStyles[validStatus] || 'bg-gray-100 text-gray-800'
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
            src={doctor?.image || '/default-doctor.png'}
            alt={doctor?.name || 'Doctor'}
            loading="lazy"
            onError={(e) => (e.target.src = '/default-doctor.png')}
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
    <div className="px-6 sm:px-8 py-8">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="px-6 py-4 border-b bg-gray-50">
          <h2 className="text-2xl font-semibold text-gray-900">
            All Appointments ({appointments.length})
          </h2>
        </div>

        {loading && !hasFetchedOnce ? (
          Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="p-4 border-b bg-gray-50">
              {renderSkeletonRow()}
            </div>
          ))
        ) : error ? (
          <div className="p-6 text-center text-red-600 bg-red-50">
            {error} - Please try again later.
          </div>
        ) : appointments.length > 0 ? (
          <div className="divide-y bg-gray-50">
            <div className="hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] gap-4 p-4 bg-gray-200 text-sm font-medium text-gray-600">
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
          <div className="p-6 text-center text-gray-500">No appointments found.</div>
        )}
      </div>
    </div>
  );
};

export default AllAppointment;

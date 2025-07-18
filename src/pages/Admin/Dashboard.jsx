import React, { useEffect, useContext, useState, Suspense, lazy } from "react";
import { AdminContext } from "../../context/AdminContext";
import { toast } from "react-toastify";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const StatCard = lazy(() => import("./StatCard"));

const Dashboard = () => {
  const { dashboardStats, getDashboardStats, doctors, appointment, getAllDoctors, getAllAppointment } = useContext(AdminContext);
  const [userRole, setUserRole] = useState("");
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeDashboard = async () => {
      setLoading(true);
      try {
        await Promise.all([
          getDashboardStats(),
          getAllDoctors(),
          getAllAppointment()
        ]);
      } catch (error) {
        console.error("Dashboard initialization error:", error);
      } finally {
        setLoading(false);
      }
    };

    initializeDashboard();

    // Get user role and data from localStorage (admin panel keys)
    const role = localStorage.getItem("adminRole");
    const userDataStr = localStorage.getItem("adminUserData");

    setUserRole(role || "admin");
    if (userDataStr) {
      setUserData(JSON.parse(userDataStr));
    }
  }, []);

  const getWelcomeMessage = () => {
    return "Welcome back, Admin!";
  };

  const getCurrentTime = () => {
    const now = new Date();
    return now.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const getCurrentDate = () => {
    const now = new Date();
    return now.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getRecentAppointments = () => {
    if (!appointment || appointment.length === 0) return [];
    return appointment.slice(0, 5); // Get last 5 appointments
  };

  const getAvailableDoctors = () => {
    if (!doctors || doctors.length === 0) return 0;
    return doctors.filter(doctor => doctor.available).length;
  };

  const getTotalDoctors = () => {
    return doctors ? doctors.length : 0;
  };

  const getPendingAppointments = () => {
    if (!appointment || appointment.length === 0) return 0;
    return appointment.filter(apt => apt.status === 'pending').length;
  };

  const getCompletedAppointments = () => {
    if (!appointment || appointment.length === 0) return 0;
    return appointment.filter(apt => apt.status === 'completed').length;
  };

  if (loading) {
    return (
      <div className="p-6 bg-gray-50 min-h-screen">
        {/* Header Section Skeleton */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <Skeleton height={36} width={260} className="mb-2" />
              <Skeleton height={20} width={180} />
            </div>
            <div className="mt-4 md:mt-0">
              <Skeleton height={64} width={120} className="rounded-lg" />
            </div>
          </div>
        </div>
        {/* Stats Cards Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[1, 2, 3, 4].map(i => (
            <Skeleton key={i} height={110} className="rounded-xl" />
          ))}
        </div>
        {/* Main Content Grid Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Appointments Skeleton */}
          <div className="lg:col-span-2">
            <Skeleton height={220} className="rounded-xl" />
          </div>
          {/* Appointment Status & System Status Skeleton */}
          <div className="flex flex-col gap-6">
            <Skeleton height={110} className="rounded-xl" />
            <Skeleton height={110} className="rounded-xl" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, Admin!</h1>
            <p className="text-gray-600">
              {/* Date and Time */}
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <div className="bg-white rounded-lg shadow-sm p-4">
              <p className="text-sm text-gray-600">Role</p>
              <p className="font-semibold text-gray-900">Admin</p>
            </div>
          </div>
        </div>
      </div>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Suspense fallback={<Skeleton height={128} className="rounded-xl" />}>
          <StatCard title="Total Users" value={dashboardStats.totalUsers} subtitle="Registered patients" color="border-blue-500" icon={<svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" /></svg>} />
        </Suspense>
        <Suspense fallback={<Skeleton height={128} className="rounded-xl" />}>
          <StatCard title="Total Appointments" value={dashboardStats.totalAppointments} subtitle="All time bookings" color="border-green-500" icon={<svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>} />
        </Suspense>
        <Suspense fallback={<Skeleton height={128} className="rounded-xl" />}>
          <StatCard title="Available Doctors" value={doctors.filter(doc => doc.available).length} subtitle={`of ${doctors.length} total`} color="border-purple-500" icon={<svg className="w-6 h-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>} />
        </Suspense>
        <Suspense fallback={<Skeleton height={128} className="rounded-xl" />}>
          <StatCard title="Pending Appointments" value={appointment.filter(apt => apt.status === 'pending').length} subtitle="Awaiting confirmation" color="border-orange-500" icon={<svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>} />
        </Suspense>
      </div>
      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Appointments */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Recent Appointments</h2>
              <span className="text-sm text-gray-500">
                {appointment ? appointment.length : 0} total
              </span>
            </div>

            {getRecentAppointments().length > 0 ? (
              <div className="space-y-4">
                {getRecentAppointments().map((apt, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          {apt.patientName || apt.userName || "Patient"}
                        </p>
                        <p className="text-sm text-gray-600">
                          {apt.doctorName || "Doctor"} • {apt.speciality || "General"}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${apt.status === 'completed' ? 'bg-green-100 text-green-800' :
                        apt.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                        {apt.status || 'pending'}
                      </span>
                      <p className="text-xs text-gray-500 mt-1">
                        {apt.date ? new Date(apt.date).toLocaleDateString() : 'N/A'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="text-gray-500">No appointments found</p>
              </div>
            )}
          </div>
        </div>

        {/* Stats & System Info */}
        <div className="space-y-6">

          {/* Additional Stats */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Appointment Status</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Completed</span>
                <span className="font-semibold text-green-600">{getCompletedAppointments()}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Pending</span>
                <span className="font-semibold text-yellow-600">{getPendingAppointments()}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Total Doctors</span>
                <span className="font-semibold text-blue-600">{getTotalDoctors()}</span>
              </div>
            </div>
          </div>

          {/* System Status */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">System Status</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Backend</span>
                <span className="flex items-center text-green-600">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  Online
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Database</span>
                <span className="flex items-center text-green-600">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  Connected
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Last Updated</span>
                <span className="text-xs text-gray-500">{getCurrentTime()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

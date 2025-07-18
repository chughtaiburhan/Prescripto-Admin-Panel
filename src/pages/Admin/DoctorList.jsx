import React, { useContext, useEffect, useState, Suspense, lazy } from "react";
import { AdminContext } from "../../context/AdminContext";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { assets } from '../../assets/assets_frontend/assets';

const DoctorCard = lazy(() => import("./DoctorCard"));

const DoctorList = () => {
  const { doctors, aToken, getAllDoctors, changeAvailiblity, updateDoctorImages, checkDoctorImages, fixAllDoctorImages } =
    useContext(AdminContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (aToken) {
      setLoading(true);
      getAllDoctors().finally(() => setLoading(false));
    }
  }, [aToken]);

  // Debug: Log doctors data when it changes
  useEffect(() => {
    if (doctors.length > 0) {
      console.log("Doctors data received:", doctors);
      doctors.forEach((doctor, index) => {
        console.log(`Doctor ${index + 1}:`, {
          name: doctor.name,
          email: doctor.email,
          speciality: doctor.speciality,
          experience: doctor.experience,
          description: doctor.description,
          available: doctor.available
        });
      });
    }
  }, [doctors]);

  const renderSkeletonCard = () => (
    <div className="border border-indigo-200 rounded-xl p-4">
      <Skeleton height={20} width={150} />
      <Skeleton height={15} width={200} className="mt-2" />
      <Skeleton height={15} width={100} className="mt-2" />
      <Skeleton height={15} width={250} className="mt-2" />
      <div className="mt-3 flex items-center gap-2">
        <Skeleton circle width={16} height={16} />
        <Skeleton height={15} width={70} />
      </div>
    </div>
  );

  return (
    <div className="relative m-5 max-h-[90vh] overflow-y-scroll">
      {/* 3D Animated Medical Background */}
      <div className="absolute inset-0 -z-10 animate-pulse pointer-events-none">
        <img src={assets.header_img} alt="medical-bg" className="absolute top-0 left-0 w-1/2 opacity-20 blur-lg" />
        <img src={assets.group_profiles} alt="medical-bg2" className="absolute bottom-0 right-0 w-1/3 opacity-10 blur-md" />
        <img src={assets.Dermatologist} alt="derm-bg" className="absolute top-1/2 left-1/4 w-32 opacity-10 animate-bounce" />
        <img src={assets.Pediatricians} alt="ped-bg" className="absolute bottom-10 left-1/3 w-24 opacity-10 animate-spin-slow" />
      </div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-blue-800 drop-shadow">Doctor List</h1>
      </div>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading
          ? Array(6).fill(0).map((_, idx) => <div key={idx}>{renderSkeletonCard()}</div>)
          : doctors.map((item, index) => (
            <Suspense fallback={<div>{renderSkeletonCard()}</div>} key={item._id || index}>
              <DoctorCard item={item} changeAvailiblity={changeAvailiblity} assets={assets} />
            </Suspense>
          ))}
      </div>
      {/* Debug info */}
      {!loading && doctors.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">No doctors found</p>
        </div>
      )}
      {!loading && doctors.length > 0 && (
        <div className="mt-4 text-xs text-gray-500 text-center">
          Total doctors: {doctors.length}
        </div>
      )}
    </div>
  );
};

export default DoctorList;

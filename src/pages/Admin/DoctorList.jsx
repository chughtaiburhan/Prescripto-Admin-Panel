import React, { useContext, useEffect, useState } from "react";
import { AdminContext } from "../../context/AdminContext";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const DoctorList = () => {
  const { doctors, aToken, getAllDoctors, changeAvailiblity } =
    useContext(AdminContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (aToken) {
      setLoading(true);
      getAllDoctors().finally(() => setLoading(false));
    }
  }, [aToken]);

  const renderSkeletonCard = () => (
    <div className="border border-indigo-200 rounded-xl max-w-56 overflow-hidden">
      <Skeleton height={140} />
      <div className="p-4">
        <Skeleton height={20} width={100} />
        <Skeleton height={15} width={80} className="mt-2" />
        <div className="mt-3 flex items-center gap-2">
          <Skeleton circle width={16} height={16} />
          <Skeleton height={15} width={70} />
        </div>
      </div>
    </div>
  );

  return (
    <div className="m-5 max-h-[90vh] overflow-y-scroll">
      <h1 className="text-lg font-medium mb-4">All Doctors</h1>
      <div className="w-full flex flex-wrap gap-4 gap-y-6">
        {loading
          ? Array(6).fill(0).map((_, idx) => <div key={idx}>{renderSkeletonCard()}</div>)
          : doctors.map((item, index) => (
              <div
                className="border border-indigo-200 rounded-xl max-w-56 overflow-hidden cursor-pointer"
                key={index}
              >
                <img
                  className="bg-indigo-50 group-hover:bg-[#5f6FFF] transition-all duration-500 w-full h-36 object-cover"
                  src={item.image}
                  alt={item.name}
                  onError={(e) => {
                    e.target.src = "/default-doctor.png";
                  }}
                />
                <div className="p-4">
                  <p className="text-neutral-800 text-lg font-medium">
                    {item.name}
                  </p>
                  <p className="text-zinc-600 text-sm">{item.speciality}</p>
                  <div className="mt-2 flex items-center gap-1 text-sm">
                    <input
                      onChange={() => changeAvailiblity(item._id)}
                      type="checkbox"
                      checked={item.available}
                    />
                    <p>Available</p>
                  </div>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
};

export default DoctorList;

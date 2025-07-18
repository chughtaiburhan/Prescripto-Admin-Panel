import React from "react";

const DoctorCard = ({ item, changeAvailiblity, assets }) => {
    return (
        <div
            className="relative border border-indigo-200 rounded-2xl p-5 cursor-pointer hover:shadow-2xl transition-shadow bg-white group overflow-hidden"
        >
            {/* Doctor Image */}
            <div className="flex justify-center mb-4">
                <img
                    src={item.image || assets.profile_pic}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded-full border-4 border-blue-200 shadow-lg group-hover:scale-105 transition-transform bg-white"
                />
            </div>
            {/* Specialty Badge */}
            <div className="absolute top-4 right-4 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-bold shadow">
                {item.speciality}
            </div>
            <h3 className="text-lg font-bold text-neutral-800 mb-1 text-center">{item.name}</h3>
            <p className="text-zinc-600 text-sm mb-2 text-center">
                <span className="font-medium">Email:</span> {item.email}
            </p>
            <p className="text-zinc-600 text-sm mb-2 text-center">
                <span className="font-medium">Experience:</span> {item.experience}
            </p>
            <p className="text-zinc-600 text-sm mb-2 text-center">
                <span className="font-medium">Degree:</span> {item.degree}
            </p>
            <p className="text-zinc-600 text-sm mb-2 text-center">
                <span className="font-medium">Fees:</span> PKR {item.fees}
            </p>
            {item.about && (
                <p className="text-zinc-500 text-xs mb-2 text-center italic">{item.about.slice(0, 80)}{item.about.length > 80 ? '...' : ''}</p>
            )}
            <div className="flex justify-center gap-2 mt-2">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${item.available
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                    }`}>
                    {item.available ? 'Available' : 'Unavailable'}
                </span>
                <input
                    onChange={() => changeAvailiblity(item._id)}
                    type="checkbox"
                    checked={item.available}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 ml-2"
                />
                <span className="text-gray-700 text-xs">Available</span>
            </div>
        </div>
    );
};

export default DoctorCard; 
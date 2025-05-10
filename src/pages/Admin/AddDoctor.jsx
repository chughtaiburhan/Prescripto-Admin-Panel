import React, { useContext, useState } from "react";
import { assets } from "../../assets/assets_frontend/assets";
import { toast } from "react-toastify";
import { AdminContext } from "../../context/AdminContext";
import axios from "axios";

const AddDoctor = () => {
  const [doctorImage, setDoctorImage] = useState(null);
  const [doctorName, setDoctorName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [experience, setExperience] = useState("");
  const [fees, setFees] = useState("");
  const [speciality, setSpeciality] = useState("");
  const [degree, setDegree] = useState("");
  const [addressLine1, setAddressLine1] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [about, setAbout] = useState("");

  const { backendUrl, aToken } = useContext(AdminContext);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      if (!doctorImage) {
        return toast.error("Doctor image is required!");
      }

      const formData = new FormData();
      formData.append("image", doctorImage);
      formData.append("name", doctorName);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("experience", experience);
      formData.append("fees", fees);
      formData.append("speciality", speciality);
      formData.append("degree", degree);
      formData.append(
        "address",
        JSON.stringify(`${addressLine1}, ${addressLine2}`)
      );
      formData.append("about", about);

      const { data } = await axios.post(
        `${backendUrl}/admin/add-doctor`,
        formData,
        {
          headers: { aToken },
        }
      );

      console.info("This is frontend Data : ", data);
      toast.success(data.message || "Doctor added successfully!");

      // Reset form after successful submit
      setDoctorImage(null);
      setDoctorName("");
      setEmail("");
      setPassword("");
      setExperience("");
      setFees("");
      setSpeciality("");
      setDegree("");
      setAddressLine1("");
      setAddressLine2("");
      setAbout("");
    } catch (error) {
      console.error("Submit Error:", error);
      const msg =
        error.response?.data?.message || "Server error! Please try again.";
      toast.error(msg);
    }
  };

  return (
    <form className="p-6 md:p-10 w-full" onSubmit={onSubmitHandler}>
      <h2 className="text-3xl font-bold mb-8 text-gray-800">Add New Doctor</h2>

      <div className="bg-white px-6 py-8 border rounded-xl shadow-lg w-full max-w-5xl max-h-[85vh] overflow-y-auto space-y-10">
        {/* Image Upload */}
        <div className="flex items-center gap-6">
          <label htmlFor="doc-img" className="cursor-pointer">
            <img
              className="w-24 h-24 object-cover bg-gray-100 rounded-full border-2 hover:shadow-lg transition"
              src={
                doctorImage
                  ? URL.createObjectURL(doctorImage)
                  : assets.upload_icon
              }
              alt="Upload Doctor"
            />
          </label>
          <input
            type="file"
            id="doc-img"
            hidden
            onChange={(e) => setDoctorImage(e.target.files[0])}
          />
          <div>
            <p className="text-sm font-semibold text-gray-700">
              Upload Doctor's Picture
            </p>
            <p className="text-xs text-gray-500">
              JPG, PNG only — Max size 2MB
            </p>
          </div>
        </div>

        {/* Form Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Column 1 */}
          <div className="flex flex-col gap-5">
            <div>
              <label className="text-sm font-medium text-gray-700">
                Doctor Name
              </label>
              <input
                type="text"
                placeholder="Enter name"
                className="input-style focus:ring-2 focus:ring-blue-400"
                value={doctorName}
                onChange={(e) => setDoctorName(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                placeholder="Enter email"
                className="input-style focus:ring-2 focus:ring-blue-400"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter password"
                className="input-style focus:ring-2 focus:ring-blue-400"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">
                Experience
              </label>
              <select
                className="input-style focus:ring-2 focus:ring-blue-400"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                required
              >
                <option value="">Select Experience</option>
                {Array.from({ length: 30 }, (_, i) => (
                  <option key={i} value={`${i + 1} years`}>
                    {i + 1} Year{i + 1 > 1 && "s"}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">
                Fees (in PKR)
              </label>
              <input
                type="number"
                placeholder="e.g. 1500"
                className="input-style focus:ring-2 focus:ring-blue-400"
                value={fees}
                onChange={(e) => setFees(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Column 2 */}
          <div className="flex flex-col gap-5">
            <div>
              <label className="text-sm font-medium text-gray-700">
                Speciality
              </label>
              <select
                className="input-style focus:ring-2 focus:ring-blue-400"
                value={speciality}
                onChange={(e) => setSpeciality(e.target.value)}
                required
              >
                <option value="">Select Speciality</option>
                <option>Cardiologist</option>
                <option>General Physician</option>
                <option>Gynecologist</option>
                <option>Dermatologist</option>
                <option>Pediatrician</option>
                <option>Neurologist</option>
                <option>Gastroenterologist</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">
                Degree / Education
              </label>
              <input
                type="text"
                placeholder="e.g. MBBS, MD"
                className="input-style focus:ring-2 focus:ring-blue-400"
                value={degree}
                onChange={(e) => setDegree(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">
                Address
              </label>
              <input
                type="text"
                placeholder="Address Line 1"
                className="input-style focus:ring-2 focus:ring-blue-400"
                value={addressLine1}
                onChange={(e) => setAddressLine1(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Address Line 2"
                className="input-style mt-2 focus:ring-2 focus:ring-blue-400"
                value={addressLine2}
                onChange={(e) => setAddressLine2(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* About Doctor */}
        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 block">
            About Doctor
          </label>
          <textarea
            placeholder="Write a short bio or description"
            rows={4}
            className="w-full border rounded-lg px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300 resize-none"
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            required
          />
        </div>

        {/* Submit */}
        <div className="text-right">
          <button
            type="submit"
            className="bg-blue-600 text-white px-8 py-2.5 rounded-lg hover:bg-blue-700 transition font-medium shadow-md"
          >
            Add Doctor
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddDoctor;

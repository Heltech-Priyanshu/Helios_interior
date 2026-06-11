import { useEffect, useState } from "react";
import { companyDetails } from "../../services/api";
import { IoMdAddCircle } from "react-icons/io";
import { MdDeleteForever } from "react-icons/md";
import axios from "axios";
import { API_URL } from "../../config/config";
import { toast } from "react-toastify";

function CompanyDetails() {
  const [formData, setFormData] = useState({
    company_name: "",
    email: [""],
    phone: [""],
    address: "",
    copy_right: "",
    office_hour_time: "",
    office_day: "",
    logo: null,
    fav_icon: null,
  });
  const [companyId, setCompanyId] = useState(null);
  const [previewlogo, setpreviewlogo] = useState("");
  const [previewfav, setpreviewfav] = useState("");

  const handleGetCompany = async () => {
    try {
      const res = await axios.get(companyDetails.getCompany);
      const company = res.data.company;
      setFormData({
        company_name: company.company_name || "",
        email: JSON.parse(company.email) || [""],
        phone: JSON.parse(company.phone) || [""],
        address: company.address || "",
        copy_right: company.copy_right || "",
        office_hour_time: company.office_hour_time || "",
        office_day: company.office_day || "",
        // logo: company.logo || null,
        // fav_icon: company.fav_icon || null,
      });
      setpreviewlogo(company.logo);
      setpreviewfav(company.fav_icon);
      toast.success("Company Details Fetched Successfully ✅");

      setCompanyId(company.id);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong ❌");
    }
  };

  useEffect(() => {
    handleGetCompany();
  }, []);

  // Normal Input Change
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files) {
      setFormData({
        ...formData,
        [name]: files[0],
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  // Add Dynamic Field
  const addField = (field) => {
    setFormData({
      ...formData,
      [field]: [...formData[field], ""],
    });
  };

  // Remove Dynamic Field
  const removeField = (field, index) => {
    const updatedFields = formData[field].filter((_, i) => i !== index);

    setFormData({
      ...formData,
      [field]: updatedFields,
    });
  };

  // Dynamic Input Change
  const handleArrayChange = (field, index, value) => {
    const updatedFields = [...formData[field]];
    updatedFields[index] = value;

    setFormData({
      ...formData,
      [field]: updatedFields,
    });
  };

  const handelSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();

    data.append("company_name", formData.company_name);
    data.append("email", JSON.stringify(formData.email));
    data.append("phone", JSON.stringify(formData.phone));
    data.append("address", formData.address);
    data.append("copy_right", formData.copy_right);
    data.append("office_hour_time", formData.office_hour_time);
    data.append("office_day", formData.office_day);
    data.append("company_logo", formData.logo);
    data.append("company_favicon", formData.fav_icon);

    try {
      // CREATE
      if (!companyId) {
        const res = await axios.post(companyDetails.createCompany, data);

        // save id after create
        setCompanyId(res.data.company.id);

        await handleGetCompany();

        toast.success("Company Created Successfully ✅");
      }

      // UPDATE
      else {
        const res = await axios.put(
          `${companyDetails.updateCompany}/${companyId}`,
          data,
        );


        await handleGetCompany();

        toast.success( res?.data?.message || "Company Updated Successfully ✅");
      }
    } catch (error) {

      toast.error(error?.response?.data?.message || "Something went wrong ❌");
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-100 flex justify-center items-center p-10">
      <form
        onSubmit={handelSubmit}
        className="w-full max-w-4xl bg-white shadow-xl rounded-2xl p-8"
      >
        <h2 className="text-3xl font-bold mb-8">Company Details Form</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Company Name */}
          <div>
            <label className="block mb-2 font-semibold">Company Name</label>

            <input
              type="text"
              name="company_name"
              value={formData.company_name}
              onChange={handleChange}
              placeholder="Enter company name"
              className="w-full border border-gray-300 rounded-lg p-3"
            />
          </div>

          {/* Address */}
          <div>
            <label className="block mb-2 font-semibold">Address</label>

            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter address"
              className="w-full border border-gray-300 rounded-lg p-3"
            />
          </div>

          {/* Phone */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="font-semibold">Phone</label>

              <button type="button" onClick={() => addField("phone")}>
                <IoMdAddCircle
                  style={{
                    fontSize: "28px",
                    color: "green",
                  }}
                />
              </button>
            </div>

            {formData.phone.map((phone, index) => (
              <div key={index} className="flex items-center gap-2 mb-2">
                <input
                  type="text"
                  value={phone}
                  onChange={(e) =>
                    handleArrayChange("phone", index, e.target.value)
                  }
                  placeholder="Enter phone"
                  className="w-full border border-gray-300 rounded-lg p-3"
                />

                {formData.phone.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeField("phone", index)}
                  >
                    <MdDeleteForever
                      style={{
                        fontSize: "28px",
                        color: "red",
                      }}
                    />
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Email */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="font-semibold">Email</label>

              <button type="button" onClick={() => addField("email")}>
                <IoMdAddCircle
                  style={{
                    fontSize: "28px",
                    color: "green",
                  }}
                />
              </button>
            </div>

            {formData.email.map((email, index) => (
              <div key={index} className="flex items-center gap-2 mb-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) =>
                    handleArrayChange("email", index, e.target.value)
                  }
                  placeholder="Enter email"
                  className="w-full border border-gray-300 rounded-lg p-3"
                />

                {formData.email.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeField("email", index)}
                  >
                    <MdDeleteForever
                      style={{
                        fontSize: "28px",
                        color: "red",
                      }}
                    />
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Copyright */}
          <div>
            <label className="block mb-2 font-semibold">Copyright</label>

            <input
              type="text"
              name="copy_right"
              value={formData.copy_right}
              onChange={handleChange}
              placeholder="Enter copyright"
              className="w-full border border-gray-300 rounded-lg p-3"
            />
          </div>

          {/* Office Hour Time */}
          <div>
            <label className="block mb-2 font-semibold">Office Hour Time</label>

            <input
              type="text"
              name="office_hour_time"
              value={formData.office_hour_time}
              onChange={handleChange}
              placeholder="10AM - 7PM"
              className="w-full border border-gray-300 rounded-lg p-3"
            />
          </div>

          {/* Office Day */}
          <div>
            <label className="block mb-2 font-semibold">Office Day</label>

            <input
              type="text"
              name="office_day"
              value={formData.office_day}
              onChange={handleChange}
              placeholder="Mon - Sat"
              className="w-full border border-gray-300 rounded-lg p-3"
            />
          </div>

          {/* Logo */}
          <div>
            <label className="block mb-2 font-semibold">Logo</label>

            <input
              type="file"
              name="logo"
              accept="image/*"
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-3"
            />
          </div>

          {/* Favicon */}
          <div className="flex items-end gap-6">
            {/* File Input */}
            <div className="flex-1">
              <label className="block mb-2 font-semibold">Favicon</label>

              <input
                type="file"
                name="fav_icon"
                accept="image/*"
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-3"
              />
            </div>

            {/* Favicon Preview */}
            <div className="w-[100px] h-[100px] border border-gray-300 rounded-lg p-2">
              <img
                src={`${API_URL}${previewfav}`}
                alt="Favicon"
                className="w-full h-full object-contain"
              />
            </div>

            {/* Logo Preview */}
            <div className="w-[100px] h-[100px] border border-gray-300 rounded-lg p-2">
              <img
                src={`${API_URL}${previewlogo}`}
                alt="Logo"
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="mt-8 bg-black text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default CompanyDetails;

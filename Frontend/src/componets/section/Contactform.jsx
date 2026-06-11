import React, { useEffect } from "react";
import { contactDetails, companyDetails } from "../../services/api";
import axios from "axios"


const Contactform = () => {

  const [formData, setFormData] = React.useState({
    first_name: "",
    last_name: "",
    phone: "",
    email: "",
    message: "",
  });
  const [contactInfo, setContactInfo] = React.useState({
    phone: [],
    email: [],
    office_days: "",
    office_hour_time: "",
    work_hours: "",
  })

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
       const res = await axios.post(contactDetails.createContact, formData);
       console.log(res);
     } catch (error) {
       console.error("Error submitting contact form:", error);
     }
  }

  useEffect(() => {
    const handleContactInfo = async () => {
      try {
        const res = await axios.get(companyDetails.getCompany);
        console.log("this is the data", res?.data?.company);
        const company = res?.data?.company || {};
        setContactInfo({
          ...company,
          phone: JSON.parse(company.phone || "[]"),
          email: JSON.parse(company.email || "[]"),
        });
        
      } catch (error) {
        console.error("Error fetching contact info:", error);
      }
    }
    handleContactInfo();
  }, [])


  return (
    <div className="w-full bg-[#fcfcfc] py-20 px-6 flex justify-center font-serif">
      <div className="max-w-[1600px]    w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-stretch">
        {/* LEFT COLUMN: Contact Information */}
        <div className="flex flex-col justify-center">
          <h2 className="text-4xl md:text-[44px] font-serif text-black mb-4">
            Meet the Designer
          </h2>
          <p className="text-gray-800 text-[17px] leading-relaxed mb-12 max-w-md">
            Ready to transform your space? Let's discuss your project and bring
            your vision to life.
          </p>

          <h3 className="text-2xl font-serif text-black mb-8">
            Contact Information
          </h3>

          <div className="flex flex-col gap-8">
            {/* Phone */}
            <div className="flex items-start gap-4">
              <svg
                className="w-6 h-6 mt-1 text-[#b59a76]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              <div>
                <h4 className="text-[19px] text-[#b59a76] font-serif mb-2">
                  Phone
                </h4>
                <div className="text-gray-800 text-[15px] font-sans">
                  {contactInfo.phone.map((phone, index) => (
                    <p key={index}>{phone}</p>
                  ))}
                </div>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-start gap-4">
              <svg
                className="w-6 h-6 mt-1 text-[#b59a76]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <div>
                <h4 className="text-[19px] text-[#b59a76] font-serif mb-2">
                  Email
                </h4>
                <div className="text-gray-800 text-[15px] font-sans mb-1">
                  {contactInfo.email.map((email, index) => (
                    <p key={index}>{email}</p>
                  ))}
                </div>
              </div>
            </div>

            {/* Location (Labeled as Phone in design, assuming typo, treating as Location) */}
            <div className="flex items-start gap-4">
              <svg
                className="w-6 h-6 mt-1 text-[#b59a76]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
              <div>
                <h4 className="text-[19px] text-[#b59a76] font-serif mb-2">
                  Location
                </h4>
                <p className="text-gray-800 text-[15px] font-sans leading-relaxed max-w-[280px]">
                  Unit - T2/8C, Millennium City IT Park, Sector V, Salt Lake,
                  Kolkata - 700091, West Bengal, INDIA
                </p>
              </div>
            </div>

            {/* Work Hours */}
            <div className="flex items-start gap-4">
              <svg
                className="w-6 h-6 mt-1 text-[#b59a76]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <div>
                <h4 className="text-[19px] text-[#b59a76] font-serif mb-2">
                  Work
                </h4>
                <div className="flex justify-between gap-8 mb-1">
                  <span className="text-gray-800 text-[15px] font-sans">
                    {contactInfo?.office_day || ""}
                  </span>
                  <span className="text-gray-800 text-[15px] font-sans text-right">
                    {contactInfo?.office_hour_time || ""}
                  </span>
                </div>
                <div className="flex justify-between gap-8">
                  <span className="text-gray-800 text-[15px] font-sans">
                    Sunday
                  </span>
                  <span className="text-gray-800 text-[15px] font-sans text-right">
                    By Appointment
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Form over Image */}
        <div className="relative rounded-lg  w-full min-h-[600px] lg:h-auto flex items-center justify-center p-6 lg:p-12 overflow-hidden">
          <div className="absolute inset-0 w-full h-full">
            <img
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80"
              alt="City Buildings"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/10"></div>
          </div>

          {/* Form Card */}
          <div className="relative z-10 bg-white w-full max-w-[460px] p-8 shadow-xl">
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-4 font-sans"
            >
              <input
                type="text"
                placeholder="First Name"
                value={formData.first_name}
                onChange={(e) =>
                  setFormData({ ...formData, first_name: e.target.value })
                }
                className="w-full border border-gray-300 px-4 py-3 text-[15px] text-gray-800 focus:outline-none focus:border-[#b59a76] placeholder-gray-400"
              />

              <input
                type="text"
                placeholder="Last Name"
                value={formData.last_name}
                onChange={(e) =>
                  setFormData({ ...formData, last_name: e.target.value })
                }
                className="w-full border border-gray-300 px-4 py-3 text-[15px] text-gray-800 focus:outline-none focus:border-[#b59a76] placeholder-gray-400"
              />

              <div className="flex border border-gray-300 focus-within:border-[#b59a76]">
                <span className="px-4 py-3 text-gray-400 text-[15px] bg-gray-50 border-r border-gray-300">
                  +91
                </span>
                <input
                  type="tel"
                  placeholder="Mobile No"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className="w-full px-4 py-3 text-[15px] text-gray-800 focus:outline-none placeholder-gray-400"
                />
              </div>

              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full border border-gray-300 px-4 py-3 text-[15px] text-gray-800 focus:outline-none focus:border-[#b59a76] placeholder-gray-400"
              />

              <textarea
                placeholder="Tell us about project"
                rows="4"
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                className="w-full border border-gray-300 px-4 py-3 text-[15px] text-gray-800 focus:outline-none focus:border-[#b59a76] placeholder-gray-400 resize-none"
              ></textarea>

              <div className="flex items-center gap-2 mt-2 mb-4">
                <input
                  type="checkbox"
                  id="whatsapp"
                  className="w-4 h-4 text-[#b59a76] border-gray-300 rounded focus:ring-[#b59a76]"
                />
                <label
                  htmlFor="whatsapp"
                  className="text-[14px] text-gray-400 flex items-center gap-1 cursor-pointer"
                >
                  You Can Reach Me On
                  <span className="text-green-500 font-medium flex items-center gap-1">
                    <svg
                      className="w-4 h-4"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    WhatsApp
                  </span>
                </label>
              </div>

              <button
                type="submit"
                className="w-full bg-[#b59a76] hover:bg-[#a08665] text-white font-serif text-[17px] py-3.5 transition-colors duration-300"
              >
                Talk To Our Designer
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contactform;

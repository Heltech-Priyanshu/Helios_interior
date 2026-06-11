import React, { useEffect, useState } from "react";
import {  companyDetails } from "../../services/api";
import axios from "axios";
import {
  FaInstagram,
  FaLinkedinIn,
  FaArrowRight,
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhoneAlt,
} from "react-icons/fa";


const Footer = () => {

const [contactInfo, setContactInfo] = useState({
    phone: [],
    email: [],
    office_days: "",
    office_hour_time: "",
    work_hours: "",
  })

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
    <>
     

      <footer className="relative overflow-hidden bg-[#111111] text-white">
        {/* Background Glow */}
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#8b6b47]/20 blur-[140px] rounded-full"></div>
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#d4b48c]/10 blur-[120px] rounded-full"></div>

        {/* Main Section */}
        <div className="relative z-10 max-w-[1600px] mx-auto px-8 md:px-16 lg:px-24 pt-28 lg:pt-36 pb-20">
          {/* Top Area */}
          <div className="grid lg:grid-cols-2 gap-20 border-b border-white/10 pb-20">
            {/* Left */}
            <div>
              <p className="uppercase tracking-[0.3em] text-[#b28a63] text-xs mb-6">
                Luxury Interior Studio
              </p>

              <h2 className="font-serif text-[52px] md:text-[72px] leading-[0.95] font-light tracking-[-0.03em] max-w-[700px]">
                Designing spaces
                <span className="block italic text-[#b28a63]">
                  that feel alive
                </span>
              </h2>
            </div>

            {/* Right */}
            <div className="flex flex-col justify-between lg:items-end">
              <p className="text-white/60 text-[15px] leading-8 max-w-[420px] lg:text-right">
                We blend architecture, emotion, light, and material into
                timeless interiors crafted for modern living.
              </p>

              <button className="group mt-10 lg:mt-0 inline-flex items-center gap-4 border border-white/20 hover:border-[#b28a63] px-8 py-5 uppercase tracking-[0.2em] text-xs transition-all duration-500 hover:bg-[#b28a63]">
                Start Your Project
                <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </div>
          </div>

          {/* Middle Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 pt-20">
            {/* Brand */}
            <div>
              <h1 className="font-serif text-4xl tracking-[0.15em] mb-6">
                HELTECH
              </h1>

              <p className="text-white/55 leading-8 text-sm max-w-[280px]">
                Premium interior design studio creating elegant residential,
                commercial, and hospitality environments across India.
              </p>

              <div className="flex gap-4 mt-10">
                <a
                  href="#"
                  className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-[#b28a63] transition-all duration-300"
                >
                  <FaInstagram size={18} />
                </a>

                <a
                  href="#"
                  className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-[#b28a63] transition-all duration-300"
                >
                  <FaLinkedinIn size={18} />
                </a>
              </div>
            </div>

            {/* Services */}
            <div>
              <h3 className="uppercase tracking-[0.25em] text-[#b28a63] text-xs mb-8">
                Services
              </h3>

              <ul className="space-y-5">
                {[
                  "Interior Design",
                  "3D Visualization",
                  "Architecture Drafting",
                  "Furniture Layout",
                  "Commercial Interiors",
                  "Residential Spaces",
                ].map((item, i) => (
                  <li key={i}>
                    <a
                      href="#"
                      className="text-white/70 hover:text-white transition duration-300 text-lg font-light"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Locations */}
            <div>
              <h3 className="uppercase tracking-[0.25em] text-[#b28a63] text-xs mb-8">
                Studios
              </h3>

              <div className="space-y-5">
                {["Kolkata", "Mumbai", "Bangalore", "Delhi", "Hyderabad"].map(
                  (city, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 text-white/65 hover:text-white transition duration-300"
                    >
                      <FaMapMarkerAlt size={15} />
                      <span>{city}</span>
                    </div>
                  ),
                )}
              </div>
            </div>

            {/* Contact */}
            <div>
              <h3 className="uppercase tracking-[0.25em] text-[#b28a63] text-xs mb-8">
                Contact
              </h3>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <FaEnvelope className="mt-1" size={16} />

                  <div>
                    <p className="text-white/40 text-xs uppercase tracking-[0.15em] mb-1">
                      Email
                    </p>

                    <a
                      href="mailto:hello@heltech.in"
                      className="text-white/70 hover:text-white"
                    >
                      {contactInfo.email.length > 0 ? contactInfo.email[0] : ""}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <FaPhoneAlt className="mt-1" size={16} />

                  <div>
                    <p className="text-white/40 text-xs uppercase tracking-[0.15em] mb-1">
                      Phone
                    </p>

                    <a
                      href="tel:+919999999999"
                      className="text-white/70 hover:text-white"
                    >
                      {contactInfo.phone.length > 0 ? contactInfo.phone[0] : ""}
                    </a>
                  </div>
                </div>

                {/* Newsletter */}
                <div className="pt-6">
                  <p className="text-white/50 text-sm mb-4">
                    Subscribe for design insights & project updates.
                  </p>

                  <div className="flex border border-white/10 overflow-hidden"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="relative z-10 border-t border-white/10">
          <div className="max-w-[1600px] mx-auto px-8 md:px-16 lg:px-24 py-8 flex flex-col lg:flex-row items-center justify-between gap-6">
            <p className="text-white/35 text-sm tracking-wide">
              © 2026 HELTECH Interiors. All rights reserved.
            </p>

            <div className="flex items-center gap-8 text-sm text-white/40">
              <a href="#" className="hover:text-white transition duration-300">
                Privacy Policy
              </a>

              <a href="#" className="hover:text-white transition duration-300">
                Terms & Conditions
              </a>

              <a href="#" className="hover:text-white transition duration-300">
                Sitemap
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;

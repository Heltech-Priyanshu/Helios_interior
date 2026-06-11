import React, { useState } from "react";
import {
  FaBars,
  FaTimes,
  FaHome,
  FaInfoCircle,
  FaProjectDiagram,
  FaServicestack,
  FaPhoneAlt,
} from "react-icons/fa";
import { GrGallery } from "react-icons/gr";
import { MdOutlineHomeRepairService } from "react-icons/md";
import { NavLink, useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    {
      name: "Company Details",
      icon: <FaHome />,
      link: "/admin/companydetails",
    },
    {
      name: "Contact Details",
      icon: <FaInfoCircle />,
      link: "/admin/contactdetails",
    },
    {
      name: "FAQ's",
      icon: <FaProjectDiagram />,
      link: "/admin/faqs",
    },
    {
      name: "Create Slider",
      icon: <FaServicestack />,
      link: "/admin/createslider",
    },
    {
      name: "Create service",
      icon: <MdOutlineHomeRepairService />,
      link: "/admin/createservice",
    },

    {
      name: "Create Gallery",
      icon: <GrGallery />,
      link: "/admin/creategallery",
    },
  ];

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-5 left-5 z-50 bg-[#03cafc] text-white p-3 rounded-lg shadow-lg lg:hidden"
        aria-label="Open menu"
      >
        <FaBars size={22} />
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed top-0 left-0 h-full w-[280px]
          bg-[#111827] text-white z-50
          transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
          <h2 className="text-2xl font-bold text-[#03cafc]">
            <NavLink to="/">HELTECH</NavLink>
          </h2>

          <button
            onClick={() => setIsOpen(false)}
            className="lg:hidden"
            aria-label="Close menu"
          >
            <FaTimes size={22} />
          </button>
        </div>

        {/* Menu */}
        <div className="flex flex-col p-5 gap-3">
          {menuItems.map((item, index) => (
            <NavLink
              key={index}
              to={item.link}
              className="
                flex items-center gap-4
                px-4 py-3 rounded-xl
                hover:bg-[#03cafc]
                transition-all duration-300
                group
              "
            >
              <span className="text-lg">{item.icon}</span>

              <span className="text-[16px] font-medium">{item.name}</span>
            </NavLink>
          ))}
        </div>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 w-full p-5 border-t border-white/10">
          <button
            className="w-full bg-red-600 hover:bg-red-700 transition py-3 rounded-xl font-semibold"
            onClick={logout}
          >
            Logout
          </button>
        </div>
      </div>
    </>
  );
}

export default Sidebar;

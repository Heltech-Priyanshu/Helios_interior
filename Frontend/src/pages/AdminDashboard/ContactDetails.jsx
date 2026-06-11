import axios from "axios";
import { useEffect, useState } from "react";
import { MdDangerous } from "react-icons/md";
import { contactDetails } from "../../services/api";
import { toast } from "react-toastify";

function ContactDetails() {
  const [contact, setContact] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Fetch Contact Data
  const handelContactDetails = async (page = 1) => {
    try {
      const res = await axios.get(
        `${contactDetails.getContact}?page=${page}&limit=10`,
      );

      toast.success("Contact details fetched successfully ✅");
      setContact(res.data.data);
      setCurrentPage(res.data.current_page);
      setTotalPages(res.data.total_pages);
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to fetch contact details ❌",
      );
    }
  };

  // Delete Contact
  const deleteContact = async (id) => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this contact?",
      );

      if (!confirmDelete) return;

      const res = await axios.delete(`${contactDetails.deletecontact}/${id}`);

      toast.success(res?.data?.message || "Contact Deleted Successfully ✅");

      // Refresh Data
      handelContactDetails(currentPage);
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to delete contact ❌",
      );
    }
  };

  // useEffect(() => {
  //   handelContactDetails(currentPage);
  //   console.log("Current Page:", currentPage);
  // }, [currentPage]);

  // Next Page
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Previous Page
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="bg-white shadow-lg rounded-xl overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b">
          <h2 className="text-2xl font-bold">Contact dfffff List</h2>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead className="bg-black text-white">
              <tr>
                <th className="p-4 text-left">#</th>
                <th className="p-4 text-left">First Name</th>
                <th className="p-4 text-left">Last Name</th>
                <th className="p-4 text-left">Email</th>
                <th className="p-4 text-left">Message</th>
                <th className="p-4 text-left">Delete</th>
              </tr>
            </thead>

            <tbody>
              {contact.length > 0 ? (
                contact.map((item, index) => (
                  <tr
                    key={item.id}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    <td className="p-4">
                      {(currentPage - 1) * 10 + index + 1}
                    </td>

                    <td className="p-4">{item.first_name}</td>

                    <td className="p-4">{item.last_name}</td>

                    <td className="p-4">{item.email}</td>

                    <td className="p-4">{item.message}</td>

                    <td className="p-4">
                      <button
                        onClick={() => deleteContact(item.id)}
                        className="text-red-600 text-2xl hover:text-red-800"
                      >
                        <MdDangerous />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center p-6">
                    No Contacts Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center p-5">
          <button
            onClick={prevPage}
            disabled={currentPage === 1}
            className="bg-black text-white px-4 py-2 rounded disabled:bg-gray-400"
          >
            Previous
          </button>

          <p className="font-semibold">
            Page {currentPage} of {totalPages}
          </p>

          <button
            onClick={nextPage}
            disabled={currentPage === totalPages}
            className="bg-black text-white px-4 py-2 rounded disabled:bg-gray-400"
          >
            Next
          </button>
        </div>
      </div>

      <div
        style={{
          height: "100vh",
        }}
      >
        <span>Deez</span>
      </div>
    </div>
  );
}

export default ContactDetails;

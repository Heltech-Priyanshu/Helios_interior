import axios from "axios";
import { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { FaQuestionCircle } from "react-icons/fa";

import { faqsDetails } from "../../services/api";
import { toast } from "react-toastify";

function Faqs() {
  // FAQ List State
  const [faqs, setFaqs] = useState([]);

  // Form State
  const [question, setQuestion] = useState({
    title: "",
    description: "",
  });

  // Handle Input Change
  const handelChange = (e) => {
    const { name, value } = e.target;

    setQuestion({
      ...question,
      [name]: value,
    });
  };

  // Fetch FAQs
  const fetchFaqs = async () => {
    try {
      const res = await axios.get(faqsDetails.getFaqs);

      toast.success("FAQ details fetched successfully ✅");

      setFaqs(res.data.faqs || []);
    } catch (error) {
      toast.error("Error fetching FAQ details ❌");
      console.log("Error fetching FAQs", error);
    }
  };

  // Submit FAQ
  const handelSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(faqsDetails.createFaq, question);

      toast.success("FAQ Added Successfully ✅");

      setQuestion({
        title: "",
        description: "",
      });

      fetchFaqs();
    } catch (error) {
      toast.error("Error adding FAQ ❌");
      console.log("Error adding FAQ", error);
    }
  };

  // Delete FAQ
  const deleteFaq = async (id) => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this FAQ?",
      );

      if (!confirmDelete) return;

      await axios.delete(`${faqsDetails.deleteFaq}/${id}`);

      toast.success("FAQ Deleted Successfully ✅");

      fetchFaqs();
    } catch (error) {
      toast.error("Error deleting FAQ ❌");
      console.log("Error deleting FAQ", error);
    }
  };

  useEffect(() => {
    fetchFaqs();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* LEFT SIDE - FAQ LIST */}
        <div className="bg-white rounded-2xl shadow-lg p-6 h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-blue-600 text-white p-3 rounded-xl">
              <FaQuestionCircle size={22} />
            </div>

            <div>
              <h1 className="text-2xl font-bold text-gray-800">FAQ List</h1>

              <p className="text-gray-500 text-sm">
                Manage all frequently asked questions
              </p>
            </div>
          </div>

          {/* FAQ Cards */}
          <div className="space-y-5">
            {faqs.length > 0 ? (
              faqs.map((item, index) => (
                <div
                  key={item.id}
                  className="border border-gray-200 rounded-2xl p-5 hover:shadow-lg transition duration-300"
                >
                  <div className="flex justify-between items-start gap-4">
                    {/* FAQ Content */}
                    <div className="flex gap-4">
                      <div className="bg-blue-100 text-blue-600 min-w-[45px] h-[45px] rounded-full flex items-center justify-center font-bold">
                        {index + 1}
                      </div>

                      <div>
                        <h2 className="text-lg font-semibold text-gray-800 mb-2">
                          {item.title}
                        </h2>

                        <p className="text-gray-600 leading-relaxed">
                          {item.description || "No Description"}
                        </p>
                      </div>
                    </div>

                    {/* Delete Button */}
                    <button
                      onClick={() => deleteFaq(item.id)}
                      className="text-red-500 hover:text-red-700 text-3xl transition"
                    >
                      <MdDelete />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-16">
                <h2 className="text-2xl font-semibold text-gray-700">
                  No FAQs Found
                </h2>

                <p className="text-gray-500 mt-2">
                  Add your first FAQ from the form.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT SIDE - FAQ FORM */}
        <div className="bg-white rounded-2xl shadow-lg p-8 h-fit sticky top-6">
          {/* Heading */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-800">Add FAQ</h2>

            <p className="text-gray-500 mt-2">
              Create frequently asked questions with answers.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handelSubmit} className="space-y-6">
            {/* Question */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                FAQ Question
              </label>

              <input
                type="text"
                name="title"
                value={question.title}
                onChange={handelChange}
                placeholder="Enter your question..."
                className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                FAQ Answer / Description
              </label>

              <textarea
                name="description"
                value={question.description}
                onChange={handelChange}
                rows="7"
                placeholder="Write the answer or description here..."
                className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                required
              ></textarea>
            </div>

            {/* Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300"
            >
              Save FAQ
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Faqs;

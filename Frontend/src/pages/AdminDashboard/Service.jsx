import React, { useEffect, useState } from "react";
import axios from "axios";
import { ServiceData } from "../../services/api";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";
import { API_URL } from "../../config/config";
import { MdDelete } from "react-icons/md";
import { FiEdit } from "react-icons/fi";

const Service = () => {
  const [services, setServices] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogData, setDialogData] = useState({
    id: null,
    service_name: "",
    description: "",
    position: "",
    image: null,
  });
  const [previewImage, setPreviewImage] = useState(null);
  const token = localStorage.getItem("token");
  const decodedToken = token ? jwtDecode(token) : null;
  console.log("Decoded Token:", decodedToken);

  // GET ALL SERVICES
  const fetchServices = async () => {
    try {
      const res = await axios.get(ServiceData.getservice);
      setServices(res.data.data);
      toast.success("Services fetched successfully!");
    } catch (err) {
      console.log("Error fetching services:", err);
      toast.error("Failed to fetch services." + (err.message || ""));
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const openAddDialog = () => {
    setDialogData({
      id: null,
      service_name: "",
      description: "",
      position: "",
      image: null,
    });
    setPreviewImage(null);
    setIsDialogOpen(true);
  };

  const openEditDialog = (item) => {
    setDialogData({
      id: item.id,
      service_name: item.service_name || "",
      description: item.description || "",
      position: item.position || "",
      image: null,
    });
    setPreviewImage(item.service_image ? `${API_URL}${item.service_image}` : null);
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    if (previewImage?.startsWith("blob:")) {
      URL.revokeObjectURL(previewImage);
    }
    setPreviewImage(null);
    setIsDialogOpen(false);
  };

  const handleDialogChange = (e) => {
    const { name, value, files } = e.target;

    if (files && files[0]) {
      if (previewImage?.startsWith("blob:")) {
        URL.revokeObjectURL(previewImage);
      }
      const file = files[0];
      setDialogData((prev) => ({ ...prev, [name]: file }));
      setPreviewImage(URL.createObjectURL(file));
    } else {
      setDialogData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSaveService = async (e) => {
    e.preventDefault();

    try {
      const hasImage = Boolean(dialogData.image);
      let payload;

      if (hasImage) {
        const formData = new FormData();
        formData.append("service_name", dialogData.service_name);
        formData.append("description", dialogData.description);
        formData.append("position", dialogData.position);
        formData.append("service_image", dialogData.image);
        formData.append("created_by", decodedToken?.name || "");
        formData.append("user_id", decodedToken?.id || ""); // Include user_id if needed
        payload = formData;
      } else {
        payload = {
          service_name: dialogData.service_name,
          description: dialogData.description,
          position: dialogData.position,
        };
      }

      if (dialogData.id) {
        await axios.put(
          `${ServiceData.updateservice}/${dialogData.id}`,
          payload,
          {
            headers: { "Content-Type": "multipart/form-data" },
          },
        );
        toast.success("Service updated successfully!");
      } else {
        await axios.post(ServiceData.createservice, payload, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Service added successfully!");
      }

      fetchServices();
      closeDialog();
    } catch (err) {
      console.log("Save service error:", err);
      toast.error(err.message || "Failed to save service.");
    }
  };

  // DELETE SERVICE
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${ServiceData.deleteservice}/${id}`);

      toast.success("Service deleted successfully!");

      fetchServices(); // refresh table
    } catch (err) {
      console.log("Delete error:", err);

      toast.error("Failed to delete service!");
    }
  };

  return (
    <div className="p-3 sm:p-6 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col gap-3 mb-4 sm:mb-6">
          <h1 className="text-xl sm:text-2xl font-bold\">Services Management</h1>
          <button
            onClick={openAddDialog}
            className="w-full sm:w-auto bg-blue-600 text-white px-4 sm:px-5 py-3 sm:py-2 rounded-lg hover:bg-blue-700 font-medium text-sm\"
          >
            Add Service
          </button>
        </div>

        <div className="bg-white shadow rounded-lg overflow-hidden">
          {/* Desktop Table View */}
          <div className="hidden sm:block overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-200">
                <tr>
                  <th className="p-3 text-left">Service Name</th>
                  <th className="p-3 text-left">Description</th>
                  <th className="p-3 text-center">Position</th>
                  <th className="p-3 text-center">Image</th>
                  <th className="p-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {services.length > 0 ? (
                  services.map((item) => (
                    <tr key={item.id} className="border-b hover:bg-gray-50">
                      <td className="p-3">{item.service_name}</td>
                      <td className="p-3 text-gray-600">{item.description}</td>
                      <td className="p-3 text-center">{item.position}</td>
                      <td className="p-3 text-center">
                        {item.service_image ? (
                          <img
                            src={`${API_URL}${item.service_image}`}
                            alt={item.service_name}
                            className="w-16 h-16 object-cover rounded mx-auto block"
                          />
                        ) : (
                          <span className="text-gray-500">No image</span>
                        )}
                      </td>
                      <td className="p-3 space-x-2 text-center w-[150px]">
                        <button
                          onClick={() => openEditDialog(item)}
                          className="bg-yellow-500 text-white px-2 py-2 rounded hover:bg-yellow-600 inline-block"
                          title="Edit"
                        >
                          <FiEdit size={20} />
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="bg-red-500 text-white px-2 py-2 rounded hover:bg-red-600 inline-block"
                          title="Delete"
                        >
                          <MdDelete size={20} />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="p-6 text-center text-gray-500">
                      No services found. Click Add Service to create one.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View */}
          <div className="block sm:hidden">
            {services.length > 0 ? (
              <div className="space-y-4 p-4">
                {services.map((item) => (
                  <div key={item.id} className="border border-gray-200 rounded-lg p-4 bg-gray-50 hover:bg-white transition">
                    <div className="space-y-3">
                      {/* Service Name */}
                      <div>
                        <p className="text-xs font-semibold text-gray-600 uppercase">Service Name</p>
                        <p className="text-sm font-medium text-gray-900">{item.service_name}</p>
                      </div>

                      {/* Description */}
                      <div>
                        <p className="text-xs font-semibold text-gray-600 uppercase">Description</p>
                        <p className="text-sm text-gray-700 line-clamp-2 ">{item.description}</p>
                      </div>

                      {/* Position and Image */}
                      <div className="flex gap-4 items-center">
                        <div className="flex-1">
                          <p className="text-xs font-semibold text-gray-600 uppercase">Position</p>
                          <p className="text-sm text-gray-900">{item.position}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-xs font-semibold text-gray-600 uppercase mb-1">Image</p>
                          {item.service_image ? (
                            <img
                              src={`${API_URL}${item.service_image}`}
                              alt={item.service_name}
                              className="w-12 h-12 object-cover rounded"
                            />
                          ) : (
                            <span className="text-xs text-gray-500">No image</span>
                          )}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2 pt-2 border-t border-gray-200  ">
                        <button
                          onClick={() => openEditDialog(item)}
                          className="flex-1 bg-yellow-500 text-white px-3 py-2 rounded hover:bg-yellow-600 text-sm font-medium flex items-center justify-center gap-1"
                        >
                          <FiEdit size={16} /> 
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="flex-1 bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600 text-sm font-medium flex items-center justify-center gap-1"
                        >
                          <MdDelete size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-6 text-center text-gray-500">
                No services found. Click Add Service to create one.
              </div>
            )}
          </div>
        </div>
      </div>

      {isDialogOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-2xl sm:max-w-xl bg-white rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between bg-blue-600 px-6 py-4">
              <h2 className="text-lg font-semibold text-white">
                {dialogData.id ? "Edit Service" : "Add Service"}
              </h2>
              <button
                type="button"
                onClick={closeDialog}
                className="text-white text-xl font-bold leading-none"
              >
                ×
              </button>
            </div>
            <form onSubmit={handleSaveService} className="p-4 sm:p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Service Name
                </label>
                <input
                  type="text"
                  name="service_name"
                  value={dialogData.service_name}
                  onChange={handleDialogChange}
                  placeholder="Enter service name"
                  className="w-full border border-gray-300 rounded-lg p-3 text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  value={dialogData.description}
                  onChange={handleDialogChange}
                  placeholder="Enter description"
                  className="w-full border border-gray-300 rounded-lg p-3 h-20 sm:h-24 text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Position
                </label>
                <input
                  type="number"
                  name="position"
                  value={dialogData.position}
                  onChange={handleDialogChange}
                  placeholder="Enter position"
                  className="w-full border border-gray-300 rounded-lg p-3 text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Image</label>
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleDialogChange}
                  className="w-full border border-gray-300 rounded-lg p-3 text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {previewImage && (
                  <div className="mt-3 text-center">
                    <p className="text-sm text-gray-600 mb-2">Preview</p>
                    <img
                      src={previewImage}
                      alt="Service preview"
                      className="mx-auto h-32 w-full sm:w-48 rounded object-cover"
                    />
                  </div>
                )}
              </div>
              <div className="flex flex-col-reverse sm:flex-row gap-2 sm:gap-3 pt-4 border-t border-gray-200\">
                <button
                  type="button"
                  onClick={closeDialog}
                  className="w-full sm:w-auto rounded-lg border border-gray-300 px-4 py-3 sm:py-2 text-sm font-medium text-gray-700 hover:bg-gray-50\"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-full sm:w-auto rounded-lg bg-blue-600 px-4 py-3 sm:py-2 text-sm font-medium text-white hover:bg-blue-700 ml-auto\"
                >
                  {dialogData.id ? "Update Service" : "Add Service"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Service;

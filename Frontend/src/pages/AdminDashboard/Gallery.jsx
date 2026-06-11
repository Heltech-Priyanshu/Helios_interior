import { useState, useEffect } from "react";
import axios from "axios";
import { FaCloudUploadAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { GalleryData } from "../../services/api";
import { API_URL } from "../../config/config";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";

function Gallery() {
  const [file, setFile] = useState([]);
  const [preview, setPreview] = useState([]);
  // const [title, setTitle] = useState("");
  const [view, setView] = useState([]);

   const token = localStorage.getItem("token");
    const decodedToken = token ? jwtDecode(token) : null;
    console.log("Decoded Token:", decodedToken);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files || []);
    if (selectedFiles.length) {
      const newPreviews = selectedFiles.map((f) => URL.createObjectURL(f));
      setFile((prev) => [...prev, ...selectedFiles]);
      setPreview((prev) => [...prev, ...newPreviews]);
    }
  };

  const removePreview = (index) => {
    setPreview((prev) => {
      const url = prev[index];
      if (url) URL.revokeObjectURL(url);
      return prev.filter((_, i) => i !== index);
    });
    setFile((prev) => prev.filter((_, i) => i !== index));
  };

  const getGalleryImages = async () => {
    try {
      const res = await axios.get(GalleryData.getgallery);

      setView(res?.data?.data || []);
      toast.success("Gallery images fetched successfully ✅");
    } catch (error) {
      console.error("Get Gallery Images Error:", error);

      toast.error(
        error?.response?.data?.message || "Failed to fetch gallery images ❌",
      );
    }
  };

  useEffect(() => {
    getGalleryImages();
  }, []);

  const handleUpload = async () => {
    if (!file) {
      toast.warning("Please select a file ⚠️");
      return;
    }

    try {
      const formData = new FormData();

      if (file.length === 0) {
        toast.warning("Please select at least one file ⚠️");
        return;
      }

      // Append multiple files
      file.forEach((f) => {
        formData.append("gallery_image", f);
      });
      formData.append("created_by", decodedToken?.name);

      const res = await axios.post(GalleryData.creategallery, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Upload Response:", res.data);

      toast.success("Uploaded Successfully ✅");

      // Reset form and revoke object URLs
      preview.forEach((url) => URL.revokeObjectURL(url));
      setFile([]);
      setPreview([]);
      // setTitle("");

      // Refresh gallery list
      await getGalleryImages();
    } catch (error) {
      console.error("Upload Error:", error);

      toast.error(error?.response?.data?.message || "Upload Failed ❌");
    }
  };

  const handleDelete = async (id) => {
  try {
    await axios.delete(`${GalleryData.deletegallery}/${id}`);

    toast.success("Gallery Image Deleted Successfully ✅");

    await getGalleryImages();
  } catch (error) {
    console.error("Delete Gallery Image Error:", error);

    toast.error(
      error?.response?.data?.message ||
        "Failed to delete gallery image ❌"
    );
  }
};

  return (
    <div className="min-h-screen  p-10">
      <div className="max-w-8xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* UPLOAD CARD */}
        <div className="bg-white p-8 rounded-3xl shadow-xl">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Upload Gallery Image
          </h1>
          <p className="text-gray-500 mb-6">
            Upload homepage gallery image.
          </p>

          {/* File Upload Box */}
          <label
            className="border-2 border-dashed border-blue-400 bg-blue-50 hover:bg-blue-100
            rounded-2xl py-12 flex flex-col items-center cursor-pointer transition"
          >
            <FaCloudUploadAlt className="text-6xl text-blue-500 mb-4" />
            <h2 className="text-xl font-semibold text-gray-700">
              Click to Upload
            </h2>
            <p className="text-gray-500 text-sm mt-2">
              PNG, JPG, JPEG supported
            </p>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileChange}
              className="hidden"
            />
          </label>

          {/* Title Input */}
          {/* <input
            type="text"
            className="w-full mt-5 border px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter Image Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          /> */}

          {/* Upload Button */}
          <button
            onClick={handleUpload}
            className="w-full mt-5 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition"
          >
            Upload Image
          </button>
        </div>

        {/* PREVIEW CARD */}
        <div className="bg-white p-8 rounded-3xl shadow-xl">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Preview</h2>

          {preview && preview.length > 0 ? (
            <div className="grid grid-cols-2 gap-4">
              {preview.map((p, idx) => (
                <div key={p} className="relative">
                  <img
                    src={p}
                    className="w-full h-[140px] object-cover rounded-2xl shadow-md"
                    alt="preview"
                  />
                  <button
                    onClick={() => removePreview(idx)}
                    className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-1 rounded-full shadow-md"
                  >
                    <MdDelete size={18} />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="border-2 border-dashed border-gray-300 h-[300px] rounded-2xl flex justify-center items-center text-gray-400">
              No Image Selected
            </div>
          )}
        </div>
      </div>

      {/* LIST OF GALLERY IMAGES */}
      <div className="max-w-5xl mx-auto mt-12">
        <h2 className="text-2xl font-bold mb-6">All Gallery Images</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {view.map((item) => (
            <div
              key={item.id}
              className="bg-white shadow-lg rounded-2xl overflow-hidden group"
            >
              <img
                src={`${API_URL}${item.image_url}`}
                className="w-full h-48 object-cover group-hover:scale-105 transition"
                alt=""
              />

              <div className="p-4 flex justify-between items-center">
                <p className="font-semibold text-gray-600">{item.title}</p>

                <button
                  onClick={() => handleDelete(item.id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg"
                >
                  <MdDelete size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Gallery;

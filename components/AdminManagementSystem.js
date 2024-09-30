import { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";

export default function AdminManagementSystem() {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [uploadStatus, setUploadStatus] = useState("");
  const [fileURL, setFileURL] = useState("");
  const [files, setFiles] = useState([]); // State to hold the list of uploaded files

  // Fetch the list of uploaded files from the database
  const fetchFiles = async () => {
    const { data, error } = await supabase.from("dist_data_table").select("*");
    if (error) {
      console.error("Error fetching files:", error);
    } else {
      setFiles(data);
    }
  };

  // Handle file input change
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Handle form submission for file upload
  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploadStatus("Uploading...");

    try {
      if (!file) {
        setUploadStatus("Please select a file.");
        return;
      }

      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}_${Math.random()
        .toString(36)
        .substring(7)}.${fileExt}`;
      const filePath = `${fileName}`;

      // Upload file to Supabase storage
      const { data: storageData, error: storageError } = await supabase.storage
        .from("dist_upload_file")
        .upload(filePath, file);

      if (storageError) {
        throw new Error("Error uploading file: " + storageError.message);
      }

      const { data: publicURLData } = supabase.storage
        .from("dist_upload_file")
        .getPublicUrl(filePath);

      const publicURL = publicURLData.publicUrl;

      // Insert file info into the database
      const { data: insertData, error: insertError } = await supabase
        .from("dist_data_table")
        .insert([{ file_name: title, file_url: publicURL }]);

      if (insertError) {
        throw new Error(
          "Error saving file info to database: " + insertError.message
        );
      }

      setUploadStatus("File uploaded and saved to database successfully.");
      setFileURL(publicURL); // Set the uploaded file's URL
      fetchFiles(); // Fetch the updated file list
    } catch (error) {
      setUploadStatus(`Error: ${error.message}`);
    }
  };

  // Handle delete file operation
  const handleDelete = async (id, filePath) => {
    try {
      // Delete file from Supabase storage
      const { error: storageError } = await supabase.storage
        .from("dist_upload_file")
        .remove([filePath]);

      if (storageError) {
        throw new Error("Error deleting file: " + storageError.message);
      }

      // Delete file info from the database
      const { error: deleteError } = await supabase
        .from("dist_data_table")
        .delete()
        .eq("id", id);

      if (deleteError) {
        throw new Error(
          "Error deleting file info from database: " + deleteError.message
        );
      }

      fetchFiles(); // Fetch the updated file list
    } catch (error) {
      console.error("Error deleting file:", error);
    }
  };

  const handleDeleteWithConfirmation = (id, filePath) => {
    // Use window.confirm to show a confirmation dialog
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this file?"
    );

    if (isConfirmed) {
      // If the user clicks "OK", proceed with the deletion
      handleDelete(id, filePath);
    }
  };

  // Fetch files on component mount
  useEffect(() => {
    fetchFiles();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="title"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="file"
          >
            File
          </label>
          <input
            type="file"
            id="file"
            onChange={handleFileChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Upload
        </button>
      </form>

      <p className="text-center text-gray-600">{uploadStatus}</p>

      <h2 className="text-xl font-bold mb-4 mt-8 text-center">
        Uploaded Files
      </h2>

      <ul className="space-y-4">
        {files.map((fileItem) => (
          <li
            key={fileItem.id}
            className="flex flex-col items-center justify-between bg-gray-100 p-4 rounded-lg shadow-md md:flex-row"
          >
            <div className="text-center md:text-left mb-4 md:mb-0">
              <p className="font-semibold">{fileItem.file_name}</p>
              <a
                href={fileItem.file_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline hover:text-blue-700"
              >
                View File
              </a>
            </div>
            <button
              onClick={() =>
                handleDeleteWithConfirmation(fileItem.id, fileItem.file_url)
              }
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

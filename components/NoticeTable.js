// components/NoticeTable.js
import React from "react";

const getFilePreview = (fileUrl) => {
  const imageExtensions = [".png", ".jpg", ".jpeg"];
  const isImage = imageExtensions.some((ext) => fileUrl.endsWith(ext));

  if (isImage) {
    return (
      <img
        src={fileUrl}
        alt="Image preview"
        className="w-full h-64 object-cover rounded-md"
        loading="lazy"
      />
    );
  } else if (fileUrl.endsWith(".pdf")) {
    return (
      <div className="flex justify-center items-center h-32">
        <img src="/path/to/pdf-icon.png" alt="PDF Icon" className="h-16" />
      </div>
    );
  } else {
    return <p className="text-gray-500">Unsupported file type</p>;
  }
};

const NoticeTable = ({ notices = [] }) => {
  return (
    <div className="container mx-auto p-6">
      {notices.length > 0 ? (
        notices.map((notice) => (
          <div
            key={notice.id}
            className="border border-gray-200 p-6 rounded-md shadow-lg bg-white"
          >
            {/* File Name */}
            <h2 className="text-xl font-bold text-gray-800 mb-2">
              {notice.file_name}
            </h2>

            {/* Date */}
            <p className="text-sm text-gray-500">
              {new Date(notice.created_at).toLocaleDateString("en-US", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
              })}
            </p>

            {/* File Preview */}
            <div className="mt-4">{getFilePreview(notice.file_url)}</div>

            {/* Action Buttons */}
            <div className="mt-6 flex space-x-4">
              <a
                href={notice.file_url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-all shadow"
              >
                Preview
              </a>
              <a
                href={notice.file_url}
                download
                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-all shadow"
              >
                Download
              </a>
            </div>
          </div>
        ))
      ) : (
        <p colSpan="4" className="px-6 py-4 text-sm text-center">
          No notices available
        </p>
      )}
    </div>
  );
};

export default NoticeTable; // Ensure this line is correct

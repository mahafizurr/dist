import { useState, useEffect, useMemo } from "react";

export default function NoticeList() {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const noticesPerPage = 5;

  useEffect(() => {
    fetchNotices();
  }, [page]);

  // Fetch notices from external API
  const fetchNotices = async () => {
    setLoading(true);
    setError(null);
    try {
      // Replace with the correct API endpoint for fetching notices
      const response = await fetch(
        `https://www.chapaibar.com/api/notices?page=${page}&limit=${noticesPerPage}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch notices");
      }

      const notices = await response.json();
      setNotices(notices);
    } catch (fetchError) {
      setError("Error fetching notices: " + fetchError.message);
      console.error("Error fetching notices:", fetchError);
    } finally {
      setLoading(false);
    }
  };

  // Calculate total pages based on the total number of notices
  const totalNotices = useMemo(() => {
    return notices.length; // Replace with total count from the API if available
  }, [notices]);

  const totalPages = Math.ceil(totalNotices / noticesPerPage);

  // Handle pagination
  const handleNextPage = () => {
    if (page < totalPages) {
      setPage((prev) => prev + 1);
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center text-sky-900 border-b-2 border-orange-300">
        Latest Notices
      </h1>

      {/* Error handling */}
      {error && (
        <div className="text-red-500 bg-red-100 p-4 rounded-md mb-4">
          {error}
        </div>
      )}

      {/* Loading spinner */}
      {loading ? (
        <div className="flex justify-center items-center">
          <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-sky-900"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {notices.length > 0 ? (
            notices.map((notice) => (
              <div
                key={notice.id}
                className="border border-gray-200 p-6 rounded-md shadow-lg bg-white hover:shadow-xl transition-shadow duration-200 ease-in-out"
              >
                <h2 className="text-xl font-bold text-gray-800 mb-2 cursor-pointer hover:text-sky-600 transition-colors duration-200">
                  {notice.file_name}
                </h2>

                <p className="text-sm text-gray-500">
                  {new Date(notice.created_at).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                  })}
                </p>
              </div>
            ))
          ) : (
            <p className="text-gray-600 text-center">No notices available.</p>
          )}
        </div>
      )}

      {/* Pagination Controls */}
      <div className="flex justify-center items-center mt-6">
        <button
          onClick={handlePreviousPage}
          disabled={page === 1}
          className={`${
            page === 1
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-sky-500 hover:bg-sky-600"
          } text-white font-bold py-2 px-4 mx-6 rounded-md`}
        >
          Previous
        </button>
        <p className="text-gray-600">
          Page {page} of {totalPages}
        </p>
        <button
          onClick={handleNextPage}
          disabled={page >= totalPages}
          className={`${
            page >= totalPages
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-sky-500 hover:bg-sky-600"
          } text-white font-bold py-2 px-4 mx-6 rounded-md`}
        >
          Next
        </button>
      </div>
    </div>
  );
}

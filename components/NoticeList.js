import { useEffect, useState } from "react";
import Link from "next/link";

export default function NoticeList() {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch notices from the API
  const fetchNotices = async () => {
    setLoading(true);
    setError(null); // Reset error state
    try {
      const response = await fetch(`https://www.chapaibar.com/notices`);
      if (!response.ok) {
        throw new Error("Failed to fetch notices");
      }
      const data = await response.json(); // Parse the response data
      setNotices(data || []); // Set default if no data
    } catch (err) {
      setError("Failed to fetch notices. Please try again later.");
      console.error("Error fetching notices:", err); // Log the actual error
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotices();
  }, []);

  return (
    <div className="container mx-auto p-6">
      {loading ? (
        <div className="flex justify-center items-center h-48">
          <svg
            className="animate-spin h-12 w-12 text-blue-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.978 7.978 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        </div>
      ) : error ? (
        <div className="text-center text-red-600 font-semibold mt-6">
          <p>{error}</p>
          <button
            onClick={fetchNotices} // Retry button
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-200"
          >
            Retry
          </button>
        </div>
      ) : notices.length > 0 ? (
        <div>
          <h2 className="text-3xl font-bold mt-8 text-center text-sky-900 border-b-2 border-orange-300">
            Latest Notices
          </h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notices.map((notice) => (
              <li
                key={notice.id}
                className="bg-white border border-gray-200 rounded-lg shadow-lg p-4 transition-all hover:shadow-xl"
              >
                <Link href={`/notices/${notice.id}`}>
                  <h3 className="text-lg font-bold text-blue-600 mb-2 hover:underline">
                    {notice.file_name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {new Date(notice.created_at).toLocaleDateString()}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-6">No notices available.</p>
      )}
    </div>
  );
}

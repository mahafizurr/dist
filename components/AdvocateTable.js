import Link from "next/link";
import { useState } from "react";

const ITEMS_PER_PAGE = 10;

const AdvocateTable = ({ advocates }) => {
  // State for managing the current page
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = advocates.filter((advocates) =>
    advocates.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate total pages based on ITEMS_PER_PAGE
  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);

  // Get current advocates for the current page
  const currentAdvocates = filteredData.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Handle previous page
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Handle next page
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Search Input */}
      <div className="flex justify-center items-center space-x-4 mb-8">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 text-gray-500"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          />
        </svg>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-md p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Search with advocate name"
        />
      </div>

      {/* Advocate Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border-separate border-spacing-2 border border-slate-400">
          <thead>
            <tr className="bg-slate-200">
              <th className="border border-slate-300 px-4 py-2">ID</th>
              <th className="border border-slate-300 px-4 py-2">SANAD NO</th>
              <th className="border border-slate-300 px-4 py-2">NAME</th>
              <th className="border border-slate-300 px-4 py-2">PHONE</th>
              <th className="border border-slate-300 px-4 py-2">PHOTO</th>
            </tr>
          </thead>
          <tbody>
            {currentAdvocates.map((advocate) => (
              <tr key={advocate.userId} className="bg-white hover:bg-gray-100">
                <td className="border border-slate-300 px-4 py-2">
                  {advocate.userId}
                </td>
                <td className="border border-slate-300 text-center px-4 py-2">
                  {advocate.bbcSanadNo}
                </td>
                <td className="border border-slate-300 px-4 py-2 text-blue-600 hover:underline cursor-pointer">
                  <Link
                    href={`/advocates/${advocate.userId}`}
                    as={`/advocates/${advocate.userId}`}
                  >
                    {advocate.name}
                  </Link>
                </td>
                <td className="border border-slate-300 px-4 py-2">
                  {advocate.mobileNumber}
                </td>
                <td className="border border-slate-300 px-4 py-2">
                  <img
                    src={advocate.photo}
                    alt={advocate.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center mt-6">
        <button
          className={`px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 ${
            currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="px-4 py-2">
          Page {currentPage} of {totalPages}
        </span>
        <button
          className={`px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 ${
            currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AdvocateTable;

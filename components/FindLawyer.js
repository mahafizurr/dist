import { useState } from "react";

export default function FindLawyer({ advocates = [] }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("");
  const [filteredAdvocates, setFilteredAdvocates] = useState(advocates);

  const handleSearch = () => {
    if (!searchTerm || !category) return;

    // Ensure advocates is an array before filtering
    const filtered = (advocates || []).filter((advocate) => {
      const value = advocate[category]?.toLowerCase();
      return value && value.includes(searchTerm.toLowerCase());
    });

    setFilteredAdvocates(filtered);
  };

  const handleClear = () => {
    setSearchTerm("");
    setCategory("");
    setFilteredAdvocates(advocates);
  };

  return (
    <div className="bg-blue-900 text-white p-6 rounded-lg shadow-md w-full max-w-md mx-auto mt-12">
      <h1 className="text-2xl font-bold mb-4">Find a Lawyer</h1>
      <div className="flex space-x-4">
        {/* Category Dropdown */}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="bg-white text-black rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-300 w-1/3"
        >
          <option value="">Select</option>
          <option value="name">Name</option>
          <option value="bbcSanadNo">SanadNo</option>
        </select>

        {/* Search Input */}
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search"
          className="w-full px-4 py-2 rounded-md text-black focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>

      <div className="flex space-x-4 mt-4">
        {/* Search Button */}
        <button
          onClick={handleSearch}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
        >
          Search
        </button>

        {/* Clear Button */}
        <button
          onClick={handleClear}
          className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md"
        >
          Clear
        </button>
      </div>

      {/* Displaying Filtered Results */}
      <div className="mt-6">
        {filteredAdvocates?.length > 0 ? (
          <ul>
            {filteredAdvocates.map((advocate) => (
              <li key={advocate.id} className="mt-2">
                <p>
                  <strong>Name:</strong> {advocate.name}
                </p>
                <p>
                  <strong>SanadNo:</strong> {advocate.bbcSanadNo}
                </p>
                <p>
                  <img
                    src={advocate.photo}
                    alt={advocate.name}
                    className="w-24 h-24"
                  />
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-4">No results found.</p>
        )}
      </div>
    </div>
  );
}

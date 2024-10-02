// components/FindLawyer.js
import { useState } from "react";

export default function FindLawyer() {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("");

  const handleSearch = () => {
    // Search logic here
    console.log(`Searching for ${searchTerm} in ${category}`);
  };

  const handleClear = () => {
    setSearchTerm("");
    setCategory("");
  };

  return (
    <div className="bg-blue-900 text-white p-6 my-12 rounded-lg shadow-md w-full max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Find a Lawyer</h1>
      <div className="flex space-x-4">
        {/* Category Dropdown */}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="bg-white text-black rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-300 w-1/3"
        >
          <option value="">Select</option>
          <option value="criminal">Id</option>
          <option value="corporate">Name</option>
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
    </div>
  );
}

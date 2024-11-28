import { useState, useEffect } from "react";

export default function FindLawyer() {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("");
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [allAdvocates, setAllAdvocates] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  // Fetch all advocates for auto-suggestions when component mounts
  useEffect(() => {
    const fetchAdvocates = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/advocates");
        if (!response.ok) {
          throw new Error("Failed to fetch advocates for suggestions.");
        }
        const data = await response.json();
        setAllAdvocates(data);
      } catch (err) {
        console.error("Error fetching advocates:", err);
      }
    };
    fetchAdvocates();
  }, []);

  // Update suggestions when the search term changes
  useEffect(() => {
    if (category === "name" && searchTerm) {
      const filtered = allAdvocates.filter((advocate) =>
        advocate.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  }, [searchTerm, category, allAdvocates]);

  const handleSearch = async () => {
    if (!searchTerm || !category) {
      alert("Please select a category and enter a search term.");
      return;
    }

    setLoading(true);
    setError(null);
    setResults([]);

    try {
      let url = "https://www.chapaibar.com/api/advocates";

      if (category === "id") {
        url += `?advocateId=${searchTerm}`;
      } else if (category === "name") {
        setResults(
          allAdvocates.filter((advocate) =>
            advocate.name.toLowerCase().includes(searchTerm.toLowerCase())
          )
        );
        return;
      }

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch advocates.");
      }
      const data = await response.json();
      setResults(category === "id" ? [data] : data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setSearchTerm("");
    setCategory("");
    setResults([]);
    setError(null);
    setSuggestions([]);
  };

  return (
    <div className="bg-blue-900 text-white p-6 my-12 rounded-lg shadow-md w-full max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Find a Lawyer</h1>

      {/* Search Controls */}
      <div className="flex space-x-4">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="bg-white text-black rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-300 w-1/3"
        >
          <option value="">Select</option>
          <option value="name">Name</option>
          <option value="id">Serial No</option>
        </select>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search"
          className="w-full px-4 py-2 rounded-md text-black focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>

      {/* Suggestions */}
      {category === "name" && suggestions.length > 0 && (
        <div className="bg-white text-black rounded-md mt-2 max-h-40 overflow-y-auto shadow-lg">
          {suggestions.map((advocate) => (
            <div
              key={advocate.id}
              className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
              onClick={() => setSearchTerm(advocate.name)}
            >
              {advocate.name}
            </div>
          ))}
        </div>
      )}

      <div className="flex space-x-4 mt-4">
        <button
          onClick={handleSearch}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
        >
          Search
        </button>
        <button
          onClick={handleClear}
          className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md"
        >
          Clear
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <div className="text-red-500 bg-red-100 p-4 rounded-md mt-4">
          {error}
        </div>
      )}

      {/* Loading State */}
      {loading && <p className="text-center text-gray-200 mt-4">Loading...</p>}

      {/* Search Results */}
      {!loading && results.length > 0 && (
        <div className="mt-6">
          <h2 className="text-xl font-bold mb-4">Search Results:</h2>
          <ul className="space-y-4">
            {results.map((advocate) => (
              <li
                key={advocate.id}
                className="bg-white text-black p-4 rounded-md shadow-md"
              >
                <img src={advocate.photo} alt="Advocate Photo" />
                <p>
                  <strong>Name:</strong> {advocate.name}
                </p>
                <p>
                  <strong>Phone:</strong> {advocate.mobileNumber}
                </p>
                <p>
                  <strong>Address:</strong> {advocate.address}
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* No Results */}
      {!loading && results.length === 0 && !error && (
        <p className="text-center text-gray-200 mt-4">No results found.</p>
      )}
    </div>
  );
}

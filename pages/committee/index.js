import { useState, useEffect } from "react";
import { getCommittees } from "@/pages/api/committees"; // Adjust the import path as necessary

export default function CommitteePage() {
  const [committees, setCommittees] = useState([]);
  const [year, setYear] = useState(new Date().getFullYear());

  useEffect(() => {
    fetchCommittees();
  }, [year]);

  const fetchCommittees = async () => {
    const data = await getCommittees({ year });
    setCommittees(data);
  };

  return (
    <div className="overflow-x-auto">
      <h1 className="text-4xl font-bold text-center mt-4 mb-8 border-b border-gray-300 pb-2">
        Committees
      </h1>

      <div className="mb-4 flex items-center">
        <label htmlFor="year" className="mr-2 text-lg">
          Year:
        </label>
        <select
          id="year"
          value={year}
          onChange={(e) => setYear(parseInt(e.target.value, 10))}
          className="border border-gray-300 rounded px-2 py-1"
        >
          {[...Array(10).keys()].map((i) => (
            <option
              key={new Date().getFullYear() - i}
              value={new Date().getFullYear() - i}
              className="hover:bg-gray-100"
            >
              {new Date().getFullYear() - i}
            </option>
          ))}
        </select>
      </div>

      <table className="min-w-full text-sm">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-4 border-b border-gray-300">Name</th>
            <th className="py-2 px-4 border-b border-gray-300">Designation</th>
          </tr>
        </thead>
        <tbody>
          {committees.map((committee) => (
            <tr key={committee.id} className="hover:bg-gray-100">
              <td className="py-2 px-4 border-b border-gray-300 text-center">
                {committee.name}
              </td>
              <td className="py-2 px-4 border-b border-gray-300 text-center">
                {committee.designation}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

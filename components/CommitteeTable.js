import { useState, useEffect } from "react";
import {
  createCommittee,
  getCommittees,
  updateCommittee,
  deleteCommittee,
} from "@/pages/api/committees"; // Adjust the import path as necessary

export default function CommitteePage() {
  const [committees, setCommittees] = useState([]);
  const [form, setForm] = useState({
    name: "",
    designation: "",

    year: "",
  });

  useEffect(() => {
    fetchCommittees();
  }, []);

  const fetchCommittees = async () => {
    const data = await getCommittees();
    setCommittees(data);
  };

  const handleCreate = async () => {
    await createCommittee(form);
    fetchCommittees();
    setForm({ name: "", designation: "", year: "" });
  };

  const handleUpdate = async (id, updates) => {
    await updateCommittee(id, updates);
    fetchCommittees();
  };

  const handleDelete = async (id) => {
    await deleteCommittee(id);
    fetchCommittees();
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="p-2 border border-gray-300 rounded"
        />
        <input
          type="text"
          placeholder="Designation"
          value={form.designation}
          onChange={(e) => setForm({ ...form, designation: e.target.value })}
          className="p-2 border border-gray-300 rounded"
        />

        <input
          type="text"
          placeholder="Year"
          value={form.year}
          onChange={(e) => setForm({ ...form, year: e.target.value })}
          className="p-2 border border-gray-300 rounded"
        />
        <button
          onClick={handleCreate}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Create Committee
        </button>
      </div>
      <ul className="space-y-2">
        {committees.map((committee) => (
          <li key={committee.id} className="flex items-center justify-between">
            <span className="text-lg">
              {committee.name} - {committee.designation} - {committee.year}
            </span>
            <div className="flex space-x-2">
              <button
                onClick={() =>
                  handleUpdate(committee.id, { name: "Updated Name" })
                }
                className="text-sm text-blue-500 hover:text-blue-700"
              >
                Update
              </button>
              <button
                onClick={() => handleDelete(committee.id)}
                className="text-sm text-red-500 hover:text-red-700"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

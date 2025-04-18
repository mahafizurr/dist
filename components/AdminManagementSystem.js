import CommitteeTable from "./CommitteeTable";
import NoticeTable from "./NoticeTable";

export default function AdminManagementSystem() {
  return (
    <div className="container mx-auto p-4 md:p-8">
      <h1 className="text-2xl font-bold mb-4 text-sky-900 text-center md:text-left">
        Admin Management System
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 mt-4 md:mt-8">
        <div className="bg-white shadow-md rounded-lg p-4 md:p-8 mb-4 md:mb-0">
          <h2 className="text-xl font-semibold mb-4 text-sky-900">
            Committee Management
          </h2>

          <p className="text-gray-700 mb-4">
            Add, edit, or remove committees and their members.
          </p>
          <CommitteeTable />
        </div>

        <div className="bg-white shadow-md rounded-lg p-4 md:p-8 mb-4 md:mb-0">
          <h2 className="text-xl font-semibold mb-4 text-sky-900">
            Notice Management
          </h2>
          <p className="text-gray-700 mb-4">
            Add, edit, or remove notices and announcements.
          </p>
          <NoticeTable />
        </div>
      </div>
    </div>
  );
}

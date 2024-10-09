export default function NoticeList({ notices = [] }) {
  return (
    <div className="container mx-auto p-6">
      {notices.map((notice) => (
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
        </div>
      ))}
    </div>
  );
}

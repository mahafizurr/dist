// pages/notices/[noticeId].js
import { useRouter } from "next/router";

export async function getServerSideProps({ params }) {
  const { noticeId } = params;

  const response = await fetch(
    `https://www.chapaibar.com/notices?noticeId=${noticeId}`
  );
  const notice = await response.json();

  if (!notice || notice.error) {
    return {
      notFound: true, // Will trigger a 404 page if notice is not found
    };
  }

  return {
    props: {
      notice,
    },
  };
}

const getFilePreview = (fileUrl) => {
  const imageExtensions = [".png", ".jpg", ".jpeg"];
  const isImage = imageExtensions.some((ext) => fileUrl.endsWith(ext));

  if (isImage) {
    return (
      <img
        src={fileUrl}
        alt="Image preview"
        className="w-full h-64 object-cover rounded-md"
        loading="lazy"
      />
    );
  } else if (fileUrl.endsWith(".pdf")) {
    return (
      <div className="flex justify-center items-center h-32">
        <img src="/path/to/pdf-icon.png" alt="PDF Icon" className="h-16" />
      </div>
    );
  } else {
    return <p className="text-gray-500">Unsupported file type</p>;
  }
};

export default function noticeDetails({ notice }) {
  const router = useRouter();

  // Optional: Handle navigation and loading state
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <div className="border border-gray-200 p-6 rounded-md shadow-lg bg-white">
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
      <div className="mt-4">{getFilePreview(notice.file_url)}</div>
      <div className="mt-6 flex space-x-4">
        <a
          href={notice.file_url}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-all shadow"
        >
          Preview
        </a>
        <a
          href={notice.file_url}
          download
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-all shadow"
        >
          Download
        </a>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-all shadow"
          onClick={() => router.back()}
        >
          Back to list
        </button>
      </div>
    </div>
  );
}

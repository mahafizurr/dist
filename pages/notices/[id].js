// pages/notices/[id].js
import { useRouter } from "next/router";

// Fetch individual notice data based on id
export async function getStaticProps({ params }) {
  const { id } = params;

  try {
    const response = await fetch(`https://www.chapaibar.com/notices?id=${id}`);

    // Check if the response is successful
    if (!response.ok) {
      return { notFound: true }; // Trigger a 404 page for server errors
    }

    // Check if the response is JSON
    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      return { notFound: true }; // Trigger a 404 page if not JSON
    }

    const notice = await response.json();

    // If the notice data is invalid
    if (!notice || notice.error) {
      return { notFound: true };
    }

    return {
      props: {
        notice,
      },
    };
  } catch (error) {
    console.error("Error fetching notice:", error);
    return { notFound: true }; // Handle errors
  }
}

// Fetch paths of available notices
export async function getStaticPaths() {
  try {
    const res = await fetch("https://www.chapaibar.com/api/notices");
    const notices = await res.json();

    // Create dynamic paths
    const paths = notices.map((notice) => ({
      params: { id: notice.id.toString() },
    }));

    return { paths, fallback: true }; // Enable fallback for unbuilt pages
  } catch (error) {
    console.error("Error fetching paths:", error);
    return {
      paths: [],
      fallback: true, // Enable fallback mode even in case of error
    };
  }
}

// Helper function for file preview (images, PDFs, etc.)
const getFilePreview = (fileUrl) => {
  const imageExtensions = [".png", ".jpg", ".jpeg"];
  const videoExtensions = [".mp4", ".webm"];
  const isImage = imageExtensions.some((ext) => fileUrl.endsWith(ext));
  const isVideo = videoExtensions.some((ext) => fileUrl.endsWith(ext));

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
  } else if (isVideo) {
    return (
      <video controls className="w-full h-64 rounded-md">
        <source src={fileUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    );
  } else {
    return <p className="text-gray-500">Unsupported file type</p>;
  }
};

// Main Notice Details component
export default function NoticeDetails({ notice }) {
  const router = useRouter();

  // Handle fallback state while page is being generated
  if (router.isFallback) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg font-semibold">Loading...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="border border-gray-200 p-6 rounded-md shadow-lg bg-white max-w-lg mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          {notice.file_name}
        </h1>

        {/* Notice Date */}
        <p className="text-sm text-gray-500 mb-4">
          Published on:{" "}
          {new Date(notice.created_at).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>

        {/* File Preview */}
        {notice.file_url ? (
          <div className="mt-4">{getFilePreview(notice.file_url)}</div>
        ) : (
          <p className="mt-4 text-gray-500">
            No file available for this notice.
          </p>
        )}

        {/* Action Buttons */}
        {notice.file_url && (
          <div className="mt-6 flex space-x-4 justify-center">
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
          </div>
        )}

        {/* Back Button */}
        <div className="mt-6 flex justify-center">
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-all shadow"
            onClick={() => router.back()}
          >
            Back to list
          </button>
        </div>
      </div>
    </div>
  );
}

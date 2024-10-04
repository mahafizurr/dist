// pages/notices/[noticeId].js
import { useRouter } from "next/router";

export async function getStaticProps({ params }) {
  const { noticeId } = params;

  try {
    const response = await fetch(
      `https://www.chapaibar.com/notices?noticeId=${noticeId}`
    );

    // Check if the response is successful
    if (!response.ok) {
      // If the response status is not in the range of 2xx
      return {
        notFound: true, // Trigger a 404 page if there is a server error
      };
    }

    // Check if the response content type is JSON
    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      return {
        notFound: true, // Trigger a 404 page if the content is not JSON
      };
    }

    const notice = await response.json();

    // If the notice data is invalid or there's an error in the response
    if (!notice || notice.error) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        notice,
      },
    };
  } catch (error) {
    // Handle any network or server errors here
    console.error("Error fetching notice:", error);
    return {
      notFound: true, // Trigger a 404 page if there's an error
    };
  }
}

export async function getStaticPaths() {
  try {
    const res = await fetch("https://www.chapaibar.com/api/notices");
    const notices = await res.json();

    // Get the paths we want to pre-render based on noticeId
    const paths = notices.map((notice) => ({
      params: { noticeId: notice.noticeId.toString() }, // Dynamic path
    }));

    // We'll pre-render only these paths at build time
    return { paths, fallback: true }; // Enable fallback for dynamic paths
  } catch (error) {
    return {
      paths: [],
      fallback: true, // Handle error, still enable fallback mode
    };
  }
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
    <div className="border border-gray-200 p-6 rounded-md shadow-lg bg-white max-w-lg mx-auto">
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

      {/* File Preview */}
      {notice.file_url ? (
        <div className="mt-4">{getFilePreview(notice.file_url)}</div>
      ) : (
        <p className="mt-4 text-gray-500">No file available for this notice.</p>
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
  );
}

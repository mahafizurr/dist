// pages/advocates/[advocateId].js
import { useRouter } from "next/router";

export async function getStaticProps({ params }) {
  const { advocateId } = params;

  try {
    const response = await fetch(
      `https://www.chapaibar.com/api/advocates?advocateId=${advocateId}`
    );
    const advocate = await response.json();

    if (!advocate || advocate.error) {
      return {
        notFound: true, // Trigger a 404 page if advocate is not found
      };
    }

    return {
      props: {
        advocate,
      },
      revalidate: 10, // Page will revalidate every 10 seconds
    };
  } catch (error) {
    return {
      notFound: true, // Handle errors by returning a 404
    };
  }
}

// Get the list of dynamic routes to pre-render
export async function getStaticPaths() {
  try {
    const res = await fetch("https://www.chapaibar.com/api/advocates");
    const advocates = await res.json();

    // Get the paths we want to pre-render based on advocateId
    const paths = advocates.map((advocate) => ({
      params: { advocateId: advocate.advocateId.toString() }, // Dynamic path
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

export default function AdvocateDetails({ advocate }) {
  const router = useRouter();

  // Optional: Handle fallback state while pre-rendering the page
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="md:flex justify-center items-center space-x-6">
        {/* Advocate Photo */}
        <div className="flex-shrink-0">
          <img
            src={advocate.photo}
            alt={`${advocate.name}'s photo`}
            className="w-32 h-32 md:w-48 md:h-48 rounded-md object-cover shadow-lg"
          />
        </div>

        {/* Advocate Details */}
        <div className="mt-6 md:mt-0">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            {advocate.name}
          </h1>
          <p className="text-gray-600 mb-1">
            <strong>BBC Sanad No:</strong> {advocate.bbcSanadNo}
          </p>
          <p className="text-gray-600 mb-1">
            <strong>Mobile Number:</strong> {advocate.mobileNumber}
          </p>
          <p className="text-gray-600 mb-1">
            <strong>Father's Name:</strong> {advocate.fatherName}
          </p>
          <p className="text-gray-600 mb-1">
            <strong>Address:</strong> {advocate.address}
          </p>
          <p className="text-gray-600 mb-1">
            <strong>Date of Joining:</strong> {advocate.dateofJoining}
          </p>
          <p className="text-gray-600 mb-1">
            <strong>Date of Enrollment:</strong> {advocate.dateofEnrollment}
          </p>

          {/* Back Button */}
          <button
            onClick={() => router.back()}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200"
          >
            Back to list
          </button>
        </div>
      </div>
    </div>
  );
}

import { useRouter } from "next/router";
export async function getServerSideProps({ params }) {
  const { employeeId } = params;

  const response = await fetch(
    `https://www.chapaibar.com/api/employees?employeeId=${employeeId}`
  );
  const employee = await response.json();

  if (!employee || employee.error) {
    return {
      notFound: true, // Will trigger a 404 page if employee is not found
    };
  }

  return {
    props: {
      employee,
    },
  };
}

export default function Employee({ employee }) {
  const router = useRouter();

  // Optional: Handle navigation and loading state
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="md:flex justify-center items-center space-x-6">
        {/* Employee Photo */}
        <div className="flex-shrink-0">
          <img
            src={employee.img}
            alt={`${employee.name}'s photo`}
            className="w-32 h-32 md:w-48 md:h-48 rounded-md object-cover shadow-lg"
          />
        </div>

        {/* Employee Details */}
        <div className="mt-6 md:mt-0">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            {employee.name}
          </h1>
          <p className="text-gray-600 mb-1">
            <strong>Designation:</strong> {employee.designation}
          </p>
          <p className="text-gray-600 mb-1">
            <strong>Mobile Number:</strong> {employee.mobile}
          </p>
          <p className="text-gray-600 mb-1">
            <strong>Father's Name:</strong> {employee.fatherName}
          </p>
          <p className="text-gray-600 mb-1">
            <strong>Address:</strong> {employee.address}
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

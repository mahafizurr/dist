import Link from "next/link";

const EmployeeTable = ({ employees }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mx-6 my-12">
      {employees.map((emp, index) => (
        <div
          key={emp.id}
          className={`border p-4 rounded-lg flex flex-col items-center transition-transform transform hover:scale-105 cursor-pointer ${
            index === 0 ? "lg:col-span-4" : ""
          }`}
        >
          <div className="relative w-32 h-32 mx-auto mb-4">
            <img
              src={emp.img}
              alt={`${emp.name} photos`}
              className="rounded-full object-cover shadow-md w-full h-full"
            />
            <div className="absolute bottom-0 right-0 bg-green-500 text-white p-1 rounded-full text-xs">
              {emp.designation.split(" ")[0]}
            </div>
          </div>
          <h2 className="text-xl font-semibold text-blue-800">{emp.name}</h2>
          <p className="text-gray-600 text-md mt-2">
            <span className="font-bold">Designation: </span> {emp.designation}
          </p>
          <p className="text-gray-600 text-md mt-1">
            <span className="font-bold">Mobile: </span> {emp.mobile}
          </p>
          <p className="text-blue-800  italic  mt-1">
            <Link href={`/employees/${emp.id}`}>read more</Link>
          </p>
        </div>
      ))}
    </div>
  );
};
export default EmployeeTable;

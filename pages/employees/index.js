import EmployeeTable from "@/components/EmployeeTable";
import Link from "next/link";

export async function getServerSideProps() {
  const response = await fetch("https://www.chapaibar.com/api/employees");
  const employees = await response.json();

  return {
    props: {
      employees,
    },
  };
}

export default function Employees({ employees }) {
  return (
    <div>
      <h1 className="text-3xl font-bold my-8 text-center text-sky-900 border-b-2 border-orange-300">
        Employee List
      </h1>
      <EmployeeTable employees={employees} />
    </div>
  );
}

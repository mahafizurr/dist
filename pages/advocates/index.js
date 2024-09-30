import AdvocateTable from "@/components/AdvocateTable";

export async function getServerSideProps() {
  const response = await fetch("http://localhost:3000/api/advocates");
  const advocates = await response.json();

  return {
    props: {
      advocates,
    },
  };
}

export default function Advocates({ advocates }) {
  return (
    <div>
      <h1 className="text-3xl font-bold mt-8 text-center text-sky-900 border-b-2 border-orange-300">
        Advocate List
      </h1>

      <AdvocateTable advocates={advocates} />
    </div>
  );
}

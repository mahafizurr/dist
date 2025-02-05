import AdvocateTable from "@/components/AdvocateTable";

export async function getStaticProps() {
  const response = await fetch("https://www.chapaibar.com/api/advocates");
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
      <h1 className="text-3xl font-bold mt-8 text-center text-sky-900 ">
        Advocate List
      </h1>

      <AdvocateTable advocates={advocates} />
    </div>
  );
}

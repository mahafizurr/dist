import NoticeTable from "@/components/NoticeTable";

export async function getServerSideProps() {
  const response = await fetch("http://localhost:3000/api/notices");
  const notices = await response.json();

  return {
    props: {
      notices,
    },
  };
}

export default function Notice({ notices }) {
  return (
    <div>
      <h1 className="text-3xl font-bold mt-8 text-center text-sky-900 border-b-2 border-orange-300">
        Notice List
      </h1>

      <NoticeTable notices={notices} />
    </div>
  );
}

import NoticeTable from "@/components/NoticeTable";

export async function getStaticProps() {
  const response = await fetch("https://www.chapaibar.com/api/notices");
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

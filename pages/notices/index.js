import NoticeTable from "@/components/NoticeTable";
import axios from "axios";

export async function getServerSideProps() {
  try {
    const response = await axios.get("https://www.chapaibar.com/api/notices");
    const notices = response.data;

    return {
      props: {
        notices,
      },
    };
  } catch (error) {
    console.error("Error fetching notices:", error);
    return {
      props: {
        notices: [],
      },
    };
  }
}

export default function Notice({ notices }) {
  return (
    <div>
      <h1 className="text-3xl font-bold mt-8 text-center text-sky-900">
        Notice List
      </h1>

      <NoticeTable notices={notices} />
    </div>
  );
}

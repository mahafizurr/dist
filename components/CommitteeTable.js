import Link from "next/link";
import { useRouter } from "next/router";

export default function CommitteeTable() {
  const router = useRouter();

  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col md:flex-row m-4">
        {/* Sidebar: Previous Committee List */}
        <div className="bg-gray-100 border-r-4 border-orange-300 p-4 mb-4 md:mb-0 md:w-1/4">
          <h2 className="text-xl font-bold mb-4 text-sky-900">
            Previous Committee List
          </h2>
          <ul className="flex flex-col space-y-2">
            {[
              { name: "2023", path: "/committee" },
              { name: "2022", path: "/committee" },
              { name: "2021", path: "/committee" },
              { name: "2020", path: "/committee" },
              { name: "2019", path: "/committee" },
              { name: "2018", path: "/committee" },
              { name: "2017", path: "/committee" },
            ].map((item, index) => (
              <li key={index}>
                <Link
                  href={item.path}
                  className={`block text-sm md:text-base lg:text-lg xl:text-xl p-2 rounded-md transition-all duration-300 ${
                    router.query.year === item.name
                      ? "bg-orange-300 text-sky-950"
                      : "bg-sky-950 text-white hover:bg-orange-300 hover:text-sky-950 hover:scale-105"
                  }`}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Main Content */}
        <div className="flex-1 md:ml-4">
          <h1 className="text-3xl font-bold mb-6 text-center text-sky-900">
            Present Committee 2024
          </h1>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border-separate border-spacing-2 border border-slate-400">
              <thead>
                <tr className="bg-white hover:bg-gray-100">
                  <th className="border p-2 font-bangla">পদের নাম</th>
                  <th className="border p-2 font-bangla">
                    বিজ্ঞ এ্যাডভোকেটগণের নাম
                  </th>
                  <th className="border p-2 font-bangla">মোবাইল নম্বর</th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    position: "সভাপতি",
                    name: "মোঃ সোলায়মান (বিশু)",
                    mobile: "01711066275",
                  },
                  {
                    position: "সিনিয়র সহ-সভাপতি",
                    name: "মোহাঃ আব্দুস সাত্তার (১)",
                    mobile: "01714657394",
                  },
                  {
                    position: "সহ-সভাপতি",
                    name: "আলঃ মোহাঃ সোহরাব আলী (২)",
                    mobile: "01718823600",
                  },
                  {
                    position: "সাধারন সম্পাদক",
                    name: "মোহাঃ একরামুল হক (পিন্টু)",
                    mobile: "01715210327",
                  },
                  {
                    position: "সহ-সাধারন সম্পাদক",
                    name: "মোঃ তসিবুর রহমান",
                    mobile: "01732962132",
                  },
                  {
                    position: "সহ-সাধারন সম্পাদক",
                    name: "মোঃ শহিদুল ইসলাম (পলাশ)",
                    mobile: "01719168418",
                  },
                  {
                    position: "অর্থ সম্পাদক",
                    name: "মোঃ মাসির আলী",
                    mobile: "01715844811",
                  },
                  {
                    position: "গ্রন্থাগার সম্পাদক",
                    name: "মোঃ নূরে আলম সিদ্দিকী (আসাদ)",
                    mobile: "01737746972",
                  },
                  {
                    position: "সাংস্কৃতিক সম্পাদক",
                    name: "মোঃ জহির জামান (জনি)",
                    mobile: "01737215011",
                  },
                  {
                    position: "নির্বাহী সদস্য",
                    name: "আলহাজ্ব মোঃ নাজমুল আজম",
                    mobile: "01713701139",
                  },
                  {
                    position: "নির্বাহী সদস্য",
                    name: "মোহাঃ মাহমুদুল ইসলাম (কনক)",
                    mobile: "01721335620",
                  },
                  {
                    position: "নির্বাহী সদস্য",
                    name: "তানভীর আহমেদ সিদ্দিকী",
                    mobile: "01790230423",
                  },
                  {
                    position: "নির্বাহী সদস্য",
                    name: "মোঃ মাইনুল ইসলাম (অন্তর)",
                    mobile: "01712363280",
                  },
                  {
                    position: "নির্বাহী সদস্য",
                    name: "মু: আবুল কালাম আযাদ",
                    mobile: "01773722947",
                  },
                  {
                    position: "নির্বাহী সদস্য",
                    name: "মোঃ ইমরুল কায়েস",
                    mobile: "01751267999",
                  },
                ].map((member, index) => (
                  <tr key={index} className="bg-gray-100">
                    <td className="border border-slate-300 px-4 py-2">
                      {member.position}
                    </td>
                    <td className="border border-slate-300 px-4 py-2">
                      {member.name}
                    </td>
                    <td className="border border-slate-300 px-4 py-2">
                      {member.mobile}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

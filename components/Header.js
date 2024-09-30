import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhoneAlt } from "@fortawesome/free-solid-svg-icons";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import Link from "next/link";
import { useRouter } from "next/router";

const Header = () => {
  const router = useRouter();
  return (
    <>
      <div className="scroll-smooth focus:scroll-auto">
        <div className="flex justify-center items-center border-b-2 border-orange-300 px-8 py-2 bg-gray-100 text-green-900 text-sm">
          <div className="flex items-center space-x-4">
            <FontAwesomeIcon icon={faPhoneAlt} aria-hidden="true" />
            <span>+880258893306</span>
          </div>
          <div className="flex items-center pl-4 space-x-4">
            <FontAwesomeIcon icon={faGoogle} aria-hidden="true" />
            <span>advbarcnj@gmail.com</span>
          </div>
        </div>

        <div className="grid justify-center mt-4 animate-fadeIn">
          <img
            src="/headerlogo.png"
            alt="Chapai Bar logo"
            width={728}
            height={90}
            className="mx-auto transition-transform duration-500 ease-in-out hover:scale-110"
          />
        </div>

        <div className="sticky top-0 z-10">
          <ul className="flex justify-center items-center bg-sky-950 p-3 shadow-md">
            {[
              { name: "Home", path: "/" },
              { name: "Member Directory", path: "/advocates" },
              { name: "Employee", path: "/employees" },
              { name: "Notices", path: "/notices" },
              { name: "Contact", path: "/contact" },
            ].map((item, index) => (
              <li key={index} className="mx-4">
                <Link
                  href={item.path}
                  className="text-white font-semibold text-lg transition duration-300 ease-in-out transform hover:scale-105 hover:text-gray-200"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {router.pathname === "/" && (
          <div className="flex justify-center items-center border-b-8 border-sky-950">
            <img
              src="/banner.jpg"
              alt="Banner"
              className="w-full shadow-md transition-transform duration-500 ease-in-out hover:scale-105"
            />
          </div>
        )}
      </div>
    </>
  );
};

export default Header;

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhoneAlt } from "@fortawesome/free-solid-svg-icons";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import Link from "next/link";
import { useRouter } from "next/router";

const Header = () => {
  const router = useRouter();
  return (
    <>
      <div className="container mx-auto">
        {/* Top Contact Bar */}
        <div className="flex sm:flex-row md:flex-row justify-center items-center border-b-2 border-orange-300 px-4 py-2 bg-gray-100 text-green-900 text-sm md:text-base">
          <div className="flex items-center space-x-2 md:space-x-4">
            <FontAwesomeIcon icon={faPhoneAlt} aria-hidden="true" />
            <span className="text-xs md:text-sm lg:text-base">
              +880258893306
            </span>
          </div>
          <div className="flex items-center ml-4 space-x-2 md:space-x-4 mt-2 md:mt-0">
            <FontAwesomeIcon icon={faGoogle} aria-hidden="true" />
            <span className="text-xs md:text-sm lg:text-base">
              advbarcnj@gmail.com
            </span>
          </div>
        </div>

        {/* Logo Section */}
        <div className="grid justify-center mt-2 md:mt-4 animate-fadeIn">
          <img
            src="/headerlogo.png"
            alt="Chapai Bar logo"
            width={728}
            height={90}
            className="mx-auto w-3/4 md:w-1/2 transition-transform duration-500 ease-in-out hover:scale-110"
          />
        </div>

        {/* Navigation Menu */}
        <div className="sticky top-0 z-10">
          <ul className="flex justify-center items-center bg-sky-950 p-2 md:p-3 shadow-md space-x-2 md:space-x-4 lg:space-x-6">
            {[
              { name: "Home", path: "/" },
              { name: "Committee", path: "/committee" },
              { name: "Members", path: "/advocates" },
              { name: "Employee", path: "/employees" },
              { name: "Notices", path: "/notices" },
              { name: "Contact", path: "/contact" },
            ].map((item, index) => (
              <li key={index}>
                <Link
                  href={item.path}
                  className="text-white text-sm md:text-base lg:text-lg xl:text-xl hover:scale-105 hover:text-orange-300 transition duration-300"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Conditional Banner Section */}
        {router.pathname === "/" && (
          <div className="border-b-8 border-sky-950">
            <img
              src="/banner.jpg"
              alt="Banner"
              className="w-full h-40 md:h-64 lg:h-80 xl:h-96 object-cover transition-transform duration-500 ease-in-out hover:scale-105"
            />
          </div>
        )}
      </div>
    </>
  );
};

export default Header;

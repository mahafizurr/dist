import Link from "next/link";

const Footer = () => {
  return (
    <>
      <div className="w-full">
        <div className="grid justify-center mt-12 mb-4 border-t-2 border-orange-300">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d641.3097530684835!2d88.27660278735797!3d24.596242422949953!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39fbb7f9aab17b41%3A0x35afd5fc57087361!2sAdvocate%20Bar%20Association!5e0!3m2!1sen!2sus!4v1727672602197!5m2!1sen!2sus"
            className="w-full h-64 md:h-96 "
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer"
          ></iframe>
        </div>

        <div className="w-full flex flex-col md:flex-row justify-between items-start md:items-center bg-sky-950 text-white p-6 space-y-6 md:space-y-0 md:space-x-6 border-t-2 border-orange-300">
          {/* Contact Info */}
          <div className="flex-1">
            <h2 className=" text-lg text-yellow-400 font-semibold mb-2">
              Contact Us
            </h2>
            <p>Chapainawabganj Court, Chapainawabganj</p>
            <p>Post Code - 6300, Thana: Chapainawabganj Sadar</p>
            <p>Mobile Number: +880258893306</p>
            <p>
              Email:{" "}
              <a
                href="mailto:advbarcnj@gmail.com"
                className="underline hover:text-gray-300"
              >
                advbarcnj@gmail.com
              </a>
            </p>
          </div>

          {/* Main Menu */}
          <div className="flex-1">
            <h2 className="text-lg text-yellow-400 font-semibold mb-2">
              Main Menu
            </h2>
            <ul className="space-y-2 list-none">
              <li className="relative pl-6 before:content-['•'] before:absolute before:left-0 before:text-orange-500">
                <Link href="/" className="hover:text-gray-300">
                  Home
                </Link>
              </li>
              <li className="relative pl-6 before:content-['•'] before:absolute before:left-0 before:text-orange-500">
                <Link href="/advocates" className="hover:text-gray-300">
                  Member Directory
                </Link>
              </li>
              <li className="relative pl-6 before:content-['•'] before:absolute before:left-0 before:text-orange-500">
                <Link href="/employees" className="hover:text-gray-300">
                  Employee
                </Link>
              </li>
              <li className="relative pl-6 before:content-['•'] before:absolute before:left-0 before:text-orange-500">
                <Link href="/notices" className="hover:text-gray-300">
                  Notice
                </Link>
              </li>
            </ul>
          </div>

          {/* Important Links */}
          <div className="flex-1">
            <h2 className="text-lg text-yellow-400 font-semibold mb-2">
              Important Links
            </h2>
            <ul className="space-y-2 list-none">
              <li className="relative pl-6 before:content-['•'] before:absolute before:left-0 before:text-orange-500">
                <Link
                  href="http://www.bangabhaban.gov.bd/"
                  target="_blank"
                  className="hover:text-gray-300"
                >
                  Office of the Hon’ble President
                </Link>
              </li>
              <li className="relative pl-6 before:content-['•'] before:absolute before:left-0 before:text-orange-500">
                <Link
                  href="http://www.supremecourt.gov.bd/"
                  target="_blank"
                  className="hover:text-gray-300"
                >
                  Supreme Court of Bangladesh
                </Link>
              </li>
              <li className="relative pl-6 before:content-['•'] before:absolute before:left-0 before:text-orange-500">
                <Link
                  href="https://lawjusticediv.gov.bd/"
                  target="_blank"
                  className="hover:text-gray-300"
                >
                  Law and Justice Division
                </Link>
              </li>
              <li className="relative pl-6 before:content-['•'] before:absolute before:left-0 before:text-orange-500">
                <Link
                  href="http://bdlaws.minlaw.gov.bd/"
                  target="_blank"
                  className="hover:text-gray-300"
                >
                  Laws of Bangladesh
                </Link>
              </li>
              <li className="relative pl-6 before:content-['•'] before:absolute before:left-0 before:text-orange-500">
                <Link
                  href="https://bangladesh.gov.bd/index.php"
                  target="_blank"
                  className="hover:text-gray-300"
                >
                  Bangladesh National Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Logo */}
          <div className="flex-shrink-0">
            <img
              src="/Logo.png"
              alt="Logo"
              width={150}
              height={150}
              className="rounded-md shadow-lg"
            />
          </div>
        </div>

        <div className="w-full grid justify-center items-center bg-black text-white py-8 border-t-2 border-orange-300">
          <p>
            &copy; {new Date().getFullYear()} District Bar Association Chapai
            Nawabganj
          </p>
        </div>
      </div>
    </>
  );
};

export default Footer;

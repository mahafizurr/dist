import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhoneAlt,
  faMapMarkerAlt,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";

const Contact = () => {
  return (
    <div className="container px-4 py-4 md:py-8">
      <h1 className="text-3xl font-bold mb-6 text-center text-sky-900 border-b-2 border-orange-300">
        Contact Us
      </h1>

      <div className="bg-white p-6 md:p-8 max-w-3xl mx-auto">
        <div className="flex flex-col space-y-6 md:space-y-0 md:space-x-8 md:flex-row justify-center items-start">
          {/* Address */}
          <div className="flex items-start space-x-4">
            <FontAwesomeIcon
              icon={faMapMarkerAlt}
              className="text-sky-600 text-2xl"
            />
            <div>
              <span className="font-semibold text-lg block">Address:</span>
              <p className="text-gray-700">
                Post Code - 6300,
                <br /> Thana: Chapainawabganj Sadar <br />
                Chapainawabganj Court, Chapainawabganj
              </p>
            </div>
          </div>

          {/* Phone */}
          <div className="flex items-start space-x-4">
            <FontAwesomeIcon
              icon={faPhoneAlt}
              className="text-sky-600 text-2xl"
            />
            <div>
              <span className="font-semibold text-lg block">Phone:</span>
              <a
                href="tel:+880258893306"
                className="text-blue-500 hover:underline"
              >
                +880258893306
              </a>
            </div>
          </div>

          {/* Email */}
          <div className="flex items-start space-x-4">
            <FontAwesomeIcon
              icon={faEnvelope}
              className="text-sky-600 text-2xl"
            />
            <div>
              <span className="font-semibold text-lg block">Email:</span>
              <a
                href="mailto:advbarcnj@gmail.com"
                className="text-blue-500 hover:underline"
              >
                advbarcnj@gmail.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;

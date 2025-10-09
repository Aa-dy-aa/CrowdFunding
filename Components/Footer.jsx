import React from "react";

const Footer = () => {
  const productList = ["Market", "ERC20 Token", "Donation"];
  const contactList = [
    "support@cryptoking.com",
    "info@example.com",
    "Contact us",
  ];
  const usefullLink = ["Home", "About Us", "Company Bio"];
  const downloadList = ["iOS", "Android", "Windows", "MacOS"];

  return (
    <footer className="bg-black text-gray-200">
      <div className="mx-auto w-full max-w-screen-xl">
        <div className="grid grid-cols-2 gap-8 px-4 py-6 lg:py-8 md:grid-cols-4">
          <div>
            <h2 className="mb-6 text-base font-bold uppercase">Products</h2>
            <ul className="font-medium">
              {productList.map((item, idx) => (
                <li key={idx} className="mb-4">
                  <a href="#" className="hover:text-blue-400">{item}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="mb-6 text-base font-bold uppercase">Useful Links</h2>
            <ul className="font-medium">
              {usefullLink.map((item, idx) => (
                <li key={idx} className="mb-4">
                  <a href="#" className="hover:text-blue-400">{item}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="mb-6 text-base font-bold uppercase">Contacts</h2>
            <ul className="font-medium">
              {contactList.map((item, idx) => (
                <li key={idx} className="mb-4">
                  <a href="#" className="hover:text-blue-400">{item}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="mb-6 text-base font-bold uppercase">Download</h2>
            <ul className="font-medium">
              {downloadList.map((item, idx) => (
                <li key={idx} className="mb-4">
                  <a href="#" className="hover:text-blue-400">{item}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="w-full bg-black border-t border-gray-800">
        <div className="max-w-screen-xl mx-auto px-4 py-6 flex flex-col sm:flex-row justify-between items-center">
          <span className="text-sm text-gray-400 text-center sm:text-left mb-4 sm:mb-0">
            © 2023 <a href="https://flowbite.com/" className="hover:text-blue-400">Flowbite™</a>. All Rights Reserved.
          </span>
          <div className="flex justify-center sm:justify-end space-x-5 rtl:space-x-reverse">
            <a href="#" className="text-gray-400 hover:text-blue-400">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 8 19" xmlns="http://www.w3.org/2000/svg">
                <path
                  fillRule="evenodd"
                  d="M6.135 3H8V0H6.135a4.147 4.147 0 0 0-4.142 4.142V6H0v3h2v9.938h3V9h2.021l.592-3H5V3.591A.6.6 0 0 1 5.592 3h.543Z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="sr-only">Facebook page</span>
            </a>
            <a href="#" className="text-gray-400 hover:text-blue-400">
              <span className="sr-only">Twitter page</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import React from "react";
import { useState } from "react";

const Header = () => {
  const [menuOpen, onMenuClose] = useState(true);
  const showSidebar = () => onMenuClose(!menuOpen);
  return (
    <>
      <div
        className="bg-main absolute top-0 right-0 z-30 p-2"
        onClick={showSidebar}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24"
          height="24"
        >
          <path fill="none" d="M0 0h24v24H0z" />
          <path fill="#fff" d="M18 18v2H6v-2h12zm3-7v2H3v-2h18zm-3-7v2H6V4h12z" />
        </svg>
      </div>

      <div
        className={
          menuOpen
            ? "bg-gray-200 nav absolute z-20 right-0 transform hidden translate-x-full"
            : 'class="bg-gray-200 nav absolute z-20 block right-0'
        }
      >
        <div class="flex flex-col sm:flex-row sm:justify-around">
          <div class="w-64 h-full bg-main">
            <nav class="my-10">
              <a
                class="flex items-center py-2 px-8 bg-gray-200 text-gray-700  border-gray-700"
                href="#"
              >
                <span class="mx-4 text-white font-medium">Home</span>
              </a>

              <a
                class="flex items-center mt-2 py-2 px-8 text-gray-600  hover:bg-gray-200 hover:text-gray-700 hover:border-gray-700"
                href="#"
              >
                <span class="mx-4 text-white font-medium">About</span>
              </a>

              <a
                class="flex items-center mt-2 py-2 px-8 text-gray-600  hover:bg-gray-200 hover:text-gray-700 hover:border-gray-700"
                href="#"
              >
                <span class="mx-4 text-white font-medium">Collection</span>
              </a>

              <a
                class="flex items-center mt-2 py-2 px-8 text-gray-600  hover:bg-gray-200 hover:text-gray-700 hover:border-gray-700"
                href="#"
              >
                <span class="mx-4 text-white font-medium">Export</span>
              </a>
              <a
                class="flex items-center mt-2 py-2 px-8 text-gray-600  hover:bg-gray-200 hover:text-gray-700 hover:border-gray-700"
                href="#"
              >
                <span class="mx-4 text-white font-medium">Catalogue</span>
              </a>
              <a
                class="flex items-center mt-2 py-2 px-8 text-gray-600  hover:bg-gray-200 hover:text-gray-700 hover:border-gray-700"
                href="#"
              >
                <span class="mx-4 text-white font-medium">Media</span>
              </a>
              <a
                class="flex items-center mt-2 py-2 px-8 text-gray-600 hover:bg-gray-200 hover:text-gray-700 hover:border-gray-700"
                href="#"
              >
                <span class="mx-4 text-white font-medium">Informational</span>
              </a>
              <a
                class="flex items-center mt-2 py-2 px-8 text-gray-600 hover:bg-gray-200 hover:text-gray-700 hover:border-gray-700"
                href="#"
              >
                <span class="mx-4 text-white font-medium">Contact Us</span>
              </a>
            </nav>
          </div>

         
        </div>
      </div>
    </>
  );
};

export default Header;

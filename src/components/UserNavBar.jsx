import React from "react";

import logotext from "../assets/hosteledge logo.png";
import logo from "../assets/hosteledge logo text.png";

function UserNavBar() {
  return (
    <>
      <div className="relative font-[sans-serif] pt-[70px] h-screen">
        <header className="flex shadow-md py-1 px-4 sm:px-7 bg-gradient-to-tl from-white from-50% to-green-200 to-80  min-h-[70px] tracking-wide z-[110] fixed top-0 w-full">
          <div className="flex flex-wrap items-center justify-between gap-4 w-full relative">
          <span  className="flex">
            <img
                className="w-auto h-8 lg:h-10"
                src={logotext}
                alt="Logo"
              />
              <img
                className="w-auto h-8 lg:h-10"
                src={logo}
                alt="Logo"
              />
             
            </span>

            <div
              id="collapseMenu"
              className="max-lg:hidden lg:!block max-lg:before:fixed max-lg:before:bg-black max-lg:before:opacity-50 max-lg:before:inset-0 max-lg:before:z-50"
            >
              <button
                id="toggleClose"
                className="lg:hidden fixed top-2 right-4 z-[100] rounded-full bg-white p-3"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-3 fill-black"
                  viewBox="0 0 320.591 320.591"
                >
                  <path
                    d="M30.391 318.583a30.37 30.37 0 0 1-21.56-7.288c-11.774-11.844-11.774-30.973 0-42.817L266.643 10.665c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875L51.647 311.295a30.366 30.366 0 0 1-21.256 7.288z"
                    data-original="#000000"
                  ></path>
                  <path
                    d="M287.9 318.583a30.37 30.37 0 0 1-21.257-8.806L8.83 51.963C-2.078 39.225-.595 20.055 12.143 9.146c11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414a30.368 30.368 0 0 1-23.078 7.288z"
                    data-original="#000000"
                  ></path>
                </svg>
              </button>

              <div className="max-lg:fixed max-lg:bg-white max-lg:w-1/2 max-lg:min-w-[300px] max-lg:top-0 max-lg:left-0 max-lg:p-6 max-lg:h-full max-lg:shadow-md max-lg:overflow-auto z-50">
                <div className="flex items-center max-lg:flex-col-reverse max-lg:ml-auto gap-8">
                  <div className="flex w-full bg-gray-100 px-4 py-2.5 rounded outline-none border focus-within:border-blue-600 focus-within:bg-transparent transition-all">
                    <input
                      type="text"
                      placeholder="Search something..."
                      className="w-full text-sm bg-transparent rounded outline-none pr-2"
                    />
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 192.904 192.904"
                      width="16px"
                      className="cursor-pointer fill-gray-400"
                    >
                      <path d="m190.707 180.101-47.078-47.077c11.702-14.072 18.752-32.142 18.752-51.831C162.381 36.423 125.959 0 81.191 0 36.422 0 0 36.423 0 81.193c0 44.767 36.422 81.187 81.191 81.187 19.688 0 37.759-7.049 51.831-18.751l47.079 47.078a7.474 7.474 0 0 0 5.303 2.197 7.498 7.498 0 0 0 5.303-12.803zM15 81.193C15 44.694 44.693 15 81.191 15c36.497 0 66.189 29.694 66.189 66.193 0 36.496-29.692 66.187-66.189 66.187C44.693 147.38 15 117.689 15 81.193z"></path>
                    </svg>
                  </div>
                  <div className="flex items-center space-x-6 max-lg:flex-wrap">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5 cursor-pointer fill-[#333] hover:fill-[#077bff]"
                      viewBox="0 0 511 511.999"
                    >
                      <path
                        d="M498.7 222.695c-.016-.011-.028-.027-.04-.039L289.805 13.81C280.902 4.902 269.066 0 256.477 0c-12.59 0-24.426 4.902-33.332 13.809L14.398 222.55c-.07.07-.144.144-.21.215-18.282 18.386-18.25 48.218.09 66.558 8.378 8.383 19.44 13.235 31.273 13.746.484.047.969.07 1.457.07h8.32v153.696c0 30.418 24.75 55.164 55.168 55.164h81.711c8.285 0 15-6.719 15-15V376.5c0-13.879 11.293-25.168 25.172-25.168h48.195c13.88 0 25.168 11.29 25.168 25.168V497c0 8.281 6.715 15 15 15h81.711c30.422 0 55.168-24.746 55.168-55.164V303.14h7.719c12.586 0 24.422-4.903 33.332-13.813 18.36-18.367 18.367-48.254.027-66.633zm-21.243 45.422a17.03 17.03 0 0 1-12.117 5.024h-22.72c-8.285 0-15 6.714-15 15v168.695c0 13.875-11.289 25.164-25.168 25.164h-66.71V376.5c0-30.418-24.747-55.168-55.169-55.168H232.38c-30.422 0-55.172 24.75-55.172 55.168V482h-66.71c-13.876 0-25.169-11.29-25.169-25.164V288.14c0-8.286-6.715-15-15-15H48a13.9 13.9 0 0 0-.703-.032c-4.469-.078-8.66-1.851-11.8-4.996-6.68-6.68-6.68-17.55 0-24.234.003 0 .003-.004.007-.008l.012-.012L244.363 35.02A17.003 17.003 0 0 1 256.477 30c4.574 0 8.875 1.781 12.113 5.02l208.8 208.796.098.094c6.645 6.692 6.633 17.54-.031 24.207zm0 0"
                        data-original="#000000"
                      />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5 cursor-pointer fill-[#333] hover:fill-[#077bff]"
                      viewBox="0 0 371.263 371.263"
                    >
                      <path
                        d="M305.402 234.794v-70.54c0-52.396-33.533-98.085-79.702-115.151.539-2.695.838-5.449.838-8.204C226.539 18.324 208.215 0 185.64 0s-40.899 18.324-40.899 40.899c0 2.695.299 5.389.778 7.964-15.868 5.629-30.539 14.551-43.054 26.647-23.593 22.755-36.587 53.354-36.587 86.169v73.115c0 2.575-2.096 4.731-4.731 4.731-22.096 0-40.959 16.647-42.995 37.845-1.138 11.797 2.755 23.533 10.719 32.276 7.904 8.683 19.222 13.713 31.018 13.713h72.217c2.994 26.887 25.869 47.905 53.534 47.905s50.54-21.018 53.534-47.905h72.217c11.797 0 23.114-5.03 31.018-13.713 7.904-8.743 11.797-20.479 10.719-32.276-2.036-21.198-20.958-37.845-42.995-37.845a4.704 4.704 0 0 1-4.731-4.731zM185.64 23.952c9.341 0 16.946 7.605 16.946 16.946 0 .778-.12 1.497-.24 2.275-4.072-.599-8.204-1.018-12.336-1.138-7.126-.24-14.132.24-21.078 1.198-.12-.778-.24-1.497-.24-2.275.002-9.401 7.607-17.006 16.948-17.006zm0 323.358c-14.431 0-26.527-10.3-29.342-23.952h58.683c-2.813 13.653-14.909 23.952-29.341 23.952zm143.655-67.665c.479 5.15-1.138 10.12-4.551 13.892-3.533 3.773-8.204 5.868-13.353 5.868H59.89c-5.15 0-9.82-2.096-13.294-5.868-3.473-3.772-5.09-8.743-4.611-13.892.838-9.042 9.282-16.168 19.162-16.168 15.809 0 28.683-12.874 28.683-28.683v-73.115c0-26.228 10.419-50.719 29.282-68.923 18.024-17.425 41.498-26.887 66.528-26.887 1.198 0 2.335 0 3.533.06 50.839 1.796 92.277 45.929 92.277 98.325v70.54c0 15.809 12.874 28.683 28.683 28.683 9.88 0 18.264 7.126 19.162 16.168z"
                        data-original="#000000"
                      />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5 cursor-pointer fill-[#333] hover:fill-[#077bff]"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M18 2c2.206 0 4 1.794 4 4v12c0 2.206-1.794 4-4 4H6c-2.206 0-4-1.794-4-4V6c0-2.206 1.794-4 4-4zm0-2H6a6 6 0 0 0-6 6v12a6 6 0 0 0 6 6h12a6 6 0 0 0 6-6V6a6 6 0 0 0-6-6z"
                        data-original="#000000"
                      />
                      <path
                        d="M12 18a1 1 0 0 1-1-1V7a1 1 0 0 1 2 0v10a1 1 0 0 1-1 1z"
                        data-original="#000000"
                      />
                      <path
                        d="M6 12a1 1 0 0 1 1-1h10a1 1 0 0 1 0 2H7a1 1 0 0 1-1-1z"
                        data-original="#000000"
                      />
                    </svg>
                  </div>

                  <div className="dropdown-menu relative flex shrink-0 group">
                    <img
                      src="https://readymadeui.com/team-1.webp"
                      alt="profile-pic"
                      className="w-9 h-9 max-lg:w-16 max-lg:h-16 rounded-full border-2 border-gray-300 cursor-pointer"
                    />

                    <div className="dropdown-content hidden group-hover:block shadow-md p-2 bg-white rounded-md absolute top-9 right-0 w-56">
                      <div className="w-full">
                        <span
                          href="#"
                          className="text-sm text-gray-800 cursor-pointer flex items-center p-2 rounded-md hover:bg-gray-100 dropdown-item transition duration-300 ease-in-out"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-4 h-4 mr-3 fill-current"
                            viewBox="0 0 512 512"
                          >
                            <path
                              d="M437.02 74.98C388.668 26.63 324.379 0 256 0S123.332 26.629 74.98 74.98C26.63 123.332 0 187.621 0 256s26.629 132.668 74.98 181.02C123.332 485.37 187.621 512 256 512s132.668-26.629 181.02-74.98C485.37 388.668 512 324.379 512 256s-26.629-132.668-74.98-181.02zM111.105 429.297c8.454-72.735 70.989-128.89 144.895-128.89 38.96 0 75.598 15.179 103.156 42.734 23.281 23.285 37.965 53.687 41.742 86.152C361.641 462.172 311.094 482 256 482s-105.637-19.824-144.895-52.703zM256 269.507c-42.871 0-77.754-34.882-77.754-77.753C178.246 148.879 213.13 114 256 114s77.754 34.879 77.754 77.754c0 42.871-34.883 77.754-77.754 77.754zm170.719 134.427a175.9 175.9 0 0 0-46.352-82.004c-18.437-18.438-40.25-32.27-64.039-40.938 28.598-19.394 47.426-52.16 47.426-89.238C363.754 132.34 315.414 84 256 84s-107.754 48.34-107.754 107.754c0 37.098 18.844 69.875 47.465 89.266-21.887 7.976-42.14 20.308-59.566 36.542-25.235 23.5-42.758 53.465-50.883 86.348C50.852 364.242 30 312.512 30 256 30 131.383 131.383 30 256 30s226 101.383 226 226c0 56.523-20.86 108.266-55.281 147.934zm0 0"
                              data-original="#000000"
                            ></path>
                          </svg>
                          Account
                        </span>
                        <hr className="my-2 -mx-2" />

                        <span
                          href="#"
                          className="text-sm text-gray-800 cursor-pointer flex items-center p-2 rounded-md hover:bg-gray-100 dropdown-item transition duration-300 ease-in-out"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            className="w-4 h-4 mr-3 fill-current"
                            viewBox="0 0 24 24"
                          >
                            <path
                              d="M19.56 23.253H4.44a4.051 4.051 0 0 1-4.05-4.05v-9.115c0-1.317.648-2.56 1.728-3.315l7.56-5.292a4.062 4.062 0 0 1 4.644 0l7.56 5.292a4.056 4.056 0 0 1 1.728 3.315v9.115a4.051 4.051 0 0 1-4.05 4.05zM12 2.366a2.45 2.45 0 0 0-1.393.443l-7.56 5.292a2.433 2.433 0 0 0-1.037 1.987v9.115c0 1.34 1.09 2.43 2.43 2.43h15.12c1.34 0 2.43-1.09 2.43-2.43v-9.115c0-.788-.389-1.533-1.037-1.987l-7.56-5.292A2.438 2.438 0 0 0 12 2.377z"
                              data-original="#000000"
                            ></path>
                            <path
                              d="M16.32 23.253H7.68a.816.816 0 0 1-.81-.81v-5.4c0-2.83 2.3-5.13 5.13-5.13s5.13 2.3 5.13 5.13v5.4c0 .443-.367.81-.81.81zm-7.83-1.62h7.02v-4.59c0-1.933-1.577-3.51-3.51-3.51s-3.51 1.577-3.51 3.51z"
                              data-original="#000000"
                            ></path>
                          </svg>
                          Dashboard
                        </span>
                        <span
                          href="#"
                          className="text-sm text-gray-800 cursor-pointer flex items-center p-2 rounded-md hover:bg-gray-100 dropdown-item transition duration-300 ease-in-out"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-4 h-4 mr-3 fill-current"
                            viewBox="0 0 24 24"
                          >
                            <path
                              d="M18 2c2.206 0 4 1.794 4 4v12c0 2.206-1.794 4-4 4H6c-2.206 0-4-1.794-4-4V6c0-2.206 1.794-4 4-4zm0-2H6a6 6 0 0 0-6 6v12a6 6 0 0 0 6 6h12a6 6 0 0 0 6-6V6a6 6 0 0 0-6-6z"
                              data-original="#000000"
                            />
                            <path
                              d="M12 18a1 1 0 0 1-1-1V7a1 1 0 0 1 2 0v10a1 1 0 0 1-1 1z"
                              data-original="#000000"
                            />
                            <path
                              d="M6 12a1 1 0 0 1 1-1h10a1 1 0 0 1 0 2H7a1 1 0 0 1-1-1z"
                              data-original="#000000"
                            />
                          </svg>
                          Posts
                        </span>
                        <span
                          href="#"
                          className="text-sm text-gray-800 cursor-pointer flex items-center p-2 rounded-md hover:bg-gray-100 dropdown-item transition duration-300 ease-in-out"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-4 h-4 mr-3 fill-current"
                            viewBox="0 0 510 510"
                          >
                            <g fillOpacity=".9">
                              <path
                                d="M255 0C114.75 0 0 114.75 0 255s114.75 255 255 255 255-114.75 255-255S395.25 0 255 0zm0 459c-112.2 0-204-91.8-204-204S142.8 51 255 51s204 91.8 204 204-91.8 204-204 204z"
                                data-original="#000000"
                              />
                              <path
                                d="M267.75 127.5H229.5v153l132.6 81.6 20.4-33.15-114.75-68.85z"
                                data-original="#000000"
                              />
                            </g>
                          </svg>
                          Schedules
                        </span>
                        <span
                          href="#"
                          className="text-sm text-gray-800 cursor-pointer flex items-center p-2 rounded-md hover:bg-gray-100 dropdown-item transition duration-300 ease-in-out"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-4 h-4 mr-3 fill-current"
                            viewBox="0 0 6 6"
                          >
                            <path
                              d="M3.172.53a.265.266 0 0 0-.262.268v2.127a.265.266 0 0 0 .53 0V.798A.265.266 0 0 0 3.172.53zm1.544.532a.265.266 0 0 0-.026 0 .265.266 0 0 0-.147.47c.459.391.749.973.749 1.626 0 1.18-.944 2.131-2.116 2.131A2.12 2.12 0 0 1 1.06 3.16c0-.65.286-1.228.74-1.62a.265.266 0 1 0-.344-.404A2.667 2.667 0 0 0 .53 3.158a2.66 2.66 0 0 0 2.647 2.663 2.657 2.657 0 0 0 2.645-2.663c0-.812-.363-1.542-.936-2.03a.265.266 0 0 0-.17-.066z"
                              data-original="#000000"
                            />
                          </svg>
                          Logout
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <button id="toggleOpen" className="lg:hidden !ml-7 outline-none">
              <svg
                className="w-7 h-7"
                fill="#000"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
        </header>

        <div>
          
        </div>
      </div>
    </>
  );
}

export default UserNavBar;

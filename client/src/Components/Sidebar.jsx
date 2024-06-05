import React from 'react';

const Sidebar = () => {
  return (
    <aside className="lg:w-64 w-20 bg-blue-200 bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-lg ml-1 text-white  xs:h-[89%] lg:h-[91%] shadow-lg  fixed mt-4 p-1 ">
      <nav className="mt-10 rounded-2xl items-center text-center flex justify-center border  hover:bg-black hover:text-white">
        <a href="#" className="flex items-center p-4 ">
        <i className="fa-solid fa-user font-semibold text-[1.5rem]"></i>
          <span className="ml-4 hidden lg:block text-[1.2rem] rounded-sm">Users</span>
        </a>
      </nav>
    </aside>
  );
}

export default Sidebar;

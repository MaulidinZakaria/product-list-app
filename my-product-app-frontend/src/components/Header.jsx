import React from 'react';

const Header = ({ title }) => (
  <div className="flex justify-start p-5 items-center gap-3 bg-white w-full shadow-xl rounded-2xl text-xl font-bold">
    <i className="fa-brands fa-think-peaks"></i>
    <p>{title}</p>
  </div>
);

export default Header;

import React from "react";

function Footer() {
  return (
    <footer className="flex p-4 w-full h-12 justify-center items-center shadow-inner">
      <p className="text-sm  ">© {new Date().getFullYear()} RapidTags.Co.In</p>
    </footer>
  );
}

export default Footer;

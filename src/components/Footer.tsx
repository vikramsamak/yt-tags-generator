import { APP_URL } from "@/constants/Constants";
import React from "react";

function Footer() {
  return (
    <footer className="flex p-4 w-full h-12 justify-center items-center shadow-inner">
      <p className="text-sm  ">
        © {new Date().getFullYear()} {APP_URL.replace("https://", "")}
      </p>
    </footer>
  );
}

export default Footer;

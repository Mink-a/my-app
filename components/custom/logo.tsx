import React from "react";

function Logo({ isCollapsed }: { isCollapsed: boolean }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 256 256"
      className={`transition-all ${isCollapsed ? "h-6 w-6" : "h-8 w-8"}`}
    >
      <path fill="none" d="M0 0H256V256H0z"></path>
      <path fill="none" stroke="currentColor" d="M208 128L128 208"></path>
      <path fill="none" stroke="currentColor" d="M192 40L40 192"></path>
    </svg>
  );
}

export default Logo;

import { useClickAwayListener } from "./utils";
import { useRef } from "react";

export const Menu = ({ children, isOpen, setIsOpen }: any) => {
  const menuRef = useRef<HTMLDivElement | null>(null);
  useClickAwayListener(menuRef, () => setIsOpen(false));

  return (
    <div ref={menuRef} className={`relative inline-block text-left ${isOpen ? "" : "hidden"}`}>
      <div
        className="absolute top-6 right-0 z-50 mt-2 w-32 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
        tabIndex={-1}
      >
        {children}
      </div>
    </div>
  );
};

import { useLocation } from "react-router-dom";
import { useEffect, useRef } from "react";
import NavItem from "./NavItem";
import { navLinks } from "../../types/navLinks";

export default function DesktopNav() {
  const location = useLocation();

  const activeIndex = navLinks.findIndex(link => link.path === location.pathname);

  const prevIndex = useRef(activeIndex);

  useEffect(() => {
    if (activeIndex !== -1) {
      prevIndex.current = activeIndex;
    }
  }, [activeIndex]);

  const filteredLinks = navLinks.filter(link => !link.mobileOnly);

  return (
    <ul className="hidden lg:flex items-center gap-2">
      {filteredLinks.map((item) => (
        <li key={item.path}>
          <NavItem
            name={item.name}
            path={item.path}
          />
        </li>
      ))}
    </ul>
  );
}
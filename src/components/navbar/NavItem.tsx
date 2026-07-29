  import { NavLink } from "react-router-dom";
  import { motion } from "framer-motion";
  import NavIndicator from "./NavIndicator";

  interface Props {
    name: string;
    path: string;
  }

  export default function NavItem({
    name,
    path,
  }: Props) {
    return (
      <NavLink to={path}>
        {({ isActive }) => (
          <div className="relative px-5 py-2 cursor-pointer">

            {isActive && <NavIndicator />}

            <motion.span
              animate={{
                y: isActive ? -1 : 0,
              }}
              transition={{
                duration: 0.2,
              }}
              className={`
                relative z-10
                text-sm
                uppercase
                tracking-[0.15em]
                transition-colors duration-300
                ${
                  isActive
                    ? "text-white"
                    : "text-white/60 hover:text-white"
                }
              `}
            >
              {name}
            </motion.span>

          </div>
        )}
      </NavLink>
    );
  }
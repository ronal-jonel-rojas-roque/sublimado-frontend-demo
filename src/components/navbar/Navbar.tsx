import { useState, useEffect, useCallback } from "react";
import { FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import AuthLinks from "./AuthLinks";
import MobileMenu from "./MobileMenu";
import DesktopNav from "./DesktopNav";
import { HeartPulseIcon, UserIcon } from "lucide-animated";
import { useCart } from "../../context/CartContext";


export default function Navbar() {
  const { isAuthenticated, logout } = useAuth();
  const { openCart } = useCart();
  const [show, setShow] = useState(true);
  const { cart } = useCart();
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const controlNavbar = useCallback(() => {
    if (
      window.scrollY > lastScrollY &&
      window.scrollY > 100
    ) {
      setShow(false);
    } else {
      setShow(true);
    }

    setLastScrollY(window.scrollY);
  }, [lastScrollY]);

  useEffect(() => {
    const handleResize = () => {

      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    // Limpieza del event listener
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    window.addEventListener(
      "scroll",
      controlNavbar
    );

    return () => {
      window.removeEventListener(
        "scroll",
        controlNavbar
      );
    };
  }, [controlNavbar]);


  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <>
      <nav
        className={`
          fixed top-0 left-0 w-full z-50 select-none bg-black border-0
          transition-transform duration-300
          ${show
            ? "translate-y-0"
            : "-translate-y-full"}  
        `}
      >
        <div
          className="
            flex items-center justify-between
            px-10 py-6
            text-white
          "
        >
          {/* LOGO */}
          <Link
            to="/"
            className="
              text-2xl
              font-bold
              tracking-wider
            "
          >
            DALLT
          </Link>

          {/* NAV DESKTOP */}
          <DesktopNav />

          {/* ACTIONS */}
          <div className="flex items-center gap-6">
            <Link to="/wishlist" className=" hover:text-red-400 transition-colors">
              <HeartPulseIcon size={25} />
            </Link>
            <button onClick={openCart} className="relative">
              <FaShoppingCart size={20} />
              <span className="absolute -top-2 -right-2 bg-red-500 text-[10px] w-4 h-4 rounded-full flex items-center justify-center text-white">
                {totalItems}
              </span>
            </button>
            {/* USER DESKTOP */}
            <div className="hidden lg:block relative group">
              <button>
                <UserIcon size={24} />
              </button>

              <div
                className="
                  absolute right-0 mt-3
                  w-52
                  bg-black/90
                  backdrop-blur-xl
                  border border-white/10
                  rounded-xl
                  opacity-0 invisible
                  group-hover:opacity-100
                  group-hover:visible
                  transition-all
                "
              >
                <AuthLinks
                  isAuthenticated={isAuthenticated}
                  logout={logout}
                />
              </div>
            </div>

            {/* MOBILE BUTTON */}
            <button
              onClick={() =>
                setIsMenuOpen(!isMenuOpen)
              }
              className="lg:hidden text-2xl"
            >
              {isMenuOpen ? (
                <FaTimes />
              ) : (
                <FaBars />
              )}
            </button>

          </div>
        </div>
      </nav>

      {/* MOBILE MENU */}

      {isMenuOpen && (
        <div
          className="
            fixed inset-0
            bg-black/40
            backdrop-blur-sm
            z-40
          "
          onClick={() =>
            setIsMenuOpen(false)
          }
        />
      )}

      <MobileMenu
        isOpen={isMenuOpen}
        onClose={() =>
          setIsMenuOpen(false)
        }
      />
    </>
  );
}
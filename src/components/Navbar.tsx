import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, User } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoggedIn] = useState(false); // Replace with real auth check later
  const navigate = useNavigate();
  const location = useLocation();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const scrollToSection = (sectionId: string) => {
    if (location.pathname !== "/") {
      navigate(`/?section=${sectionId}`);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
    setMobileMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent">
                Choti <span className="text-orange-600">Dhobi</span>
              </span>
            </Link>
          </div>

          <div className="hidden md:ml-6 md:flex md:space-x-8 items-center">
            <button 
              onClick={() => scrollToSection("services")} 
              className="text-gray-600 hover:text-orange-600 px-3 py-2 text-sm font-medium"
            >
              Services
            </button>
            <button 
              onClick={() => scrollToSection("how-it-works")} 
              className="text-gray-600 hover:text-orange-600 px-3 py-2 text-sm font-medium"
            >
              How It Works
            </button>
            <button 
              onClick={() => scrollToSection("pricing")} 
              className="text-gray-600 hover:text-orange-600 px-3 py-2 text-sm font-medium"
            >
              Pricing
            </button>
            <Link to="/track" className="text-gray-600 hover:text-orange-600 px-3 py-2 text-sm font-medium">
              Track Order
            </Link>
            <Link to="/#contact" className="text-gray-600 hover:text-orange-600 px-3 py-2 text-sm font-medium">
              Contact
            </Link>

            {isLoggedIn ? (
              <Button 
                variant="default" 
                className="ml-4 bg-orange-500 hover:bg-orange-600 text-white"
                onClick={() => navigate("/dashboard")}
              >
                My Account
              </Button>
            ) : (
              <Button 
                variant="default" 
                className="ml-4 bg-orange-500 hover:bg-orange-600 text-white"
                onClick={() => navigate("/login")}
              >
                <User size={18} className="mr-1" />
                Login
              </Button>
            )}
          </div>

          <div className="flex items-center md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-orange-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-orange-500"
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden">
          <div className="pt-2 pb-4 space-y-1">
            <button
              className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-orange-600 hover:bg-gray-50 w-full text-left"
              onClick={() => scrollToSection("services")}
            >
              Services
            </button>
            <button
              className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-orange-600 hover:bg-gray-50 w-full text-left"
              onClick={() => scrollToSection("how-it-works")}
            >
              How It Works
            </button>
            <button
              className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-orange-600 hover:bg-gray-50 w-full text-left"
              onClick={() => scrollToSection("pricing")}
            >
              Pricing
            </button>
            <Link
              to="/track"
              className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-orange-600 hover:bg-gray-50"
              onClick={toggleMobileMenu}
            >
              Track Order
            </Link>
            <Link
              to="/#contact"
              className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-orange-600 hover:bg-gray-50"
              onClick={toggleMobileMenu}
            >
              Contact
            </Link>
            <div className="px-3 py-2">
              {isLoggedIn ? (
                <Button 
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white" 
                  onClick={() => {
                    navigate("/dashboard");
                    toggleMobileMenu();
                  }}
                >
                  My Account
                </Button>
              ) : (
                <Button 
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white" 
                  onClick={() => {
                    navigate("/login");
                    toggleMobileMenu();
                  }}
                >
                  <User size={18} className="mr-1" />
                  Login
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

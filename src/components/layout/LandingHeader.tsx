import { useState } from "react";
import { Menu, X, Search, User, ChevronDown } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar({ user }: { user?: { name?: string } }) {
  const [isOpen, setIsOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const navigate = useNavigate();

  const menuItems = [
    { label: "Why Us" },
    {
      label: "Solutions",
      dropdown: ["HRMS", "Payroll", "Recruitment"],
    },
    {
      label: "Resources",
      dropdown: ["Blog", "Case Studies", "Guides"],
    },
    { label: "Contact" },
  ];

  const initials = user?.name?.trim()
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    : "U";

  return (
    <nav className="bg-white shadow-md fixed top-0 w-full z-50">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div
          onClick={() => navigate("/")}
          className="flex items-center space-x-2 cursor-pointer"
        >
          <svg
            className="w-10 h-10 text-blue-600"
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="50" cy="50" r="48" stroke="currentColor" strokeWidth={4} />
            <path
              d="M30 50 L45 65 L70 35"
              stroke="currentColor"
              strokeWidth={8}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="text-2xl font-bold text-gray-800">MyBrand</span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8 items-center">
          {menuItems.map((item, idx) => (
            <div key={idx} className="relative group">
              <button className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 font-medium">
                <span>{item.label}</span>
                {item.dropdown && <ChevronDown size={16} />}
              </button>
              {item.dropdown && (
                <div className="absolute left-0 mt-2 bg-white rounded-lg shadow-lg opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transform translate-y-2 transition-all">
                  {item.dropdown?.map((opt, i) => (
                    <button
                      key={i}
                      onClick={() => navigate(`/${opt.toLowerCase()}`)}
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100 text-left w-full"
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
          <button onClick={() => setShowSearch(!showSearch)}>
            <Search className="w-5 h-5 text-gray-600 hover:text-blue-600" />
          </button>
          {user ? (
            <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold">
              {initials}
            </div>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="px-4 py-2 rounded-lg border border-blue-600 text-blue-600 hover:bg-blue-50"
            >
              Login
            </button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? (
              <X className="w-6 h-6 text-gray-700" />
            ) : (
              <Menu className="w-6 h-6 text-gray-700" />
            )}
          </button>
        </div>
      </div>

      {/* Search Bar */}
      {showSearch && (
        <div className="bg-gray-100 p-4">
          <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
            <input
              type="text"
              placeholder="Search..."
              className="flex-1 px-4 py-2 outline-none bg-transparent"
            />
            <button onClick={() => setShowSearch(false)} className="p-2">
              <X className="w-6 h-6 text-gray-500 hover:text-gray-700" />
            </button>
          </div>
        </div>
      )}

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-lg">
          {menuItems.map((item, idx) => (
            <div key={idx} className="border-b border-gray-100">
              <button className="w-full text-left px-4 py-3 flex justify-between items-center hover:bg-gray-50">
                {item.label}
                {item.dropdown && <ChevronDown size={16} />}
              </button>
              {item.dropdown && (
                <div className="pl-6 pb-2">
                  {item.dropdown?.map((opt, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        navigate(`/${opt.toLowerCase()}`);
                        setIsOpen(false);
                      }}
                      className="block w-full text-left px-2 py-1 text-gray-700 hover:bg-gray-100 rounded"
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
          <div className="px-4 py-3">
            {user ? (
              <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold">
                {initials}
              </div>
            ) : (
              <button
                onClick={() => {
                  navigate("/login");
                  setIsOpen(false);
                }}
                className="w-full px-4 py-2 rounded-lg border border-blue-600 text-blue-600 hover:bg-blue-50"
              >
                Login
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

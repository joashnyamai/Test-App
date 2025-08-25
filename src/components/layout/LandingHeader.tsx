import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, Search, ArrowRight, CheckCircle, Users, BarChart3, Palette, Code, Monitor, X } from "lucide-react";

const navItems = [
  { name: "Products", dropdown: ["Test Management", "Bug Tracking", "Reporting"] },
  { name: "Solutions", dropdown: ["Automation", "Manual Testing", "Performance"] },
  {
    name: "Why Us",
    megaDropdown: [
      { title: "System of Work", desc: "Blueprint for how teams work together" },
      { title: "Marketplace", desc: "Connect thousands of apps to your products" },
      { title: "Customers", desc: "Case studies & stories powered by teamwork" },
      { title: "FedRAMP", desc: "Compliant solutions for the public sector" },
      { title: "Resilience", desc: "Enterprise-grade & highly performant infrastructure" },
      { title: "Platform", desc: "Deeply integrated, reliable & secure platform" },
      { title: "Trust center", desc: "Ensure your data's security, compliance & availability" },
    ]
  },
  { name: "Resources", dropdown: ["Docs", "Blog", "Webinars"] },
  { name: "Enterprise", dropdown: ["Custom Solutions", "Integrations", "Support"] },
];

const categories = [
  { name: "Software", icon: Code, color: "bg-purple-100", iconColor: "text-purple-600" },
  { name: "Product management", icon: CheckCircle, color: "bg-yellow-100", iconColor: "text-yellow-600" },
  { name: "Marketing", icon: BarChart3, color: "bg-blue-100", iconColor: "text-blue-600" },
  { name: "Project management", icon: Monitor, color: "bg-orange-100", iconColor: "text-orange-600" },
  { name: "Design", icon: Palette, color: "bg-pink-100", iconColor: "text-pink-600" },
  { name: "IT", icon: Users, color: "bg-green-100", iconColor: "text-green-600" },
];

export default function LandingHeader({ user }) {
  const navigate = useNavigate();
  const [searchOpen, setSearchOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const initials = user?.name ? user.name.split(' ').map(n => n[0]).join('').toUpperCase() : "";

  // Close drawer on outside click
  React.useEffect(() => {
    if (!drawerOpen) return;
    const handleClick = (e) => {
      if (e.target.closest('.drawer') || e.target.closest('.hamburger')) return;
      setDrawerOpen(false);
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [drawerOpen]);

  const toggleDropdown = (itemName) => {
    setActiveDropdown(activeDropdown === itemName ? null : itemName);
  };

  return (
    <div className="w-full">
      <nav className="w-full bg-white flex items-center px-4 py-4 shadow relative">
        {/* Modern searchbar overlay */}
        {searchOpen ? (
          <div className="fixed top-0 left-0 w-full h-24 bg-white z-50 flex items-center justify-center transition-all duration-300">
            <div className="w-full max-w-2xl flex items-center px-6">
              <input
                type="text"
                placeholder="Search Keywords"
                className="w-full h-14 px-6 text-xl rounded-full border border-gray-300 shadow focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
                autoFocus
              />
              <button className="ml-4 text-gray-400 text-2xl" onClick={() => setSearchOpen(false)} aria-label="Close search">✕</button>
            </div>
          </div>
        ) : (
          <>
            {/* Mobile: Hamburger and Logo */}
            <div className="flex items-center justify-between w-full lg:hidden">
              <div className="flex items-center">
                <button className="hamburger mr-2 rounded-full bg-blue-100 p-2" onClick={() => setDrawerOpen(true)} aria-label="Open menu">
                  <Menu className="w-5 h-5 text-blue-700" />
                </button>
                <img src={"https://i.postimg.cc/PrG43h61/kiwami.jpg"} alt="KiwamiTestCloud Logo" className="w-28 h-12 object-contain" />
              </div>
              
              <div className="flex items-center gap-3">
                <button onClick={() => setSearchOpen(true)} className="text-blue-600 hover:text-blue-300">
                  <Search className="w-5 h-5" />
                </button>
                <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
                  {initials || "U"}
                </div>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center justify-between w-full max-w-7xl mx-auto gap-6">
              <div className="flex items-center gap-4">
                <img src={"https://i.postimg.cc/PrG43h61/kiwami.jpg"} alt="KiwamiTestCloud Logo" className="w-36 h-16 object-contain" />
                <span className="text-3xl font-semi-bold text-blue-700">KiwamiTestCloud</span>
              </div>
              
              <div className="hidden lg:flex items-center gap-2 flex-1 justify-center">
                {navItems.map(item => (
                  <div key={item.name} className="relative group mx-2">
                    <button className="text-black font-medium px-3 py-2 hover:text-blue-300">{item.name}</button>
                    {/* Mega dropdown for 'Why Us' */}
                    {item.megaDropdown ? (
                      <div className="absolute left-1/2 -translate-x-1/2 top-full bg-white text-black rounded-2xl shadow-xl mt-4 p-8 min-w-[700px] flex flex-wrap gap-8 hidden group-hover:flex z-20">
                        {item.megaDropdown.map((opt, idx) => (
                          <div key={opt.title} className="w-1/3 mb-4">
                            <div className="font-bold text-lg mb-1 flex items-center gap-2">
                              {opt.title}
                              {opt.title === "System of Work" && (
                                <span className="bg-blue-100 text-blue-600 text-xs font-semibold px-2 py-0.5 rounded-full ml-2">NEW</span>
                              )}
                            </div>
                            <div className="text-sm text-gray-600">{opt.desc}</div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="absolute left-0 top-full bg-white text-black rounded shadow-lg mt-2 min-w-[160px] hidden group-hover:block z-10">
                        {item.dropdown.map(opt => (
                          <div key={opt} className="px-4 py-2 hover:bg-blue-50 cursor-pointer">{opt}</div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
              
              <div className="hidden lg:flex items-center gap-4">
                <button onClick={() => setSearchOpen(true)} className="text-blue-600 hover:text-blue-300">
                  <Search className="w-6 h-6" />
                </button>
                <div className="bg-blue-500 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg">
                  {initials || ""}
                </div>
              </div>
            </div>

            {/* Mobile Drawer */}
            <div
              className={`drawer fixed top-0 left-0 h-full w-80 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${drawerOpen ? 'translate-x-0' : '-translate-x-full'}`}
              style={{ borderTopRightRadius: '1rem', borderBottomRightRadius: '1rem' }}
            >
              <div className="flex flex-col p-6 h-full">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <img src={"https://i.postimg.cc/PrG43h61/kiwami.jpg"} alt="Logo" className="w-10 h-10 rounded-full" />
                    <span className="text-xl font-bold text-blue-700">KiwamiTestCloud</span>
                  </div>
                  <button onClick={() => setDrawerOpen(false)} className="p-1">
                    <X className="w-6 h-6" />
                  </button>
                </div>
                
                <div className="flex-1 overflow-y-auto">
                  {navItems.map(item => (
                    <div key={item.name} className="mb-4">
                      <button
                        className="w-full text-left text-black font-medium px-3 py-3 hover:bg-blue-50 rounded-lg flex items-center justify-between"
                        onClick={() => toggleDropdown(item.name)}
                      >
                        <span>{item.name}</span>
                        <span className="transform transition-transform">
                          {activeDropdown === item.name ? "−" : "+"}
                        </span>
                      </button>
                      
                      {activeDropdown === item.name && (
                        <div className="pl-6 mt-2 space-y-2">
                          {item.dropdown?.map(opt => (
                            <a key={opt} href="#" className="block text-gray-600 hover:text-blue-600 py-2">
                              {opt}
                            </a>
                          ))}
                          {item.megaDropdown?.map(opt => (
                            <a key={opt.title} href="#" className="block text-gray-600 hover:text-blue-600 py-2">
                              {opt.title}
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                
                <div className="pt-6 border-t border-gray-200">
                  <div className="bg-blue-500 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg mx-auto mb-4">
                    {initials || "U"}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Overlay for smooth close */}
            {drawerOpen && (
              <div 
                className="fixed inset-0 bg-black bg-opacity-20 z-40 transition-opacity duration-300 ease-in-out lg:hidden"
                onClick={() => setDrawerOpen(false)}
              />
            )}
          </>
        )}
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-50 to-white min-h-screen flex flex-col items-center justify-center px-4 py-20">
        <div className="max-w-6xl mx-auto text-center">
          {/* Main Headline */}
          <div className="mb-8">
            <h1 className="text-5xl md:text-7xl font-semi-bold text-blue-700 mb-4 leading-tight">
              KiwamiTestCloud:
            </h1>
            <h2 className="text-5xl md:text-7xl text-gray-900 mb-6 leading-tight">
              from <span className="relative">
                bugs
                <svg className="absolute -bottom-2 left-0 w-full h-4" viewBox="0 0 200 20" fill="none">
                  <path d="M5 15C50 5, 100 5, 195 15" stroke="#f5be1bff" strokeWidth="8" strokeLinecap="round"/>
                </svg>
              </span> to dreams
            </h2>
          </div>

          {/* CTA Button */}
          <div className="mb-16">
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-2 mx-auto"
              onClick={() => navigate('/login')}
            >
              Get started
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

          {/* Category Icons */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 max-w-5xl mx-auto">
            {categories.map((category, index) => {
              const IconComponent = category.icon;
              return (
                <div 
                  key={category.name} 
                  className="flex flex-col items-center group cursor-pointer transform transition-all duration-300 hover:scale-110"
                >
                  <div className={`w-16 h-16 ${category.color} rounded-2xl flex items-center justify-center mb-3 group-hover:shadow-lg transition-all duration-300`}>
                    <IconComponent className={`w-8 h-8 ${category.iconColor}`} />
                  </div>
                  <span className="text-sm font-medium text-gray-700 group-hover:text-blue-600 transition-colors duration-300">
                    {category.name}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Login Link */}
          <div className="mt-16">
            <p className="text-gray-600">
              Already have an account?{' '}
              <button
                className="text-blue-600 hover:text-blue-700 font-medium hover:underline transition-all duration-200"
                onClick={() => navigate('/login')}
              >
                Login
              </button>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
import React, { useState } from "react";
import { Menu, Search, ArrowRight, CheckCircle, Users, BarChart3, Palette, Code, Monitor, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

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

export default function LandingPage() {
  const navigate = useNavigate();
  const [searchOpen, setSearchOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  
  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user") as string)
    : null;
  
  const initials = user?.name ? user.name.split(' ').map(n => n[0]).join('').toUpperCase() : "";

  // Example images
  const productImg = "https://media.istockphoto.com/id/1357020474/photo/quality-management-with-qa-qc-and-improvement-standardisation-and-certification-concept.jpg?b=1&s=612x612&w=0&k=20&c=SgWt664A5WDYilN3KZ5AKtJ4He2BRC8OE755pfJEg_k=";
  const solutionsImg = "https://media.istockphoto.com/id/1471444483/photo/customer-satisfaction-survey-concept-users-rate-service-experiences-on-online-application.jpg?b=1&s=612x612&w=0&k=20&c=2Wtg2ur5qT3ZFazgxIJYmkPD1ds8p_IVMmrABjZ4NOM=";
  const whyUsImg = "https://media.istockphoto.com/id/952729630/photo/test-pushing-keyboard-with-finger-3d-illustration.jpg?s=612x612&w=0&k=20&c=y6zIqQjHBkqN1LPQ8xXJD8qFLwWwRVanFLhhhppczNE=";
  const resourcesImg = "https://media.istockphoto.com/id/1682026943/photo/customer-services-best-excellent-business-rating-experience-satisfaction-survey-concept-user.jpg?s=612x612&w=0&k=20&c=ySiKwWDXEM3nB38NESUAKmGRqBWDaPYw9OFQCD7Muok=";

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

  const handleWhatsAppSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const message = form.message.value;
    const whatsappMsg = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nMessage: ${message}`);
    window.open(`https://wa.me/254748163492?text=${whatsappMsg}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header/Navigation */}
      <nav className="w-full bg-white flex items-center px-4 py-4 shadow relative">
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
                <img src={"https://i.postimg.cc/59gWSxjX/image.png"} alt="KiwamiTestCloud Logo" className="w-36 h-16 object-contain" />
                <span className="text-3xl font-bold text-blue-700">KiwamiTestCloud</span>
              </div>
              
              <div className="hidden lg:flex items-center gap-2 flex-1 justify-center">
                {navItems.map(item => (
                  <div key={item.name} className="relative group mx-2">
                    <button className="text-black font-medium px-3 py-2 hover:text-blue-300">{item.name}</button>
                    {item.megaDropdown ? (
                      <div className="absolute left-1/2 -translate-x-1/2 top-full bg-white text-black rounded-2xl shadow-xl mt-4 p-8 min-w-[700px] hidden group-hover:flex flex-wrap gap-8 z-20">
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
                    <img src={"https://i.postimg.cc/59gWSxjX/image.png"} alt="Logo" className="w-10 h-10 rounded-full" />
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
          <h1 className="text-5xl md:text-7xl text-blue-600 mb-4 leading-tight">
            KiwamiTestCloud:
          </h1>
          <h2 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            from <span className="relative">
              bugs
              <svg className="absolute -bottom-2 left-0 w-full h-4" viewBox="0 0 200 20" fill="none">
                <path d="M5 15C50 5, 100 5, 195 15" stroke="#FCD34D" strokeWidth="10" strokeLinecap="round"/>
              </svg>
            </span> to dreams
          </h2>

          {/* CTA Button */}
          <div className="mb-16">
            <button 
              onClick={() => navigate('/signup')}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-2 mx-auto"
            >
              Get started
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

          {/* Category Icons */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 max-w-5xl mx-auto">
            {categories.map((category) => {
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
                type="button"
                onClick={() => navigate('/signup')}
                className="text-blue-600 hover:text-blue-700 font-medium hover:underline transition-all duration-200"
              >
                Login
              </button>
            </p>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-20 px-6 bg-white">
        <div className="flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto">
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-4xl md:text-5xl text-blue-600 mb-12 tracking-tight">Our Products</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="p-6 md:p-10 bg-blue-100 rounded-3xl shadow-2xl hover:scale-105 hover:shadow-blue-200 transition-all duration-300 border border-gray-100">
                <h3 className="text-2xl text-indigo-600 mb-4">Test Management</h3>
                <p className="text-black font-semibold text-lg">Organize, manage, and execute test cases with ease. Keep your QA cycle efficient and transparent.</p>
              </div>
              <div className="p-8 md:p-10 bg-blue-100 rounded-3xl shadow-2xl hover:scale-105 hover:shadow-blue-200 transition-all duration-300 border border-gray-100">
                <h3 className="text-2xl text-indigo-600 mb-4">Bug Tracking</h3>
                <p className="text-black font-semibold text-lg">Log, track, and prioritize bugs effectively to ensure faster resolution and smoother releases.</p>
              </div>
              <div className="p-8 md:p-10 bg-blue-100 rounded-3xl shadow-2xl hover:scale-105 hover:shadow-blue-200 transition-all duration-300 border border-gray-100">
                <h3 className="text-2xl text-indigo-600 mb-4">Reporting</h3>
                <p className="text-black font-semibold text-lg">Generate detailed QA reports with insights into progress, quality metrics, and accountability.</p>
              </div>
            </div>
          </div>
          <div className="flex-1 flex justify-center md:justify-end mt-8 md:mt-0">
            <img src={productImg} alt="Products" className="w-72 h-72 md:w-96 md:h-96 object-contain rounded-3xl shadow-2xl border border-gray-100" />
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="flex flex-col md:flex-row items-center justify-between max-w-6xl mx-auto">
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-4xl md:text-5xl text-blue-600 mb-12 tracking-tight">Solutions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="p-8 md:p-10 bg-blue-100 rounded-3xl shadow-2xl hover:scale-105 hover:shadow-blue-200 transition-all duration-300 border border-gray-100">
                <h3 className="text-2xl text-indigo-600 mb-4">Automation Testing</h3>
                <p className="text-black font-semibold text-lg">Integrate with automation tools to speed up repetitive testing and enhance coverage.</p>
              </div>
              <div className="p-8 md:p-10 bg-blue-100 rounded-3xl shadow-2xl hover:scale-105 hover:shadow-blue-200 transition-all duration-300 border border-gray-100">
                <h3 className="text-2xl text-indigo-600 mb-4">Manual Testing</h3>
                <p className="text-black font-semibold text-lg">Support structured manual testing with clear traceability between requirements and test cases.</p>
              </div>
            </div>
          </div>
          <div className="flex-1 flex justify-center md:justify-end mt-8 md:mt-0">
            <img src={solutionsImg} alt="Solutions" className="w-72 h-72 md:w-96 md:h-96 object-cover rounded-3xl shadow-2xl border border-gray-100" />
          </div>
        </div>
      </section>

      {/* Why Us Section */}
      <section className="py-20 px-6 bg-white">
        <div className="flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto">
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-4xl md:text-5xl text-blue-600 mb-12 tracking-tight">Why Choose Us?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="p-8 md:p-10 bg-blue-100 rounded-3xl shadow-2xl hover:scale-105 hover:shadow-blue-200 transition-all duration-300 border border-gray-100">
                <h3 className="text-2xl text-indigo-600 mb-4">All-in-One QA</h3>
                <p className="text-black font-semibold text-lg">From requirements to reports, manage the entire QA lifecycle in one platform.</p>
              </div>
              <div className="p-8 md:p-10 bg-blue-100 rounded-3xl shadow-2xl hover:scale-105 hover:shadow-blue-200 transition-all duration-300 border border-gray-100">
                <h3 className="text-2xl text-indigo-600 mb-4">Collaboration</h3>
                <p className="text-black font-semibold text-lg">Foster teamwork across QA, Dev, and Product teams with shared visibility and updates.</p>
              </div>
              <div className="p-8 md:p-10 bg-blue-100 rounded-3xl shadow-2xl hover:scale-105 hover:shadow-blue-200 transition-all duration-300 border border-gray-100">
                <h3 className="text-2xl text-indigo-600 mb-4">Scalable</h3>
                <p className="text-black font-semibold text-lg">Built for startups and enterprises alike — scale effortlessly as your team grows.</p>
              </div>
            </div>
          </div>
          <div className="flex-1 flex justify-center md:justify-end mt-8 md:mt-0">
            <img src={whyUsImg} alt="Why Choose Us" className="w-72 h-72 md:w-96 md:h-96 object-cover rounded-3xl shadow-2xl border border-gray-100" />
          </div>
        </div>
      </section>

      {/* Resources Section */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto">
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-4xl md:text-5xl text-blue-600 mb-12 tracking-tight">Resources</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="p-8 md:p-10 bg-blue-100 rounded-3xl shadow-2xl hover:scale-105 hover:shadow-blue-200 transition-all duration-300 border border-gray-100">
                <h3 className="text-2xl text-indigo-600 mb-4">Docs</h3>
                <p className="text-black font-semibold text-lg">Explore detailed documentation to set up, integrate, and maximize your QA workflows.</p>
              </div>
              <div className="p-8 md:p-10 bg-blue-100 rounded-3xl shadow-2xl hover:scale-105 hover:shadow-blue-200 transition-all duration-300 border border-gray-100">
                <h3 className="text-2xl text-indigo-600 mb-4">Blogs</h3>
                <p className="text-black font-semibold text-lg">Stay updated with industry trends, testing strategies, and product insights.</p>
              </div>
              <div className="p-8 md:p-10 bg-blue-100 rounded-3xl shadow-2xl hover:scale-105 hover:shadow-blue-200 transition-all duration-300 border border-gray-100">
                <h3 className="text-2xl text-indigo-600 mb-4">Webinars</h3>
                <p className="text-black font-semibold text-lg">Join live and recorded sessions from QA experts to enhance your team's skills.</p>
              </div>
            </div>
          </div>
          <div className="flex-1 flex justify-center md:justify-end mt-8 md:mt-0">
            <img src={resourcesImg} alt="Resources" className="w-72 h-72 md:w-96 md:h-96 object-cover rounded-3xl shadow-2xl border border-gray-100" />
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 px-4 sm:px-6 bg-white" id="contact">
        <div className="max-w-4xl mx-auto rounded-3xl shadow-2xl p-6 sm:p-10 md:p-16 flex flex-col md:flex-row gap-10 items-center border border-gray-100">
          <div className="flex-1 w-full">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">Contact Us</h2>
            <p className="text-gray-700 mb-4 sm:mb-6 text-base sm:text-lg">Have questions or want to get in touch? Fill out the form and we'll respond via WhatsApp.</p>
            <div className="mb-4 sm:mb-6 text-sm sm:text-base">
              <div className="flex items-center gap-2 mb-2"><span className="font-semibold">Address:</span> Nairobi, Kenya</div>
              <div className="flex items-center gap-2 mb-2"><span className="font-semibold">Email:</span> <a href="mailto:info@kiwamitestcloud.com" className="text-blue-600 hover:underline">info@kiwamitestcloud.com</a></div>
              <div className="flex items-center gap-2 mb-2"><span className="font-semibold">Phone:</span> <a href="tel:+254748163492" className="text-blue-600 hover:underline">0748 163 492</a></div>
            </div>
            <form className="flex flex-col gap-4" onSubmit={handleWhatsAppSubmit}>
              <input name="name" type="text" placeholder="Your Name" required className="border border-gray-300 rounded-lg px-4 py-3 text-base sm:text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full" />
              <input name="email" type="email" placeholder="Your Email" required className="border border-gray-300 rounded-lg px-4 py-3 text-base sm:text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full" />
              <textarea name="message" placeholder="Your Message" rows={4} required className="border border-gray-300 rounded-lg px-4 py-3 text-base sm:text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full" />
              <button type="submit" className="bg-green-600 text-white font-bold py-3 rounded-lg hover:bg-green-700 transition-all text-base sm:text-lg">Send to WhatsApp</button>
            </form>
          </div>
          <div className="flex-1 flex justify-center w-full">
            <img src="https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?auto=format&fit=crop&w=400&q=80" alt="Contact" className="w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 object-cover rounded-2xl shadow-lg" />
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-black text-white py-8 px-4 sm:px-6 mt-0">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 md:gap-8">
          <div className="flex flex-col items-center md:items-start mb-4 md:mb-0">
            <span className="font-bold text-2xl mb-2">KiwamiTestCloud</span>
            <span className="text-gray-400 text-sm">&copy; {new Date().getFullYear()} KiwamiTestCloud. All rights reserved.</span>
            <span className="text-gray-400 text-xs mt-2">Nairobi, Kenya</span>
            <span className="text-gray-400 text-xs">info@kiwamitestcloud.com</span>
            <span className="text-gray-400 text-xs">0748 163 492</span>
          </div>
          <nav className="flex flex-wrap justify-center md:justify-end gap-4 sm:gap-6 md:gap-10 text-base sm:text-lg font-medium">
            <a href="#products" className="hover:text-blue-400 transition">Products</a>
            <a href="#solutions" className="hover:text-blue-400 transition">Solutions</a>
            <a href="#whyus" className="hover:text-blue-400 transition">Why Us</a>
            <a href="#resources" className="hover:text-blue-400 transition">Resources</a>
            <a href="/login" className="hover:text-blue-400 transition">Login</a>
            <a href="/signup" className="hover:text-blue-400 transition">Signup</a>
            <a href="#contact" className="hover:text-blue-400 transition">Contact</a>
            <a href="#enterprise" className="hover:text-blue-400 transition">Enterprise</a>
          </nav>
        </div>
      </footer>
    </div>
  );
}
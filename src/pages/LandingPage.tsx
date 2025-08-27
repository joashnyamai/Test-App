import React, { useState } from "react";
import { Menu, Search, ArrowRight, CheckCircle, Users, BarChart3, Palette, Code, Monitor, X, Star, Zap, Shield, Target, Sparkles, TrendingUp } from "lucide-react";

const navItems = [
  { 
    name: "Products", 
    href: "#features",
    dropdown: [
      { name: "Smart Test Management", href: "#features" },
      { name: "Advanced Bug Tracking", href: "#features" },
      { name: "Predictive Analytics", href: "#features" }
    ]
  },
  { 
    name: "Solutions", 
    href: "#features",
    dropdown: [
      { name: "Accelerate Release Cycles", href: "#benefits" },
      { name: "Enhance Team Collaboration", href: "#benefits" },
      { name: "Scale Without Limits", href: "#benefits" }
    ]
  },
  {
    name: "Why Us",
    href: "#benefits",
    megaDropdown: [
      { title: "Accelerate Release Velocity", desc: "Slash testing cycles by up to 60% with intelligent automation", href: "#benefits" },
      { title: "Enhance Team Collaboration", desc: "Break down silos with unified dashboards and real-time sync", href: "#benefits" },
      { title: "Scale Without Limits", desc: "Enterprise-grade infrastructure that grows with you", href: "#benefits" },
      { title: "Powerful Testing Solutions", desc: "Comprehensive suite of intelligent testing tools", href: "#features" },
      { title: "Customer Success Stories", desc: "Join thousands of teams that trust our platform", href: "#benefits" },
      { title: "Professional Support", desc: "Expert consultation and 24/7 assistance", href: "#contact" },
    ]
  },
  { 
    name: "Platform", 
    href: "#features",
    dropdown: [
      { name: "Testing Dashboard", href: "#features" },
      { name: "Quality Metrics", href: "#features" },
      { name: "Team Analytics", href: "#benefits" }
    ]
  },
  { 
    name: "Contact", 
    href: "#contact",
    dropdown: [
      { name: "Get in Touch", href: "#contact" },
      { name: "Schedule Demo", href: "#contact" },
      { name: "Enterprise Sales", href: "#contact" }
    ]
  },
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
  const [searchOpen, setSearchOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  
  const user = { name: "User Demo" }; // Using demo data instead of localStorage
  
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

  // Navigation functions
  const navigateToAuth = (page) => {
    // In a real app, you'd use React Router
    if (page === 'login') {
      window.location.href = '/login';
    } else if (page === 'signup') {
      window.location.href = '/signup';
    }
  };

  // Smooth scroll function
  const scrollToSection = (href) => {
    if (href && href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start',
          inline: 'nearest'
        });
      }
    }
    setDrawerOpen(false);
    setActiveDropdown(null);
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
    <div className="min-h-screen bg-white flex flex-col overflow-x-hidden">
      {/* Professional Header/Navigation */}
      <nav className="w-full bg-white border-b border-slate-200 flex items-center px-4 py-3 relative backdrop-blur-sm">
        {searchOpen ? (
          <div className="fixed top-0 left-0 w-full h-20 bg-white/95 backdrop-blur-md z-50 flex items-center justify-center transition-all duration-300 border-b border-slate-200">
            <div className="w-full max-w-2xl flex items-center px-6">
              <input
                type="text"
                placeholder="Search our platform..."
                className="w-full h-12 px-5 text-lg rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 shadow-sm"
                autoFocus
              />
              <button className="ml-4 text-slate-500 hover:text-slate-700 p-2" onClick={() => setSearchOpen(false)} aria-label="Close search">
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* Mobile Navigation */}
            <div className="flex items-center justify-between w-full lg:hidden">
              <div className="flex items-center gap-3">
                <button 
                  className="hamburger p-2 rounded-lg hover:bg-slate-100 transition-colors duration-200" 
                  onClick={() => setDrawerOpen(true)} 
                  aria-label="Open menu"
                >
                  <Menu className="w-6 h-6 text-slate-700" />
                </button>
                <div className="flex items-center gap-2">
                  <img src={"https://i.postimg.cc/PrG43h61/kiwami.jpg"} alt="KiwamiTestCloud Logo" className="w-10 h-10 rounded-lg object-contain" />
                  <span className="text-xl font-bold text-slate-800">KiwamiTestCloud</span>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setSearchOpen(true)} 
                  className="p-2 rounded-lg hover:bg-slate-100 transition-colors duration-200"
                  aria-label="Search"
                >
                  <Search className="w-5 h-5 text-slate-600" />
                </button>
                <div className="w-9 h-9 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg flex items-center justify-center font-semibold text-sm shadow-sm">
                  {initials || "U"}
                </div>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center justify-between w-full max-w-7xl mx-auto">
              {/* Logo Section */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-3">
                  <img src={"https://i.postimg.cc/59gWSxjX/image.png"} alt="KiwamiTestCloud Logo" className="w-12 h-12 rounded-xl object-contain shadow-sm" />
                  <div className="flex flex-col">
                    <span className="text-2xl font-bold text-slate-800">KiwamiTestCloud</span>
                    <span className="text-xs text-slate-500 font-medium tracking-wide">QUALITY ASSURANCE PLATFORM</span>
                  </div>
                </div>
              </div>
              
              {/* Navigation Menu */}
              <div className="flex items-center gap-1">
                {navItems.map(item => (
                  <div key={item.name} className="relative group">
                    <button 
                      className="text-slate-700 font-medium px-4 py-2 rounded-lg hover:bg-slate-50 hover:text-blue-600 transition-all duration-200 text-sm"
                      onClick={() => item.href ? scrollToSection(item.href) : null}
                    >
                      {item.name}
                    </button>
                    {item.megaDropdown ? (
                      <div className="absolute left-1/2 -translate-x-1/2 top-full bg-white border border-slate-200 rounded-xl shadow-xl mt-2 p-6 min-w-[700px] hidden group-hover:flex flex-wrap gap-6 z-30">
                        {item.megaDropdown.map((opt, idx) => (
                          <div 
                            key={opt.title} 
                            className="w-1/3 p-3 rounded-lg hover:bg-slate-50 transition-colors duration-200 cursor-pointer"
                            onClick={() => scrollToSection(opt.href)}
                          >
                            <div className="font-semibold text-slate-800 mb-1 flex items-center gap-2">
                              {opt.title}
                              {idx === 0 && (
                                <span className="bg-blue-100 text-blue-600 text-xs font-semibold px-2 py-0.5 rounded-full">FEATURED</span>
                              )}
                            </div>
                            <div className="text-sm text-slate-600 leading-relaxed">{opt.desc}</div>
                          </div>
                        ))}
                      </div>
                    ) : item.dropdown ? (
                      <div className="absolute left-0 top-full bg-white border border-slate-200 rounded-lg shadow-lg mt-2 min-w-[180px] hidden group-hover:block z-20 py-2">
                        {item.dropdown.map(opt => (
                          <div 
                            key={opt.name} 
                            className="px-4 py-2 hover:bg-slate-50 cursor-pointer text-slate-700 hover:text-blue-600 transition-colors duration-200 text-sm"
                            onClick={() => scrollToSection(opt.href)}
                          >
                            {opt.name}
                          </div>
                        ))}
                      </div>
                    ) : null}
                  </div>
                ))}
              </div>
              
              {/* Right Section */}
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => setSearchOpen(true)} 
                  className="p-2 rounded-lg hover:bg-slate-100 transition-colors duration-200"
                  aria-label="Search"
                >
                  <Search className="w-5 h-5 text-slate-600" />
                </button>
                
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => navigateToAuth('login')}
                    className="px-4 py-2 text-slate-700 font-medium hover:text-blue-600 transition-colors duration-200 text-sm"
                  >
                    Sign In
                  </button>
                  <button 
                    onClick={() => navigateToAuth('signup')}
                    className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200 text-sm shadow-sm"
                  >
                    Get Started
                  </button>
                </div>
                
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg flex items-center justify-center font-semibold text-sm shadow-sm">
                  {initials || ""}
                </div>
              </div>
            </div>

            {/* Professional Mobile Drawer */}
            <div
              className={`drawer fixed top-0 left-0 h-full w-80 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${drawerOpen ? 'translate-x-0' : '-translate-x-full'} border-r border-slate-200`}
            >
              <div className="flex flex-col h-full">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-slate-200">
                  <div className="flex items-center gap-3">
                    <img src={"https://i.postimg.cc/PrG43h61/kiwami.jpg"} alt="Logo" className="w-10 h-10 rounded-lg object-contain" />
                    <div className="flex flex-col">
                      <span className="text-lg font-bold text-slate-800">KiwamiTestCloud</span>
                      <span className="text-xs text-slate-500 font-medium">QUALITY ASSURANCE</span>
                    </div>
                  </div>
                  <button onClick={() => setDrawerOpen(false)} className="p-2 rounded-lg hover:bg-slate-100 transition-colors duration-200">
                    <X className="w-5 h-5 text-slate-600" />
                  </button>
                </div>
                
                {/* Navigation */}
                <div className="flex-1 overflow-y-auto p-6">
                  <div className="space-y-2">
                    {navItems.map(item => (
                      <div key={item.name}>
                        <button
                          className="w-full text-left text-slate-700 font-medium px-4 py-3 hover:bg-slate-50 rounded-lg flex items-center justify-between transition-colors duration-200"
                          onClick={() => item.href ? scrollToSection(item.href) : toggleDropdown(item.name)}
                        >
                          <span className="text-sm">{item.name}</span>
                          {(item.dropdown || item.megaDropdown) && (
                            <div className={`w-5 h-5 flex items-center justify-center text-slate-400 transform transition-transform duration-200 ${activeDropdown === item.name ? 'rotate-180' : ''}`}>
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                              </svg>
                            </div>
                          )}
                        </button>
                        
                        {activeDropdown === item.name && (
                          <div className="pl-4 mt-2 space-y-1 border-l-2 border-slate-200">
                            {item.dropdown?.map(opt => (
                              <button 
                                key={opt.name} 
                                onClick={() => scrollToSection(opt.href)}
                                className="block w-full text-left text-slate-600 hover:text-blue-600 py-2 px-3 text-sm rounded transition-colors duration-200 hover:bg-blue-50"
                              >
                                {opt.name}
                              </button>
                            ))}
                            {item.megaDropdown?.map(opt => (
                              <button 
                                key={opt.title} 
                                onClick={() => scrollToSection(opt.href)}
                                className="block w-full text-left text-slate-600 hover:text-blue-600 py-2 px-3 text-sm rounded transition-colors duration-200 hover:bg-blue-50"
                              >
                                {opt.title}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Footer */}
                <div className="p-6 border-t border-slate-200 bg-slate-50">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg flex items-center justify-center font-semibold text-sm shadow-sm">
                      {initials || "U"}
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-semibold text-slate-800">Welcome back!</div>
                      <div className="text-xs text-slate-500">Professional Account</div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => navigateToAuth('login')}
                      className="flex-1 px-3 py-2 text-slate-700 font-medium hover:text-blue-600 transition-colors duration-200 text-sm"
                    >
                      Sign In
                    </button>
                    <button 
                      onClick={() => navigateToAuth('signup')}
                      className="flex-1 px-3 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200 text-sm"
                    >
                      Get Started
                    </button>
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
              <svg className="absolute -bottom-2 left-0 w-full h-4" viewBox="0 0 200 20" fill="None">
                <path d="M5 15C50 5, 100 5, 195 15" stroke="#FCD34D" strokeWidth="10" strokeLinecap="round"/>
              </svg>
            </span> to dreams
          </h2>

          {/* CTA Button */}
          <div className="mb-16">
            <button 
              onClick={() => navigateToAuth('signup')}
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
                onClick={() => navigateToAuth('login')}
                className="text-blue-600 hover:text-blue-700 font-medium hover:underline transition-all duration-200"
              >
                Sign In
              </button>
            </p>
          </div>
        </div>
      </section>

      {/* Enhanced Features Section with Floating Cards */}
      <section id="features" className="py-24 px-6 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
        {/* Floating Background Elements */}
        <div className="absolute top-10 left-10 w-64 h-64 bg-blue-200/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-purple-200/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-200/20 rounded-full blur-3xl animate-pulse delay-500"></div>

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="mb-16">
            <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-6 leading-tight">
              Powerful Testing Solutions
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Transform your development workflow with our comprehensive suite of intelligent testing tools designed for modern teams who demand excellence.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {/* Test Management Card */}
            <div className="group relative bg-white/80 backdrop-blur-lg p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-white/50">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-blue-600/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-3xl flex items-center justify-center mb-6 mx-auto shadow-lg group-hover:shadow-blue-500/25 transition-all duration-500 group-hover:scale-110">
                  <CheckCircle className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-4 group-hover:text-blue-600 transition-colors duration-300">
                  Smart Test Management
                </h3>
                <p className="text-slate-600 leading-relaxed mb-6">
                  Orchestrate your entire testing lifecycle with AI-powered organization, intelligent test case generation, and automated execution flows that adapt to your workflow.
                </p>
                <div className="flex items-center justify-center text-blue-600 font-semibold group-hover:text-blue-700 transition-colors duration-300">
                  <Sparkles className="w-4 h-4 mr-2" />
                  AI-Powered
                </div>
              </div>
            </div>
            
            {/* Bug Tracking Card */}
            <div className="group relative bg-white/80 backdrop-blur-lg p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-white/50">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-green-600/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-green-600 rounded-3xl flex items-center justify-center mb-6 mx-auto shadow-lg group-hover:shadow-emerald-500/25 transition-all duration-500 group-hover:scale-110">
                  <Shield className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-4 group-hover:text-emerald-600 transition-colors duration-300">
                  Advanced Bug Tracking
                </h3>
                <p className="text-slate-600 leading-relaxed mb-6">
                  Experience next-generation issue management with automated severity classification, intelligent routing, and predictive resolution timelines powered by machine learning.
                </p>
                <div className="flex items-center justify-center text-emerald-600 font-semibold group-hover:text-emerald-700 transition-colors duration-300">
                  <Zap className="w-4 h-4 mr-2" />
                  Lightning Fast
                </div>
              </div>
            </div>
            
            {/* Analytics Card */}
            <div className="group relative bg-white/80 backdrop-blur-lg p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-white/50">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-violet-600/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-violet-600 rounded-3xl flex items-center justify-center mb-6 mx-auto shadow-lg group-hover:shadow-purple-500/25 transition-all duration-500 group-hover:scale-110">
                  <TrendingUp className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-4 group-hover:text-purple-600 transition-colors duration-300">
                  Predictive Analytics
                </h3>
                <p className="text-slate-600 leading-relaxed mb-6">
                  Unlock actionable insights with real-time dashboards, predictive quality metrics, and comprehensive reporting that transforms data into strategic advantage.
                </p>
                <div className="flex items-center justify-center text-purple-600 font-semibold group-hover:text-purple-700 transition-colors duration-300">
                  <Target className="w-4 h-4 mr-2" />
                  Data-Driven
                </div>
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="mt-20 grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { number: "10K+", label: "Active Teams", color: "text-blue-600" },
              { number: "50M+", label: "Tests Executed", color: "text-emerald-600" },
              { number: "99.9%", label: "Uptime", color: "text-purple-600" },
              { number: "40%", label: "Faster Releases", color: "text-orange-600" }
            ].map((stat, idx) => (
              <div key={idx} className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/50 hover:bg-white/80 transition-all duration-300">
                <div className={`text-3xl font-bold ${stat.color} mb-2`}>{stat.number}</div>
                <div className="text-slate-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Benefits Section with Interactive Elements */}
      <section id="benefits" className="py-24 px-6 bg-white relative overflow-hidden">
        {/* Geometric Background */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-full h-full" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%234F46E5' fill-opacity='0.4'%3E%3Ccircle cx='7' cy='7' r='2'/%3E%3Ccircle cx='27' cy='7' r='2'/%3E%3Ccircle cx='47' cy='7' r='2'/%3E%3Ccircle cx='7' cy='27' r='2'/%3E%3Ccircle cx='27' cy='27' r='2'/%3E%3Ccircle cx='47' cy='27' r='2'/%3E%3Ccircle cx='7' cy='47' r='2'/%3E%3Ccircle cx='27' cy='47' r='2'/%3E%3Ccircle cx='47' cy='47' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold text-slate-800 mb-6 leading-tight">
              Why Teams Choose 
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent block mt-2">
                KiwamiTestCloud
              </span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Join thousands of forward-thinking teams that have revolutionized their testing processes and achieved unprecedented quality outcomes.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Benefits List */}
            <div className="space-y-8">
              {[
                {
                  number: "01",
                  title: "Accelerate Release Velocity",
                  description: "Slash testing cycles by up to 60% with intelligent automation, parallel execution, and streamlined workflows that scale with your ambitions.",
                  color: "from-blue-500 to-cyan-500",
                  bgColor: "bg-blue-50"
                },
                {
                  number: "02", 
                  title: "Enhance Team Collaboration",
                  description: "Break down silos with unified dashboards, real-time notifications, and seamless integrations that keep QA, Dev, and Product teams perfectly synchronized.",
                  color: "from-emerald-500 to-teal-500",
                  bgColor: "bg-emerald-50"
                },
                {
                  number: "03",
                  title: "Scale Without Limits",
                  description: "Built on enterprise-grade infrastructure that grows with you — from startup MVPs to enterprise-scale applications handling millions of users.",
                  color: "from-purple-500 to-violet-500",
                  bgColor: "bg-purple-50"
                }
              ].map((benefit, idx) => (
                <div key={idx} className="group flex items-start gap-6 p-6 rounded-2xl hover:bg-slate-50 transition-all duration-500 cursor-pointer">
                  <div className={`w-16 h-16 bg-gradient-to-r ${benefit.color} rounded-2xl flex items-center justify-center text-white font-bold text-lg shadow-lg group-hover:shadow-xl transform group-hover:scale-110 transition-all duration-300`}>
                    {benefit.number}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-slate-800 mb-3 group-hover:text-slate-900 transition-colors duration-300">
                      {benefit.title}
                    </h3>
                    <p className="text-slate-600 leading-relaxed group-hover:text-slate-700 transition-colors duration-300">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Enhanced Testimonial Card */}
            <div className="relative">
              <div className="bg-gradient-to-br from-white to-slate-50 p-8 lg:p-12 rounded-3xl shadow-2xl border border-slate-100 relative overflow-hidden">
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full -translate-y-16 translate-x-16"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-emerald-500/10 to-cyan-500/10 rounded-full translate-y-12 -translate-x-12"></div>
                
                <img 
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" 
                  alt="Team collaboration" 
                  className="w-full h-64 lg:h-80 object-cover rounded-2xl mb-8 shadow-lg hover:shadow-xl transition-shadow duration-500"
                />
                
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-8 rounded-2xl border border-blue-100/50 relative">
                  {/* Quote Icon */}
                  <div className="absolute -top-4 -left-4 w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                    <Star className="w-4 h-4 text-white fill-current" />
                  </div>
                  
                  <p className="text-slate-700 font-medium text-lg italic mb-6 leading-relaxed">
                    "KiwamiTestCloud has completely transformed our quality assurance process. We've reduced critical bugs in production by 78% and accelerated our release cycles by 45%. It's not just a tool—it's our competitive advantage."
                  </p>
                  
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                      SJ
                    </div>
                    <div>
                      <p className="font-bold text-slate-800 text-lg">Sarah Johnson</p>
                      <p className="text-slate-600">Senior QA Lead, TechCorp Solutions</p>
                    </div>
                  </div>
                  
                  {/* Rating Stars */}
                  <div className="flex items-center gap-1 mt-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                    <span className="ml-2 text-slate-600 font-medium">5.0 out of 5</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Revolutionary CTA Section */}
      <section className="py-24 px-6 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full opacity-10">
            <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full animate-pulse"></div>
            <div className="absolute top-32 right-20 w-24 h-24 bg-white rounded-full animate-pulse delay-1000"></div>
            <div className="absolute bottom-20 left-1/4 w-20 h-20 bg-white rounded-full animate-pulse delay-500"></div>
            <div className="absolute bottom-32 right-10 w-28 h-28 bg-white rounded-full animate-pulse delay-700"></div>
          </div>
        </div>
        
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-8 leading-tight">
            Ready to Transform Your 
            <span className="block bg-gradient-to-r from-yellow-300 via-pink-300 to-cyan-300 bg-clip-text text-transparent">
              Testing Universe?
            </span>
          </h2>
          <p className="text-xl text-blue-100 mb-12 max-w-3xl mx-auto leading-relaxed">
            Join the revolution of intelligent testing. Experience the future of quality assurance with our cutting-edge platform trusted by industry leaders worldwide.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
            <button 
              onClick={() => navigateToAuth('signup')}
              className="bg-white text-blue-600 font-bold px-10 py-4 rounded-2xl text-lg transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl flex items-center justify-center gap-3 group"
            >
              <Sparkles className="w-6 h-6 group-hover:animate-spin" />
              Start Free Trial
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
            <button 
              onClick={() => scrollToSection('#contact')}
              className="bg-transparent border-3 border-white text-white font-bold px-10 py-4 rounded-2xl text-lg transition-all duration-300 transform hover:scale-105 hover:bg-white hover:text-blue-600 flex items-center justify-center gap-3"
            >
              <Monitor className="w-6 h-6" />
              Schedule Demo
            </button>
          </div>
          
          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-70">
            <div className="flex items-center gap-2 text-white">
              <Shield className="w-5 h-5" />
              <span className="font-medium">SOC 2 Compliant</span>
            </div>
            <div className="flex items-center gap-2 text-white">
              <Zap className="w-5 h-5" />
              <span className="font-medium">99.9% Uptime</span>
            </div>
            <div className="flex items-center gap-2 text-white">
              <Users className="w-5 h-5" />
              <span className="font-medium">10K+ Teams</span>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Contact Section */}
      <section className="py-24 px-4 sm:px-6 bg-gradient-to-br from-slate-50 to-blue-50" id="contact">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">
              Let's Start a 
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Conversation
              </span>
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Ready to revolutionize your testing process? Our experts are here to help you get started.
            </p>
          </div>
          
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border border-slate-100 relative overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full -translate-y-20 translate-x-20"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-emerald-500/10 to-cyan-500/10 rounded-full translate-y-16 -translate-x-16"></div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
              <div>
                <h3 className="text-3xl font-bold text-slate-800 mb-6">Get in Touch</h3>
                <p className="text-slate-600 mb-8 text-lg leading-relaxed">
                  Have questions about our platform? Want to see how we can help your team? Fill out the form and we'll connect with you via WhatsApp for a personalized consultation.
                </p>
                
                <div className="space-y-6 mb-8">
                  <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-slate-800">Address</p>
                      <p className="text-slate-600">Nairobi, Kenya</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl">
                    <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                      <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-slate-800">Email</p>
                      <a href="mailto:info@kiwamitestcloud.com" className="text-emerald-600 hover:underline font-medium">
                        info@kiwamitestcloud.com
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl">
                    <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                      <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-slate-800">Phone</p>
                      <a href="tel:+254748163492" className="text-purple-600 hover:underline font-medium">
                        0748 163 492
                      </a>
                    </div>
                  </div>
                </div>
                
                <form className="space-y-6" onSubmit={handleWhatsAppSubmit}>
                  <div>
                    <input 
                      name="name" 
                      type="text" 
                      placeholder="Your Full Name" 
                      required 
                      className="w-full border border-slate-300 rounded-2xl px-6 py-4 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white"
                    />
                  </div>
                  <div>
                    <input 
                      name="email" 
                      type="email" 
                      placeholder="Your Email Address" 
                      required 
                      className="w-full border border-slate-300 rounded-2xl px-6 py-4 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white"
                    />
                  </div>
                  <div>
                    <textarea 
                      name="message" 
                      placeholder="Tell us about your testing challenges..." 
                      rows={4} 
                      required 
                      className="w-full border border-slate-300 rounded-2xl px-6 py-4 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white resize-none"
                    />
                  </div>
                  <button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold py-4 rounded-2xl hover:from-green-600 hover:to-emerald-700 transition-all duration-300 text-lg shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center gap-3"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.106"/>
                    </svg>
                    Send to WhatsApp
                  </button>
                </form>
              </div>
              
              <div className="flex justify-center">
                <div className="relative">
                  <img 
                    src="https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?auto=format&fit=crop&w=400&q=80" 
                    alt="Customer support team" 
                    className="w-80 h-80 lg:w-96 lg:h-96 object-cover rounded-3xl shadow-2xl"
                  />
                  <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-2xl shadow-xl border border-slate-100">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="font-semibold text-slate-800">We're online!</span>
                    </div>
                    <p className="text-slate-600 text-sm mt-1">Average response time: 2 hours</p>
                  </div>
                </div>
              </div>
            </div>
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
            <button onClick={() => scrollToSection('#features')} className="hover:text-blue-400 transition">Products</button>
            <button onClick={() => scrollToSection('#features')} className="hover:text-blue-400 transition">Solutions</button>
            <button onClick={() => scrollToSection('#benefits')} className="hover:text-blue-400 transition">Why Us</button>
            <button onClick={() => scrollToSection('#features')} className="hover:text-blue-400 transition">Platform</button>
            <button onClick={() => navigateToAuth('login')} className="hover:text-blue-400 transition">Sign In</button>
            <button onClick={() => navigateToAuth('signup')} className="hover:text-blue-400 transition">Get Started</button>
            <button onClick={() => scrollToSection('#contact')} className="hover:text-blue-400 transition">Contact</button>
          </nav>
        </div>
      </footer>
    </div>
  );
}
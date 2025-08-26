import React from "react";
import GeminiChatbot from "../components/GeminiChatbot";
import LandingHeader from "../components/layout/LandingHeader";
import { useNavigate } from "react-router-dom";

const logoPath =
  "c:/Users/HP/AppData/Local/Packages/5319275A.WhatsAppDesktop_cv1g1gvanyjgm/TempState/FA6D3CC166FBFBF005C9E77D96CBA283/WhatsApp Image 2025-08-25 at 15.02.58_e5effac0.jpg";

export default function LandingPage() {
  const navigate = useNavigate();
  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user") as string)
    : null;
  // Example images (replace with your own or use public URLs)
  const productImg = "https://media.istockphoto.com/id/1357020474/photo/quality-management-with-qa-qc-and-improvement-standardisation-and-certification-concept.jpg?b=1&s=612x612&w=0&k=20&c=SgWt664A5WDYilN3KZ5AKtJ4He2BRC8OE755pfJEg_k=";
  const solutionsImg = "https://media.istockphoto.com/id/1471444483/photo/customer-satisfaction-survey-concept-users-rate-service-experiences-on-online-application.jpg?b=1&s=612x612&w=0&k=20&c=2Wtg2ur5qT3ZFazgxIJYmkPD1ds8p_IVMmrABjZ4NOM=";
  const whyUsImg = "https://media.istockphoto.com/id/952729630/photo/test-pushing-keyboard-with-finger-3d-illustration.jpg?s=612x612&w=0&k=20&c=y6zIqQjHBkqN1LPQ8xXJD8qFLwWwRVanFLhhhppczNE=";
  const resourcesImg = "https://media.istockphoto.com/id/1682026943/photo/customer-services-best-excellent-business-rating-experience-satisfaction-survey-concept-user.jpg?s=612x612&w=0&k=20&c=ySiKwWDXEM3nB38NESUAKmGRqBWDaPYw9OFQCD7Muok=";

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <LandingHeader user={user} />
      <GeminiChatbot />
      {/* Products Section */}
      <section className="py-20 px-18 bg-white">
        <div className="flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto">
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-4xl md:text-5xl text-blue-600 mb-12 tracking-tight">Our Products</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="p-6 md:p-10 bg-blue-100 via-white to-blue-50 rounded-3xl shadow-2xl hover:scale-105 hover:shadow-blue-200 transition-all duration-300 border border-gray-100">
                <h3 className="text-2xl text-indigo-600 mb-4">Test Management</h3>
                <p className="text-black font-semibold text-lg">Organize, manage, and execute test cases with ease. Keep your QA cycle efficient and transparent.</p>
              </div>
              <div className="p-8 md:p-10 bg-blue-100 via-white to-blue-50 rounded-3xl shadow-2xl hover:scale-105 hover:shadow-blue-200 transition-all duration-300 border border-gray-100">
                <h3 className="text-2xl text-indigo-600 mb-4">Bug Tracking</h3>
                <p className="text-black font-semibold text-lg">Log, track, and prioritize bugs effectively to ensure faster resolution and smoother releases.</p>
              </div>
              <div className="p-8 md:p-10 bg-blue-100 via-white to-blue-50 rounded-3xl shadow-2xl hover:scale-105 hover:shadow-blue-200 transition-all duration-300 border border-gray-100">
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
              <div className="p-8 md:p-10 bg-blue-100 via-gray-50 to-blue-50 rounded-3xl shadow-2xl hover:scale-105 hover:shadow-blue-200 transition-all duration-300 border border-gray-100">
                <h3 className="text-2xl text-indigo-600 mb-4">Automation Testing</h3>
                <p className="text-black font-semibold text-lg">Integrate with automation tools to speed up repetitive testing and enhance coverage.</p>
              </div>
              <div className="p-8 md:p-10 bg-blue-100 via-gray-50 to-blue-50 rounded-3xl shadow-2xl hover:scale-105 hover:shadow-blue-200 transition-all duration-300 border border-gray-100">
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
                <p className="text-black font-semibold text-lg">Join live and recorded sessions from QA experts to enhance your team’s skills.</p>
              </div>
            </div>
          </div>
          <div className="flex-1 flex justify-center md:justify-end mt-8 md:mt-0">
            <img src={resourcesImg} alt="Resources" className="w-72 h-72 md:w-96 md:h-96 object-cover rounded-3xl shadow-2xl border border-gray-100" />
          </div>
        </div>
      </section>
    </div>
  );
}

import React from "react";
import LandingHeader from "../components/layout/LandingHeader";
import { useNavigate } from "react-router-dom";

const logoPath =
  "c:/Users/HP/AppData/Local/Packages/5319275A.WhatsAppDesktop_cv1g1gvanyjgm/TempState/FA6D3CC166FBFBF005C9E77D96CBA283/WhatsApp Image 2025-08-25 at 15.02.58_e5effac0.jpg";

export default function LandingPage() {
  const navigate = useNavigate();
  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user") as string)
    : null;
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <LandingHeader user={user} />
      {/* Products Section */}
      <section className="py-20 px-6 bg-white text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-10">Our Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="p-6 bg-gray-50 rounded-xl shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-indigo-600 mb-2">Test Management</h3>
            <p className="text-gray-600">
              Organize, manage, and execute test cases with ease. Keep your QA cycle
              efficient and transparent.
            </p>
          </div>
          <div className="p-6 bg-gray-50 rounded-xl shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-indigo-600 mb-2">Bug Tracking</h3>
            <p className="text-gray-600">
              Log, track, and prioritize bugs effectively to ensure faster resolution and
              smoother releases.
            </p>
          </div>
          <div className="p-6 bg-gray-50 rounded-xl shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-indigo-600 mb-2">Reporting</h3>
            <p className="text-gray-600">
              Generate detailed QA reports with insights into progress, quality metrics,
              and accountability.
            </p>
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section className="py-20 px-6 bg-gray-50 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-10">Solutions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <div className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-indigo-600 mb-2">Automation Testing</h3>
            <p className="text-gray-600">
              Integrate with automation tools to speed up repetitive testing and enhance
              coverage.
            </p>
          </div>
          <div className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-indigo-600 mb-2">Manual Testing</h3>
            <p className="text-gray-600">
              Support structured manual testing with clear traceability between
              requirements and test cases.
            </p>
          </div>
        </div>
      </section>

      {/* Why Us Section */}
      <section className="py-20 px-6 bg-white text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-10">Why Choose Us?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="p-6 bg-gray-50 rounded-xl shadow">
            <h3 className="text-xl font-semibold text-indigo-600 mb-2">All-in-One QA</h3>
            <p className="text-gray-600">
              From requirements to reports, manage the entire QA lifecycle in one
              platform.
            </p>
          </div>
          <div className="p-6 bg-gray-50 rounded-xl shadow">
            <h3 className="text-xl font-semibold text-indigo-600 mb-2">Collaboration</h3>
            <p className="text-gray-600">
              Foster teamwork across QA, Dev, and Product teams with shared visibility
              and updates.
            </p>
          </div>
          <div className="p-6 bg-gray-50 rounded-xl shadow">
            <h3 className="text-xl font-semibold text-indigo-600 mb-2">Scalable</h3>
            <p className="text-gray-600">
              Built for startups and enterprises alike — scale effortlessly as your team
              grows.
            </p>
          </div>
        </div>
      </section>

      {/* Resources Section */}
      <section className="py-20 px-6 bg-gray-50 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-10">Resources</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="p-6 bg-white rounded-xl shadow">
            <h3 className="text-xl font-semibold text-indigo-600 mb-2">Docs</h3>
            <p className="text-gray-600">
              Explore detailed documentation to set up, integrate, and maximize your QA
              workflows.
            </p>
          </div>
          <div className="p-6 bg-white rounded-xl shadow">
            <h3 className="text-xl font-semibold text-indigo-600 mb-2">Blogs</h3>
            <p className="text-gray-600">
              Stay updated with industry trends, testing strategies, and product
              insights.
            </p>
          </div>
          <div className="p-6 bg-white rounded-xl shadow">
            <h3 className="text-xl font-semibold text-indigo-600 mb-2">Webinars</h3>
            <p className="text-gray-600">
              Join live and recorded sessions from QA experts to enhance your team’s
              skills.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

import React from "react";
import GeminiChatbot from "../components/GeminiChatbot";
import LandingHeader from "../components/layout/LandingHeader";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const LandingPage = () => {
  const navigate = useNavigate();
  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user") as string)
    : null;

  // Example images (replace with your own or public assets)
  const productImg =
    "https://media.istockphoto.com/id/1357020474/photo/quality-management-with-qa-qc-and-improvement-standardisation-and-certification-concept.jpg?b=1&s=612x612&w=0&k=20&c=SgWt664A5WDYilN3KZ5AKtJ4He2BRC8OE755pfJEg_k=";
  const solutionsImg =
    "https://media.istockphoto.com/id/1471444483/photo/customer-satisfaction-survey-concept-users-rate-service-experiences-on-online-application.jpg?b=1&s=612x612&w=0&k=20&c=2Wtg2ur5qT3ZFazgxIJYmkPD1ds8p_IVMmrABjZ4NOM=";
  const whyUsImg =
    "https://media.istockphoto.com/id/952729630/photo/test-pushing-keyboard-with-finger-3d-illustration.jpg?s=612x612&w=0&k=20&c=y6zIqQjHBkqN1LPQ8xXJD8qFLwWwRVanFLhhhppczNE=";
  const resourcesImg =
    "https://media.istockphoto.com/id/1682026943/photo/customer-services-best-excellent-business-rating-experience-satisfaction-survey-concept-user.jpg?s=612x612&w=0&k=20&c=ySiKwWDXEM3nB38NESUAKmGRqBWDaPYw9OFQCD7Muok=";

  const Section = ({
    title,
    img,
    children,
    reverse = false,
    bg = "bg-white",
  }: {
    title: string;
    img: string;
    children: React.ReactNode;
    reverse?: boolean;
    bg?: string;
  }) => (
    <section className={`${bg} py-24 px-6`}>
      <div
        className={`flex flex-col ${
          reverse ? "md:flex-row-reverse" : "md:flex-row"
        } items-center justify-between max-w-7xl mx-auto gap-12`}
      >
        <motion.div
          initial={{ opacity: 0, x: reverse ? 50 : -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex-1 text-center md:text-left"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-12 tracking-tight">
            {title}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">{children}</div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: reverse ? -50 : 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex-1 flex justify-center md:justify-end"
        >
          <img
            src={img}
            alt={title}
            className="w-72 h-72 md:w-96 md:h-96 object-cover rounded-3xl shadow-2xl border border-gray-100"
          />
        </motion.div>
      </div>
    </section>
  );

  const Card = ({
    title,
    desc,
  }: {
    title: string;
    desc: string;
  }) => (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 200 }}
      className="p-8 bg-gradient-to-br from-blue-50 to-white rounded-3xl shadow-xl border border-gray-100 hover:shadow-blue-200 transition-all duration-300"
    >
      <h3 className="text-2xl font-semibold text-indigo-600 mb-4">{title}</h3>
      <p className="text-gray-700 font-medium text-lg leading-relaxed">{desc}</p>
    </motion.div>
  );

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-white via-blue-50 to-purple-50">
      <LandingHeader user={user} />

      {/* ✅ Hero Section inline */}
      <section className="relative flex flex-col items-center justify-center text-center px-6 py-32 md:py-40 overflow-hidden">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-6xl font-extrabold leading-tight bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent drop-shadow-lg"
        >
          Elevate Your QA Process
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="mt-6 max-w-2xl text-lg md:text-xl text-gray-700"
        >
          A modern platform for test management, bug tracking, and quality
          assurance built for agile teams.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="mt-10 flex gap-6"
        >
          <button
            onClick={() => navigate("/signup")}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold shadow-lg hover:scale-105 transition-transform duration-300"
          >
            Get Started
          </button>
          <button
            onClick={() => navigate("/demo")}
            className="px-6 py-3 rounded-xl bg-white border border-gray-300 text-gray-700 font-semibold shadow-md hover:bg-gray-50 transition-colors duration-300"
          >
            Live Demo
          </button>
        </motion.div>
      </section>

      {/* Chatbot */}
      <GeminiChatbot />

      {/* Products */}
      <Section title="Our Products" img={productImg}>
        <Card
          title="Test Management"
          desc="Organize, manage, and execute test cases with ease. Keep your QA cycle efficient and transparent."
        />
        <Card
          title="Bug Tracking"
          desc="Log, track, and prioritize bugs effectively to ensure faster resolution and smoother releases."
        />
        <Card
          title="Reporting"
          desc="Generate detailed QA reports with insights into progress, quality metrics, and accountability."
        />
      </Section>

      {/* Solutions */}
      <Section title="Solutions" img={solutionsImg} bg="bg-gray-50" reverse>
        <Card
          title="Automation Testing"
          desc="Integrate with automation tools to speed up repetitive testing and enhance coverage."
        />
        <Card
          title="Manual Testing"
          desc="Support structured manual testing with clear traceability between requirements and test cases."
        />
      </Section>

      {/* Why Us */}
      <Section title="Why Choose Us?" img={whyUsImg}>
        <Card
          title="All-in-One QA"
          desc="From requirements to reports, manage the entire QA lifecycle in one platform."
        />
        <Card
          title="Collaboration"
          desc="Foster teamwork across QA, Dev, and Product teams with shared visibility and updates."
        />
        <Card
          title="Scalable"
          desc="Built for startups and enterprises alike — scale effortlessly as your team grows."
        />
      </Section>

      {/* Resources */}
      <Section title="Resources" img={resourcesImg} bg="bg-gray-50" reverse>
        <Card
          title="Docs"
          desc="Explore detailed documentation to set up, integrate, and maximize your QA workflows."
        />
        <Card
          title="Blogs"
          desc="Stay updated with industry trends, testing strategies, and product insights."
        />
        <Card
          title="Webinars"
          desc="Join live and recorded sessions from QA experts to enhance your team’s skills."
        />
      </Section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Company CTA */}
          <div>
            <h2 className="text-2xl font-bold mb-4">
              Ready to elevate your QA process?
            </h2>
            <button
              onClick={() => navigate("/signup")}
              className="px-6 py-3 bg-white text-blue-700 font-semibold rounded-xl shadow-md hover:scale-105 transition-all duration-300"
            >
              Get Started
            </button>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Products</h3>
            <ul className="space-y-2 text-gray-100">
              <li><a href="#products" className="hover:underline">Test Management</a></li>
              <li><a href="#products" className="hover:underline">Bug Tracking</a></li>
              <li><a href="#products" className="hover:underline">Reporting</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Solutions</h3>
            <ul className="space-y-2 text-gray-100">
              <li><a href="#solutions" className="hover:underline">Automation Testing</a></li>
              <li><a href="#solutions" className="hover:underline">Manual Testing</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Resources</h3>
            <ul className="space-y-2 text-gray-100">
              <li><a href="#resources" className="hover:underline">Docs</a></li>
              <li><a href="#resources" className="hover:underline">Blogs</a></li>
              <li><a href="#resources" className="hover:underline">Webinars</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/20 py-6 text-center text-gray-200 text-sm">
          © {new Date().getFullYear()} QA Platform. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;

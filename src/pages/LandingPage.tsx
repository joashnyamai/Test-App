import React from "react";
import LandingHeader from "../components/layout/LandingHeader";
import { useNavigate } from "react-router-dom";

const logoPath = "c:/Users/HP/AppData/Local/Packages/5319275A.WhatsAppDesktop_cv1g1gvanyjgm/TempState/FA6D3CC166FBFBF005C9E77D96CBA283/WhatsApp Image 2025-08-25 at 15.02.58_e5effac0.jpg";

export default function LandingPage() {
  const navigate = useNavigate();
  const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <LandingHeader user={user} />
  {/* ...existing code for single hero section only... */}
    </div>
  );
}

// src/pages/Home.tsx
import ComponentName from "../layout/HeroSection";
import { Footer } from "../layout/Footer";
import { WhyChooseSection } from "../layout/WhyChooseSection";
import { EventsShowcase } from "../layout/EventShowcase";
import StatsSection from "../layout/stats";
import WalletDemo from "./WalletDemo";

export default function Home() {
  return (
    <div className="relative w-full min-h-screen bg-black">
      {/* 3D Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full">
          {/* Floating 3D Elements */}
          <div className="absolute top-20 left-10 w-32 h-32 bg-white opacity-[0.03] rounded-full blur-2xl animate-float"></div>
          <div className="absolute top-40 right-20 w-48 h-48 bg-white opacity-[0.02] rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
          <div className="absolute bottom-40 left-1/4 w-40 h-40 bg-white opacity-[0.025] rounded-full blur-2xl animate-float" style={{animationDelay: '4s'}}></div>
          
          {/* Grid Pattern */}
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/[0.01] to-transparent"></div>
          <div 
            className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage: `
                linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px'
            }}
          ></div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        <ComponentName />
        <WhyChooseSection />
        <EventsShowcase />
        <StatsSection />
        <Footer />
      </div>
    </div>
  );
}
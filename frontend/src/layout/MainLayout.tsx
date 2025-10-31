import Navbar from "../layout/Navbar";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-black">
      {/* 3D Background Pattern */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black opacity-50"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white opacity-[0.02] rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white opacity-[0.02] rounded-full blur-3xl animate-float" style={{animationDelay: '3s'}}></div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="relative z-10">
        <Navbar />
        <main className="min-h-screen">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;

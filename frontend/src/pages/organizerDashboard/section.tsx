// src/pages/organizerDashboard/section.tsx

"use client";

import { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Menu } from "lucide-react";
import { OrganizerSidebar } from "./Sections/organizer-sidebar";
import logo from "/logo.png";
import { useWallet } from "@solana/wallet-adapter-react";
import { getOrganizerEvents } from "../../lib/dashboard"; // Assuming this function exists and works
import { FastDashboard } from "../../components/FastDashboard";

// This component now acts as a LAYOUT for all /dashboard/* routes
export default function OrganizerDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isOrganizer, setIsOrganizer] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { publicKey, connected } = useWallet();
  const wallet = connected && publicKey ? publicKey.toString() : "";

  useEffect(() => {
    const checkIfUserIsOrganizer = async () => {
      if (!wallet) {
        setLoading(false);
        return;
      }
      
      // Set a timeout to prevent infinite loading
      const timeoutId = setTimeout(() => {
        console.warn("Organizer check timed out, proceeding anyway");
        setLoading(false);
      }, 5000);

      try {
        const events = await getOrganizerEvents(wallet);
        if (events && events.length > 0) {
          setIsOrganizer(true);
        }
        clearTimeout(timeoutId);
      } catch (error) {
        console.error("Error checking organizer status:", error);
        // Even if there's an error, allow the user to proceed
        clearTimeout(timeoutId);
      } finally {
        setLoading(false);
      }
    };

    // Add a small delay to ensure wallet is properly connected
    const delayedCheck = setTimeout(() => {
      checkIfUserIsOrganizer();
    }, 1000);

    return () => clearTimeout(delayedCheck);
  }, [wallet]);

  const handleManageEvent = (section: string, eventId?: string) => {
    if (section === "attendee-management" && eventId) {
      navigate(`/dashboard/events/${eventId}/attendees`);
    }
  };

  const handleEventCreated = () => {
    setIsOrganizer(true);
  };

  // Show QuickDashboard immediately when wallet is connected, even while loading
  if (loading && connected) {
    return (
      <div className="min-h-screen bg-black text-white">
        <div className="relative flex">
          <OrganizerSidebar
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
            isOrganizer={isOrganizer}
          />
          <div className="flex-1 lg:ml-64">
            <FastDashboard />
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-black text-white">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-gray-800 border-t-blue-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p>Connecting to Soluma...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="relative flex">
        <OrganizerSidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          isOrganizer={isOrganizer}
        />

        <div className="flex-1 lg:ml-64">
          <div className="lg:hidden flex items-center justify-between p-4 border-b border-gray-800">
             <a href="/" className="inline-flex items-center cursor-pointer group">
               <img src={logo} alt="Soluma Logo" className="h-8 w-8 mr-2" />
               <span className="text-xl font-bold tracking-tight">
                 <span className="text-white group-hover:text-cyan-300 transition-colors duration-200">
                   Solu
                 </span>
                 <span className="text-cyan-400 group-hover:text-blue-400 transition-colors duration-200">
                   ma
                 </span>
               </span>
             </a>
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>

          <main className="p-4 lg:p-8">
            {/* The Outlet renders the active nested route component */}
            <Outlet context={{ handleManageEvent, isOrganizer, handleEventCreated }} />
          </main>
        </div>

        {sidebarOpen && (
          <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
        )}
      </div>
    </div>
  );
}
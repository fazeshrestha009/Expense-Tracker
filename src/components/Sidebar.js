import React from 'react';
import { FaHome, FaWallet, FaCog, FaPhone } from 'react-icons/fa';

function Sidebar() {
  return (
    <div className="w-64 h-screen bg-gray-800 text-gray-300 p-6 flex flex-col">
      <div className="text-2xl font-bold text-white mb-8">Menu</div>
      <div className="flex flex-col gap-4">
        <SidebarLink icon={<FaHome />} label="Home" />
        <SidebarLink icon={<FaWallet />} label="Expenses" />
        <SidebarLink icon={<FaCog />} label="Settings" />
        <SidebarLink icon={<FaPhone />} label="Support" />
      </div>
    </div>
  );
}

function SidebarLink({ icon, label }) {
  return (
    <div className="flex items-center gap-2 p-2 hover:bg-gray-700 rounded cursor-pointer">
      {icon}
      <span>{label}</span>
    </div>
  );
}

export default Sidebar;

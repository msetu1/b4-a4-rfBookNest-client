import { useState } from "react";
import { FaUser, FaEnvelope, FaPhone, FaVenus } from "react-icons/fa";
import { useAppSelector } from "../../redux/hooks";
import { useCurrentUser } from "../../redux/feature/auth/authSlice";
import AdditionalInfo from "./AdditionalInfo";
import AccountSettings from "./AccountSettings";
import EditProfileForm from "./EditProfileForm";
import HomeGradient from "../../UI/HomeGradient";

export default function UserProfile() {
  const [activeTab, setActiveTab] = useState("overview");
  const [isEditing, setIsEditing] = useState(false);
   const user = useAppSelector(useCurrentUser);

  const menuItems = [
    { id: "overview", label: "Profile Overview", icon: <FaUser />, activeColor: "bg-blue-100 text-black font-semibold" },
    { id: "info", label: "Additional Info", icon: "📄", activeColor: "bg-gray-100 text-black font-semibold" },
    { id: "settings", label: "Account Settings", icon: "⚙️", activeColor: "bg-gray-100 text-black font-semibold" },
  ];

  return (
    <div className="flex gap-6 p-6 text-white  min-h-screen bg-black">
      <HomeGradient/>
      {/* Sidebar */}
      <div className="w-[25%] text-white border border-gray-700 rounded-lg shadow-lg p-6">
        <div className="flex flex-col items-center">
          <img
            src={user?.imageUrl}
            alt="Profile"
            className="w-24 h-24 rounded-full"
          />
          <h2 className="mt-4 text-lg font-semibold text-blue-500">
          {user?.name}
          </h2>
          <p className="text-white">{user?.email}</p>
          <div className="w-full mt-4">
            <p className="text-sm text-white mb-1">Profile Completion</p>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: "80%" }}></div>
            </div>
            <p className="text-right text-red-500 text-sm">80%</p>
          </div>
        </div>

        <div className="mt-6">
          {menuItems.map((item) => (
            <button
              key={item.id}
              className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg text-left ${
                activeTab === item.id ? item.activeColor : "text-white"
              }`}
              onClick={() => setActiveTab(item.id)}
            >
              {item.icon} {item.label}
            </button>
          ))}
        </div>

        <button 
          className="mt-6 w-full bg-blue-600 font-semibold text-white py-2 rounded-lg"
          onClick={() => setIsEditing(true)}
        >
          ✏️ Edit Profile
        </button>
      </div>

      {/* Content */}
      <div className="w-[75%] text-white border border-gray-700  rounded-lg shadow-lg p-6">
        {isEditing ? (
          <div>
            <EditProfileForm user={user} />
          </div>
        ) : (
          <>
            {activeTab === "overview" && (
              <>
                <h2 className="text-2xl font-bold">Profile Overview</h2>
                <div className="mt-4 space-y-3">
                  <p className="flex items-center gap-2 text-white">
                    <FaUser className="text-blue-500" /> <strong>Name:</strong> {user?.name}
                  </p>
                  <p className="flex items-center gap-2 text-white">
                    <FaEnvelope className="text-green-500" /> <strong>Email:</strong> {user?.email}
                  </p>
                  <p className="flex items-center gap-2 text-white">
                    <FaPhone className="text-blue-500" /> <strong>Phone:</strong> 017000
                  </p>
                  <p className="flex items-center gap-2 text-white">
                    <FaVenus className="text-pink-500" /> <strong>Gender:</strong> Female
                  </p>
                </div>
              </>
            )}

            {activeTab === "info" && (
              <>
                <AdditionalInfo user={user} />
              </>
            )}

            {activeTab === "settings" && (
              <>
                <AccountSettings user={user} />
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}

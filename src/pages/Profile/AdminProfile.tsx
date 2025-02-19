import { useState, useEffect } from "react";
import { useCurrentUser } from "../../redux/feature/auth/authSlice";
import { useAppSelector } from "../../redux/hooks";
import { FaEnvelope, FaPhone, FaUser, FaVenus } from "react-icons/fa";
import HomeGradient from "../../UI/HomeGradient";
import AdminAdditionalInfo from "./AdminAdditionalInfo";
import AdminAccountSettings from "./AdminAccountSettings";
import AdminEditProfileForm from "./AdminEditProfileForm";
import { RingLoader } from "react-spinners";

const AdminProfile = () => {
    const [activeTab, setActiveTab] = useState("overview");
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(true);
    
    const user = useAppSelector(useCurrentUser);

    useEffect(() => {
        // Simulate API loading time
        setTimeout(() => {
            setLoading(false);
        }, 1000); // Adjust timing as needed
    }, []);

    const menuItems = [
        { id: "overview", label: "Profile Overview", icon: <FaUser />, activeColor: "bg-gray-100 text-black font-semibold" },
        { id: "info", label: "Additional Info", icon: "📄", activeColor: "bg-gray-100 text-black font-semibold" },
        { id: "settings", label: "Account Settings", icon: "⚙️", activeColor: "bg-gray-100 text-black font-semibold" },
    ];

    if (loading) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center text-white text-center px-4 bg-black">
                <HomeGradient />
                <RingLoader size={80} color="#C16EFD" />
                <p className="mt-4 text-gray-300">Loading Admin Profile...</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col lg:flex-row gap-6 p-6 text-white min-h-screen bg-black">
            <HomeGradient />
            
            {/* Sidebar */}
            <div className="lg:w-[25%] w-full text-white border border-gray-700 rounded-lg shadow-lg p-6">
                <div className="flex flex-col items-center">
                    <img src={user?.imageUrl} alt="Profile" className="w-24 h-24 rounded-full" />
                    <h2 className="mt-4 text-lg font-semibold text-blue-500">{user?.name}</h2>
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
                    className="mt-6 w-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg hover:from-blue-500 hover:to-purple-500 focus:outline-none text-white py-2"
                    onClick={() => setIsEditing(true)}
                >
                    ✏️ Edit Profile
                </button>
            </div>

            {/* Content */}
            <div className="lg:w-[75%] w-full text-white border border-gray-700 rounded-lg shadow-lg p-6">
                {isEditing ? (
                    <AdminEditProfileForm user={user} />
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

                        {activeTab === "info" && <AdminAdditionalInfo user={user} />}
                        {activeTab === "settings" && <AdminAccountSettings user={user} />}
                    </>
                )}
            </div>
        </div>
    );
};

export default AdminProfile;


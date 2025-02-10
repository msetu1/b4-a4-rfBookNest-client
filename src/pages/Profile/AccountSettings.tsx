import { FaCheckCircle, FaClock, FaGraduationCap } from "react-icons/fa";


const AccountSettings = ({ user }) => {

      // Convert to a JavaScript Date object
      const date = new Date();
      const formattedDate = date.toDateString();

      return (
            <div className="px-8 font-inter">
                  <h2 className="text-2xl font-bold">Account Settings</h2>

                  <div className="space-y-4 mt-4">
                        {/* Role */}
                        <div className="flex items-center space-x-3 text-white">
                              <FaGraduationCap className="text-indigo-500" />
                              <p className="font-medium">
                                    <span className="text-white font-semibold">Role:</span> <span className="uppercase">{user?.role || "N/A"}</span>
                              </p>
                        </div>

                        {/* Status */}
                        <div className="flex items-center space-x-3 text-white">
                              <FaCheckCircle className="text-green-500" />
                              <p className="font-medium">
                                    <span className="text-white font-semibold">Status:</span> {user?.accountSettings?.status || "N/A"}
                              </p>
                        </div>

                        {/* Last Login */}
                        <div className="flex items-center space-x-3 text-white">
                              <FaClock className="text-blue-500" />
                              <p className="font-medium">
                                    <span className="text-white font-semibold">Last Login:</span> {formattedDate || "N/A"}
                              </p>
                        </div>
                  </div>
            </div>
      );
};

export default AccountSettings;
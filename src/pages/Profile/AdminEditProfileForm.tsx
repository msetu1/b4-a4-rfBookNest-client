import { useForm } from "react-hook-form";

type User = {
      email: string;
      gender?: string;
      phone?: string;
      country?: string;
      district?: string;
      streetAddress?: string;
      facebook?: string;
      linkedin?: string;
      github?: string;
      status?: string;
    };
    
    type EditProfileFormProps = {
      user: User;
    };

const AdminEditProfileForm: React.FC<EditProfileFormProps> = ({user}) => {
    const {
                
                register,
                formState: { errors },
              } = useForm();
    return (
        <div className="px-8 max-h-[82vh] overflow-y-auto custom-scrollbar font-inter">
        <h2 className="text-2xl font-bold">Update Profile</h2>

        <form className="space-y-6">
              {/* Name Field */}
              <div className="flex flex-col">
                    <label className="text-white font-semibold mb-1">Name</label>
                    <input
                          {...register("name", { required: "Name is required" })}
                          className="w-full px-4 py-2 bg-[#1B1B31] rounded-lg border border-gray-700"
                    />
                    {errors.name && 
                  //   <p className="text-red-500">{errors.name.message}</p>
                  <p></p>

                    }
              </div>

              {/* Email Field */}
              <div className="flex flex-col">
                    <label className="text-white font-semibold mb-1">Email</label>
                    <input
                          defaultValue={user?.email}
                          type="email"
                          readOnly
                          className="w-full px-4 py-2 bg-[#1B1B31] rounded-lg border border-gray-700"
                    />
              </div>

              {/* Phone Field */}
              <div className="flex flex-col">
                    <label className="text-white font-semibold mb-1">Phone</label>
                    <input
                          {...register("phone")}
                          type="tel"
                          className="w-full px-4 py-2 bg-[#1B1B31] rounded-lg border border-gray-700"
                    />
              </div>

              {/* Gender Field */}
              <div className="flex flex-col">
                    <label className="text-white font-semibold mb-1">Gender</label>
                    <select
                          {...register("gender")}
                          defaultValue={user?.gender || ""}
                          className="w-full px-4 py-2 bg-[#1B1B31] rounded-lg border border-gray-700"
                    >
                          <option value="">Select Gender</option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                    </select>
              </div>

              {/* Address Fields */}
              <div className="flex flex-col">
                    <label className="text-white font-semibold mb-1">Country</label>
                    <input
                          {...register("country")}
                          className="w-full px-4 py-2 bg-[#1B1B31] rounded-lg border border-gray-700"
                    />
              </div>

              <div className="flex flex-col">
                    <label className="text-white font-semibold mb-1">District</label>
                    <input
                          {...register("district")}
                          className="w-full px-4 py-2 bg-[#1B1B31] rounded-lg border border-gray-700"
                    />
              </div>

              <div className="flex flex-col">
                    <label className="text-white font-semibold mb-1">Street Address</label>
                    <input
                          {...register("streetAddress")}
                          className="w-full px-4 py-2 bg-[#1B1B31] rounded-lg border border-gray-700"
                    />
              </div>

              {/* Social Links */}
              <div className="flex flex-col">
                    <label className="text-white font-semibold mb-1">Facebook</label>
                    <input
                          {...register("facebook")}
                          className="w-full px-4 py-2 bg-[#1B1B31] rounded-lg border border-gray-700"
                    />
              </div>

              <div className="flex flex-col">
                    <label className="text-white font-semibold mb-1">LinkedIn</label>
                    <input
                          {...register("linkedin")}
                          className="w-full px-4 py-2 bg-[#1B1B31] rounded-lg border border-gray-700"
                    />
              </div>


              <div className="flex flex-col">
                    <label className="text-white font-semibold mb-1">GitHub</label>
                    <input
                          {...register("github")}
                          className="w-full px-4 py-2 bg-[#1B1B31] rounded-lg border border-gray-700"
                    />
              </div>

              {/* Status Field */}
              <div className="flex flex-col">
                    <label className="text-white font-semibold mb-1">Status</label>
                    <input
                          {...register("status")}
                          className="w-full px-4 py-2 bg-[#1B1B31] rounded-lg border border-gray-700"
                    />
              </div>

              {/* Save Button */}
              <div className="flex justify-center">

              {/* <button
  type="submit"
  className="w-full px-4 py-2 text-sm text-white font-medium border border-[#C16EFD] rounded-lg bg-[linear-gradient(105deg,_#6384FC_4.1%,_#C16EFD_54.8%,_#6384FC_92.38%)] flex items-center justify-center"
>
  <p>Save change</p>
             </button> */}
             <button
                  // onClick={() => handleLogout()}
                  className="w-full  mb-[40px] text-center  py-2 text-lg font-medium text-white bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg hover:from-blue-500 hover:to-purple-500 focus:outline-none"
                >
                  <span className="text-white">Save Changes</span>
        </button>
              </div>
        </form>
  </div>
    );
};

export default AdminEditProfileForm;
import { RingLoader } from "react-spinners";
import {
  useActiveAccountMutation,
  useAllUserDataQuery,
  useChangeRoleMutation,
  useDeactivateAccountMutation,
} from "../../redux/feature/auth/authApi";
import { toast } from "sonner";
import HomeGradient from "../../UI/HomeGradient";
import GradientBackground from "../../UI/GradientBackground";

type TUser = {
  createdAt: string; // ISO date string
  email: string;
  isBlocked: boolean;
  name: string;
  role: string;
  updatedAt: string; // ISO date string
  __v: number;
  _id: string; // ObjectId as a string
};
const DeactivatingAccounts = () => {
  const { data, isLoading } = useAllUserDataQuery(undefined, {
    pollingInterval: 2000,
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
    refetchOnReconnect: true,
  });
  const [deactivateAccount] = useDeactivateAccountMutation();
  const [activeAccount] = useActiveAccountMutation();
  const [changeRole] = useChangeRoleMutation();

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden text-white text-center px-4 bg-black">
        <GradientBackground />
        <RingLoader  size={80} color="#C16EFD" />
      </div>
    );
  }

  const usersData = data?.data;

  const handleDeactive = async (id: string) => {
    try {

      const userInfo = {
        id: id,
      };

      const result = await deactivateAccount(userInfo).unwrap();  

      toast.success(result.message, { duration: 2000 });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      // console.error("Error deactivating account:", err);
    }
  };
  const handleActive = async (id: string) => {
    try {

      const userInfo = {
        id: id,
      };


      const result = await activeAccount(userInfo).unwrap(); // unwrap to get the actual response data
      
      // handle the success response

      toast.success(result.message, { duration: 2000 });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      // console.error("Error deactivating account:", err);
    }
  };

  const handleRoleChange = async (
    selectedRole: string,
    selectedUserEmail: string
  ) => {

    try {
      const userRole = {
        role: selectedRole,
        email: selectedUserEmail,
      };
      const result = await changeRole(userRole).unwrap();
      toast.success(result.message, { duration: 2000 });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Something went wrong", { duration: 2000 });
    }
  };

  return (
    <div className="bg-black min-h-screen">
      <HomeGradient/>
      <h1 className="text-3xl font-bold text-white pt-5 ml-4 mb-6">User Management</h1>
      <div className="container p-2 mx-auto sm:p-4 overflow-x-auto text-white ">
        <table className="min-w-full table-auto ">
          {/* head */}
          <thead className="border border-gray-700 bg-[#1B1B31]">
            <tr>
              <th className="px-6 py-3 text-left">Name</th>
              <th className="px-6 py-3 text-left">Email</th>
              <th className="px-6 py-3 text-left">Role</th>
              <th className="px-6 py-3 text-left">Change Role</th>
              <th className="px-6 py-3 text-left">Action</th>
            </tr>
          </thead>
          <tbody className="border border-gray-700">
            {/* row 1 */}
            {usersData?.map((item: TUser, idx: number) => (
              <tr key={idx} className="border-b border-gray-700">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div>
                      <div className="font-bold">{item.name}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="font-bold">{item.email}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="font-bold">{item.role}</div>
                </td>
                <td className="px-6 py-4 text-black">
                  <select
                    onChange={(e) =>
                      handleRoleChange(e.target.value, item.email)
                    }
                    defaultValue={""}
                    className="border rounded-lg px-2 py-1 focus:outline-none"
                  >
                    <option value="" disabled className="bg-[#1C1C32] text-white">
                      Select Role
                    </option>

                    <option
                      value={"user"}
                      disabled={item.role === "user"}
                      className=" bg-[#1C1C32] text-white"
                    >
                      User
                    </option>
                    <option
                      value={"admin"}
                      disabled={item.role === "admin"}
                      className="bg-[#1C1C32] text-white"
                    >
                      Admin
                    </option>
                  </select>
                </td>
                <td className="px-6 py-4">
                  {" "}
                  {item?.isBlocked === false && (
                    <button
                      onClick={() => {
                        handleDeactive(item._id);
                      }}
                      className="text-white bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg hover:from-blue-500 hover:to-purple-500 focus:outline-none px-2 py-1 w-[100px]"
                    >
                      Deactivate
                    </button>
                  )}
                  {item?.isBlocked === true && (
                    <button
                      onClick={() => {
                        handleActive(item._id);
                      }}
                      className="text-white bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg hover:from-blue-500 hover:to-purple-500 focus:outline-none px-2 py-1 w-[100px]"
                    >
                      Make Active
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
          {/* foot */}
        </table>
      </div>
    </div>
  );
};

export default DeactivatingAccounts;

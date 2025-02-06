import { Outlet } from "react-router-dom";
import DarkMode from "../DarkMode";

const MainLayout = () => {
    return (
        <div>
            <DarkMode/>
            <h2 className="font-lobster">sdfghjgfdsa</h2>
            <Outlet/>
        </div>
    );
};

export default MainLayout;
import { Outlet } from "react-router-dom";
import ClientHeader from "./header";

function ClientLayout() {
    return ( 
        <div className="flex flex-col bg-white overflow-hidden">
            {/* common header */}
            <ClientHeader />
            <main className="flex flex-col w-full">
                <Outlet />
            </main>
        </div>
     );
}

export default ClientLayout;
import { Outlet } from "react-router-dom";

import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";

function MainLayout() {
    return (
        <div className="h-screen overflow-hidden bg-slate-950">

            <div className="flex h-full">

                {/* ================= Sidebar ================= */}

                <Sidebar />

                {/* ================= Main Content ================= */}

                <div className="flex min-w-0 flex-1 flex-col">

                    <Header />

                    <main className="flex-1 overflow-hidden bg-slate-950">

                        <Outlet />

                    </main>

                </div>

            </div>

        </div>
    );
}

export default MainLayout;
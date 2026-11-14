import { Link, useLocation } from "react-router-dom";

import {
    BookOpen,
    MessageSquare,
    Mic,
    Plus,
    Settings,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import SidebarItem from "./SidebarItem";
import SidebarProfile from "./SidebarProfile";

function Sidebar() {
    const location = useLocation();

    return (
        <aside
            className="
                hidden
                w-[190px]
                shrink-0
                flex-col
                border-r
                border-slate-800
                bg-slate-950
                lg:flex
            "
        >
            {/* ================= Logo ================= */}

            <div className="border-b border-slate-800 px-4 py-4">
                <Link
                    to="/"
                    className="
                        text-lg
                        font-bold
                        tracking-[0.22em]
                        text-cyan-400
                    "
                >
                    JARVIS
                </Link>
            </div>

            {/* ================= New Chat ================= */}

            <div className="p-3">
                <Button
                    className="
                        h-10
                        w-full
                        justify-start
                        gap-2
                        rounded-lg
                    "
                >
                    <Plus size={16} />
                    New Chat
                </Button>
            </div>

            {/* ================= Navigation ================= */}

            <nav
                className="
                    flex-1
                    space-y-1
                    px-2
                "
            >
                <SidebarItem
                    title="Chat"
                    icon={MessageSquare}
                    to="/"
                    active={location.pathname === "/"}
                />

                <SidebarItem
                    title="Learning"
                    icon={BookOpen}
                    to="/learning"
                    active={location.pathname === "/learning"}
                />

                <SidebarItem
                    title="Voice"
                    icon={Mic}
                    to="/voice"
                    active={location.pathname === "/voice"}
                />

                <SidebarItem
                    title="Settings"
                    icon={Settings}
                    to="/settings"
                    active={location.pathname === "/settings"}
                />
            </nav>

            {/* ================= Profile ================= */}

            <SidebarProfile />
        </aside>
    );
}

export default Sidebar;
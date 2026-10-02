import { Link } from "react-router-dom";
import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

type SidebarItemProps = {
    title: string;
    icon: LucideIcon;
    to: string;
    active?: boolean;
};

function SidebarItem({
    title,
    icon: Icon,
    to,
    active = false,
}: SidebarItemProps) {
    return (
        <Link
            to={to}
            className={cn(
                "group flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all duration-200",
                active
                    ? "bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20"
                    : "text-slate-400 hover:bg-slate-900 hover:text-cyan-400"
            )}
        >
            <Icon
                size={18}
                className="
                    shrink-0
                    transition-transform
                    duration-200
                    group-hover:scale-105
                "
            />

            <span className="font-medium truncate">
                {title}
            </span>
        </Link>
    );
}

export default SidebarItem;
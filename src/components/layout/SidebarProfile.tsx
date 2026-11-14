import {
    ChevronRight,
    Crown,
    UserCircle2,
} from "lucide-react";

function SidebarProfile() {
    return (
        <div
            className="
                mt-auto
                border-t
                border-slate-800
                p-3
            "
        >
            <button
                className="
                    group
                    flex
                    w-full
                    items-center
                    gap-3
                    rounded-xl
                    bg-slate-900
                    p-3
                    transition-all
                    duration-200
                    hover:bg-slate-800
                "
            >
                {/* Avatar */}

                <div
                    className="
                        flex
                        h-10
                        w-10
                        shrink-0
                        items-center
                        justify-center
                        rounded-full
                        bg-cyan-500
                        text-slate-950
                    "
                >
                    <UserCircle2 size={22} />
                </div>

                {/* User */}

                <div
                    className="
                        min-w-0
                        flex-1
                        text-left
                    "
                >
                    <h3
                        className="
                            truncate
                            text-sm
                            font-semibold
                            text-white
                        "
                    >
                        Trayo
                    </h3>

                    <div
                        className="
                            mt-0.5
                            flex
                            items-center
                            gap-1
                            text-[11px]
                            text-amber-400
                        "
                    >
                        <Crown size={11} />
                        <span className="truncate">
                            Premium
                        </span>
                    </div>
                </div>

                <ChevronRight
                    size={14}
                    className="
                        shrink-0
                        text-slate-500
                        transition-transform
                        duration-200
                        group-hover:translate-x-1
                    "
                />
            </button>
        </div>
    );
}

export default SidebarProfile;
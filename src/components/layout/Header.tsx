import {
    Bot,
    Search
} from "lucide-react";

function Header() {

    return (

        <header
            className="
                flex
                h-14
                items-center
                justify-between
                border-b
                border-slate-800/70
                bg-slate-950
                px-5
            "
        >

            {/* ================= LEFT ================= */}

            <div className="flex items-center gap-3">

                <h1
                    className="
                        text-lg
                        font-semibold
                        tracking-wide
                        text-white
                    "
                >
                    JARVIS
                </h1>

                <div className="flex items-center gap-2">

                    <div className="h-2 w-2 rounded-full bg-emerald-500" />

                    <span className="text-xs text-slate-400">
                        Gemini 2.5 Flash
                    </span>

                </div>

            </div>

            {/* ================= SEARCH ================= */}

            <div
                className="
                    mx-8
                    hidden
                    max-w-md
                    flex-1
                    lg:flex
                "
            >

                <div
                    className="
                        flex
                        w-full
                        items-center
                        gap-3
                        rounded-lg
                        border
                        border-slate-800
                        bg-slate-900/70
                        px-4
                        py-2
                    "
                >

                    <Search
                        size={16}
                        className="text-slate-500"
                    />

                    <input
                        type="text"
                        placeholder="Search..."
                        className="
                            w-full
                            bg-transparent
                            text-sm
                            text-white
                            outline-none
                            placeholder:text-slate-500
                        "
                    />

                </div>

            </div>

            {/* ================= RIGHT ================= */}

            <div className="flex items-center gap-3">

                <div
                    className="
                        rounded-full
                        border
                        border-emerald-500/30
                        bg-emerald-500/10
                        px-3
                        py-1
                        text-xs
                        text-emerald-400
                    "
                >
                    ● Connected
                </div>

                <button
                    className="
                        flex
                        h-9
                        w-9
                        items-center
                        justify-center
                        rounded-lg
                        bg-cyan-500
                        transition
                        hover:bg-cyan-400
                    "
                >

                    <Bot
                        size={18}
                        className="text-slate-950"
                    />

                </button>

            </div>

        </header>

    );

}

export default Header;
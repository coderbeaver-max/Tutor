import {
    Activity,
    Brain,
    Cpu,
    Database,
} from "lucide-react";

function RightPanel() {

    return (

        <aside
            className="
                hidden
                w-80
                flex-col
                border-l
                border-slate-800
                bg-slate-950
                xl:flex
            "
        >

            {/* =========================
                TITLE
            ========================= */}

            <div
                className="
                    border-b
                    border-slate-800
                    p-6
                "
            >

                <h2
                    className="
                        text-lg
                        font-semibold
                        text-white
                    "
                >
                    Assistant
                </h2>

                <p
                    className="
                        mt-1
                        text-sm
                        text-slate-400
                    "
                >
                    Current Session
                </p>

            </div>

            {/* =========================
                CONTENT
            ========================= */}

            <div
                className="
                    flex-1
                    space-y-5
                    overflow-y-auto
                    p-5
                "
            >

                <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">

                    <div className="mb-4 flex items-center gap-3">

                        <Activity
                            size={20}
                            className="text-green-400"
                        />

                        <h3 className="font-medium text-white">

                            Status

                        </h3>

                    </div>

                    <p className="text-sm text-slate-400">

                        Ready

                    </p>

                </div>

                <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">

                    <div className="mb-4 flex items-center gap-3">

                        <Cpu
                            size={20}
                            className="text-cyan-400"
                        />

                        <h3 className="font-medium text-white">

                            Model

                        </h3>

                    </div>

                    <p className="text-sm text-slate-400">

                        Gemini 2.5 Flash

                    </p>

                </div>

                <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">

                    <div className="mb-4 flex items-center gap-3">

                        <Brain
                            size={20}
                            className="text-violet-400"
                        />

                        <h3 className="font-medium text-white">

                            Memory

                        </h3>

                    </div>

                    <p className="text-sm text-slate-400">

                        Enabled

                    </p>

                </div>

                <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">

                    <div className="mb-4 flex items-center gap-3">

                        <Database
                            size={20}
                            className="text-orange-400"
                        />

                        <h3 className="font-medium text-white">

                            Knowledge Base

                        </h3>

                    </div>

                    <p className="text-sm text-slate-400">

                        Connected

                    </p>

                </div>

            </div>

        </aside>

    );

}

export default RightPanel;
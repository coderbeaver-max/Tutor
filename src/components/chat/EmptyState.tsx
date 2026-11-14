import {
    BookOpen,
    Brain,
    Code2,
    FileText,
} from "lucide-react";

import { motion } from "framer-motion";

const suggestions = [
    {
        icon: Brain,
        title: "Explain Transformers",
        description: "Modern AI architecture",
    },
    {
        icon: Code2,
        title: "Generate Python",
        description: "Production-ready code",
    },
    {
        icon: BookOpen,
        title: "Continue Learning",
        description: "Resume your roadmap",
    },
    {
        icon: FileText,
        title: "Summarize Document",
        description: "Extract key insights",
    },
];

function EmptyState() {
    return (
        <div
            className="
                flex
                h-full
                flex-col
                justify-center
                px-12
                pb-32
            "
        >
            <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="mx-auto w-full max-w-5xl"
            >
                <h2
                    className="
                        text-3xl
                        font-semibold
                        text-white
                    "
                >
                    Ask JARVIS anything.
                </h2>

                <p
                    className="
                        mt-2
                        text-base
                        text-slate-400
                    "
                >
                    Coding, AI, debugging, learning, research and much more.
                </p>

                <div
                    className="
                        mt-10
                        grid
                        grid-cols-2
                        gap-4
                    "
                >
                    {suggestions.map((item) => {
                        const Icon = item.icon;

                        return (
                            <button
                                key={item.title}
                                className="
                                    group
                                    rounded-xl
                                    border
                                    border-slate-800
                                    bg-slate-900/50
                                    p-5
                                    text-left
                                    transition-all
                                    duration-200
                                    hover:border-cyan-500/40
                                    hover:bg-slate-900
                                "
                            >
                                <div
                                    className="
                                        mb-4
                                        flex
                                        h-10
                                        w-10
                                        items-center
                                        justify-center
                                        rounded-lg
                                        bg-cyan-500/10
                                    "
                                >
                                    <Icon
                                        size={20}
                                        className="text-cyan-400"
                                    />
                                </div>

                                <h3
                                    className="
                                        text-base
                                        font-semibold
                                        text-white
                                    "
                                >
                                    {item.title}
                                </h3>

                                <p
                                    className="
                                        mt-1
                                        text-sm
                                        text-slate-400
                                    "
                                >
                                    {item.description}
                                </p>
                            </button>
                        );
                    })}
                </div>
            </motion.div>
        </div>
    );
}

export default EmptyState;
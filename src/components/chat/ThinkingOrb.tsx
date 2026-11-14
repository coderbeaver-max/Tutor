import { motion } from "framer-motion";

type ThinkingOrbProps = {
    thinking?: boolean;
};

function ThinkingOrb({
    thinking = false,
}: ThinkingOrbProps) {

    return (

        <div className="relative flex items-center justify-center">

            {/* ===============================
                OUTER GLOW
            =============================== */}

            <motion.div

                animate={{

                    scale: thinking
                        ? [1, 1.08, 1]
                        : [1, 1.04, 1],

                    opacity: [0.25, 0.5, 0.25]

                }}

                transition={{

                    duration: 4,

                    repeat: Infinity,

                    ease: "easeInOut"

                }}

                className="
                    absolute
                    h-72
                    w-72
                    rounded-full
                    bg-cyan-400/20
                    blur-3xl
                "

            />

            {/* ===============================
                ROTATING RING
            =============================== */}

            <motion.div

                animate={{

                    rotate: 360

                }}

                transition={{

                    duration: 18,

                    repeat: Infinity,

                    ease: "linear"

                }}

                className="
                    absolute
                    h-56
                    w-56
                    rounded-full
                    border
                    border-cyan-400/30
                "

            />

            {/* ===============================
                INNER RING
            =============================== */}

            <motion.div

                animate={{

                    rotate: -360

                }}

                transition={{

                    duration: 10,

                    repeat: Infinity,

                    ease: "linear"

                }}

                className="
                    absolute
                    h-44
                    w-44
                    rounded-full
                    border
                    border-cyan-300/40
                "

            />

            {/* ===============================
                CORE
            =============================== */}

            <motion.div

                animate={{

                    scale: thinking
                        ? [1, 1.08, 1]
                        : [1, 1.03, 1]

                }}

                transition={{

                    duration: 2,

                    repeat: Infinity,

                    ease: "easeInOut"

                }}

                className="
                    relative
                    flex
                    h-36
                    w-36
                    items-center
                    justify-center
                    rounded-full
                    bg-gradient-to-br
                    from-cyan-300
                    via-cyan-400
                    to-cyan-600
                    shadow-[0_0_90px_#22d3ee]
                "

            >

                {/* Inner Glass */}

                <div
                    className="
                        h-24
                        w-24
                        rounded-full
                        bg-white/20
                        backdrop-blur-md
                    "
                />

            </motion.div>

        </div>

    );

}

export default ThinkingOrb;
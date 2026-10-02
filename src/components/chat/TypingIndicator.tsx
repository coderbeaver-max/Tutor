import { motion } from "framer-motion";

function Dot({
    delay,
}: {
    delay: number;
}) {

    return (

        <motion.div

            animate={{

                y: [0, -5, 0],

                opacity: [0.4, 1, 0.4]

            }}

            transition={{

                repeat: Infinity,

                duration: 0.8,

                delay

            }}

            className="
                h-2
                w-2
                rounded-full
                bg-cyan-400
            "

        />

    );

}

function TypingIndicator() {

    return (

        <div
            className="
                flex
                gap-2
                rounded-full
                bg-slate-900
                px-5
                py-3
            "
        >

            <Dot delay={0} />

            <Dot delay={0.2} />

            <Dot delay={0.4} />

        </div>

    );

}

export default TypingIndicator;
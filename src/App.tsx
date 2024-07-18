import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "./components/ui/button";
import { SparklesCore } from "./components/ui/sparkles";

const FADE_DOWN_ANIMATION_VARIANTS = {
  hidden: { opacity: 0, y: -10 },
  show: { opacity: 1, y: 0, transition: { type: "spring" } },
};

function App() {
  return (
    <motion.div
      initial="hidden"
      animate="show"
      viewport={{ once: true }}
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: 0.15,
          },
        },
      }}
      className="min-h-screen relative w-full bg-black flex flex-col gap-6 items-center justify-center overflow-hidden rounded-md"
    >
      <div className="w-full absolute inset-0 h-screen">
        <SparklesCore
          id="tsparticlesfullpage"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={100}
          className="w-full h-full"
          particleColor="#FFFFFF"
        />
      </div>
      <motion.h1
        variants={FADE_DOWN_ANIMATION_VARIANTS}
        className="md:text-5xl text-xl lg:text-3xl font-bold text-center text-white relative z-10"
      >
        丛生 · Cluster - AdventureX2024
      </motion.h1>
      <motion.h2
        variants={FADE_DOWN_ANIMATION_VARIANTS}
        className="text-xl text-white z-10"
      >
        创作引发的无限裂变
      </motion.h2>
      <motion.div
        variants={FADE_DOWN_ANIMATION_VARIANTS}
        className="flex justify-center items-center z-10"
      >
        <Link to="/ai">
          <Button variant="link">AI</Button>
        </Link>

        <Link to="/nfts">
          <Button variant="link">NFTS</Button>
        </Link>
      </motion.div>
    </motion.div>
  );
}

export default App;

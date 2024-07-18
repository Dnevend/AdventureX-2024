import { Link } from "react-router-dom";
import { Button } from "./components/ui/button";
import { SparklesCore } from "./components/ui/sparkles";

function App() {
  return (
    <div className="min-h-screen relative w-full bg-black flex flex-col items-center justify-center overflow-hidden rounded-md">
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
      <h1 className="md:text-5xl text-xl lg:text-3xl font-bold text-center text-white relative z-20">
        丛生 · Cluster - AdventureX2024
      </h1>
      <div className="flex justify-center items-center z-10">
        <Link to="/ai">
          <Button variant="link">AI</Button>
        </Link>

        <Link to="/nfts">
          <Button variant="link">NFTS</Button>
        </Link>
      </div>
    </div>
  );
}

export default App;

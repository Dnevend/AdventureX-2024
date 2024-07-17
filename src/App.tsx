import { cn } from "./lib/utils";

function App() {
  return (
    <div className="relative">
      <div className="absolute top-0 z-[-2] h-screen w-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
      <header className={cn("flex justify-between p-6")}>
        <div className="text-white text-xl">AdventureX</div>
      </header>

      <main className="max-w-screen-lg mx-auto my-6 text-white">text</main>

      <section className=" max-w-screen-lg mx-auto">
        <input className="w-full" />
      </section>
    </div>
  );
}

export default App;

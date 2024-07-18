import { cn } from "@/lib/utils";
import { ConnectKitButton } from "connectkit";
import { Link, Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div
      className={cn("dark relative flex flex-col min-h-screen overflow-hidden")}
    >
      <div className="fixed left-0 top-0 -z-10 h-full w-full">
        <div className="absolute top-0 z-[-2] min-h-screen w-full bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]" />
      </div>

      <header
        className={cn(
          "fixed top-0 w-full flex justify-between items-center p-6 px-4 z-10"
        )}
      >
        <Link to="/">
          <div className={cn("text-white text-xl font-bold")}>
            丛生 · Cluster
          </div>
        </Link>

        <ConnectKitButton />
      </header>

      <Outlet />

      <svg
        viewBox="0 0 1024 1024"
        className="fixed left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-x-1/2 [mask-image:radial-gradient(closest-side,white,transparent)]"
        aria-hidden="true"
      >
        <circle
          cx="512"
          cy="512"
          r="512"
          fill="url(#827591b1-ce8c-4110-b064-7cb85a0b1217)"
          fill-opacity="0.7"
        ></circle>
        <defs>
          <radialGradient id="827591b1-ce8c-4110-b064-7cb85a0b1217">
            <stop stop-color="#7775D6"></stop>
            <stop offset="1" stop-color="#E935C1"></stop>
          </radialGradient>
        </defs>
      </svg>
    </div>
  );
};
export default Layout;

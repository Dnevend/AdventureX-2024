import { AI_USER_PROMPT } from "@/const";
import { cn } from "@/lib/utils";
import { Message } from "@/types/type";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const IPFS_GATEWAY = "https://ipfs.io/ipfs/";

const NFT = () => {
  const { hash } = useParams() as { hash: string };
  const [fetching, setFetching] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const init = async () => {
      try {
        setFetching(true);
        const res = await fetch(`${IPFS_GATEWAY}${hash}`);
        console.log("🐞 => init => res:", res);
        if (res.ok) {
          const value = await res.json();
          console.log("🐞 => init => value:", value);
          setMessages(value);
        }
      } finally {
        setFetching(false);
      }
    };
    init();
  }, [hash]);

  return (
    <>
      <div className="fixed top-0 w-full h-36 bg-gradient-to-b from-slate-950 to-transparent" />
      <div className="mt-24 mx-auto max-w-screen-md px-4">
        <Link
          to={`${IPFS_GATEWAY}${hash}`}
          target="_blank"
          className="relative z-10"
        >
          <h1 className="text-white text-xl text-center break-words">{hash}</h1>
        </Link>
        {fetching && (
          <div className="flex space-x-2 my-8 justify-center items-center">
            <span className="sr-only">Loading...</span>
            <div className="h-4 w-4 bg-white rounded-full animate-bounce [animation-delay:-0.3s]"></div>
            <div className="h-4 w-4 bg-white rounded-full animate-bounce [animation-delay:-0.15s]"></div>
            <div className="h-4 w-4 bg-white rounded-full animate-bounce"></div>
          </div>
        )}

        <div className="flex flex-col my-6 gap-2">
          {messages.map((msg) => {
            if (msg.role === "user" && msg.content !== "续写") {
              return (
                <p
                  className={cn(
                    "indent-8 hover:underline hover:decoration-dotted text-white",
                    {
                      "underline decoration-wavy":
                        msg.content !== AI_USER_PROMPT,
                    }
                  )}
                >
                  {msg.content}
                </p>
              );
            }
            if (msg.role === "assistant") {
              return (
                <p className="indent-8 hover:underline hover:decoration-dotted text-white">
                  {msg.content}
                </p>
              );
            }
          })}
        </div>
      </div>
    </>
  );
};
export default NFT;

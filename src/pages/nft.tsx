import { AI_USER_PROMPT } from "@/const";
import { cn } from "@/lib/utils";
import { Message } from "@/types/type";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { IPFS_GATEWAY } from "@/lib/pinata";
import { motion } from "framer-motion";

const FADE_DOWN_ANIMATION_VARIANTS = {
  hidden: { opacity: 0, y: -10 },
  show: { opacity: 1, y: 0, transition: { type: "spring" } },
};

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
        className="mt-24 mx-auto max-w-screen-md px-4"
      >
        <Link
          to={`${IPFS_GATEWAY}${hash}`}
          target="_blank"
          className="relative z-10 text-wrap break-all"
        >
          <motion.h1
            variants={FADE_DOWN_ANIMATION_VARIANTS}
            className="text-white text-xl text-center"
          >
            {hash}
          </motion.h1>
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
                <motion.p
                  variants={FADE_DOWN_ANIMATION_VARIANTS}
                  className={cn(
                    "indent-8 hover:underline hover:decoration-dotted text-white",
                    {
                      "underline decoration-wavy":
                        msg.content !== AI_USER_PROMPT,
                    }
                  )}
                >
                  {msg.content}
                </motion.p>
              );
            }
            if (msg.role === "assistant") {
              return (
                <motion.p
                  variants={FADE_DOWN_ANIMATION_VARIANTS}
                  className="indent-8 hover:underline hover:decoration-dotted text-white"
                >
                  {msg.content}
                </motion.p>
              );
            }
          })}
        </div>
      </motion.div>
    </>
  );
};
export default NFT;

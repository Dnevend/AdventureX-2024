import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "./lib/utils";
import http from "@/lib/http/axios";
import { CONTRACE_ADDRESS, DEFAULT_MODEL } from "./const";
import { ConnectKitButton } from "connectkit";
import { IPFS_GATEWAY, pinJSONToIPFS } from "./lib/pinata";
import { Typewriter } from "./components/Typewriter";
import { motion } from "framer-motion";
import { OperateBar } from "./components/OperateBar";
import { Message, ModelResponse, TurnType } from "./types/type";
import { WriteBar } from "./components/WriteBar";
import { useAccount, useConnect, useWriteContract } from "wagmi";
import ABI from "@/lib/abis/NFTFactory.json";
import { injected } from "wagmi/connectors";

function App() {
  const [turnType, setTurnType] = useState<TurnType>("do");
  const [fetching, setFetching] = useState<boolean>(false);
  const [writing, setWriting] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [messages, setMessages] = useState<Message[]>([]);

  const { connectAsync } = useConnect();
  const { address, isConnected } = useAccount();
  const { writeContractAsync } = useWriteContract();

  const sendMessage = useCallback(async (messages: Message[]) => {
    try {
      setFetching(true);

      const { data } = await http.post<ModelResponse>(
        "/api/paas/v4/chat/completions",
        {
          model: DEFAULT_MODEL,
          messages,
        }
      );

      if (data.choices.length > 0) {
        setMessages([...messages, data.choices[0].message]);
      }
    } finally {
      setFetching(false);
    }
  }, []);

  useEffect(() => {
    sendMessage([
      {
        role: "user",
        content: "你好",
      },
    ]);
  }, [sendMessage]);

  const generateNFT = async () => {
    if (!isConnected) {
      await connectAsync({ connector: injected() });
    }
    const res: { IpfsHash: string } = await pinJSONToIPFS(messages);
    console.log("🐞 => onUploadIPFS => res:", IPFS_GATEWAY + res.IpfsHash);
    const txRes = await writeContractAsync({
      address: CONTRACE_ADDRESS,
      abi: ABI,
      functionName: "createNFT",
      args: [address, res.IpfsHash],
    });
    console.log("🐞 => generateNFT => txRes:", txRes);
  };

  return (
    <div
      className={cn("dark relative flex flex-col min-h-screen overflow-hidden")}
    >
      <div className="fixed left-0 top-0 -z-10 h-full w-full">
        <div className="absolute top-0 z-[-2] min-h-screen w-full bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]" />
      </div>

      <div className="fixed top-0 w-full h-36 bg-gradient-to-b from-slate-950 to-transparent" />

      <header
        className={cn(
          "fixed top-0 w-full flex justify-between items-center p-6 px-4"
        )}
      >
        <div className={cn("text-white text-xl font-bold")}>丛生 · Cluster</div>
        <ConnectKitButton />
      </header>

      <main className="w-full max-w-screen-md mx-auto text-white flex-1 px-4 pt-24">
        <div className="flex flex-col gap-2">
          {messages.map((msg) => {
            if (msg.role === "assistant") {
              return (
                <Typewriter
                  className="indent-8 hover:underline hover:decoration-dotted"
                  text={msg.content}
                />
              );
            }
          })}
        </div>
      </main>

      <section className="w-full max-w-screen-md mx-auto p-6">
        {fetching && (
          <div className="flex space-x-2 justify-center items-center">
            <span className="sr-only">Loading...</span>
            <div className="h-4 w-4 bg-white rounded-full animate-bounce [animation-delay:-0.3s]"></div>
            <div className="h-4 w-4 bg-white rounded-full animate-bounce [animation-delay:-0.15s]"></div>
            <div className="h-4 w-4 bg-white rounded-full animate-bounce"></div>
          </div>
        )}
        {!fetching && !writing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <OperateBar
              retryVisible={messages.length >= 2}
              eraseVisible={messages.length >= 2}
              generateNFTVisible={messages.length >= 2}
              onTakeATurn={() => setWriting(true)}
              onContinue={() => {
                sendMessage([...messages, { role: "user", content: "继续" }]);
              }}
              onRetry={async () => {
                const retryMessages = [...messages];
                retryMessages.splice(-1);
                setMessages(retryMessages);
                await sendMessage(retryMessages);
              }}
              onErase={() => {
                const eraseMessages = [...messages];
                eraseMessages.splice(-2);
                setMessages(eraseMessages);
              }}
              onGenerateNFT={() => generateNFT()}
            />
          </motion.div>
        )}

        {!fetching && writing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <WriteBar
              ref={inputRef}
              turnType={turnType}
              onChooseTurnType={(type) => setTurnType(type)}
              onConfirm={async () => {
                if (!inputRef.current) return;

                if (inputRef.current.value.trim() === "") return;

                await sendMessage([
                  ...messages,
                  { role: "user", content: inputRef.current.value },
                ]);

                inputRef.current.value = "";
              }}
              onExit={() => setWriting(false)}
            />
          </motion.div>
        )}
      </section>

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
}

export default App;

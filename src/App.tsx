import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "./lib/utils";
import http from "@/lib/http/axios";
import { Input } from "./components/ui/input";
import { Send, PenLine, Wand, Delete, X, FileCheck2 } from "lucide-react";
import { Button } from "./components/ui/button";
import { DEFAULT_MODEL } from "./const";
import { ConnectKitButton } from "connectkit";
import { IPFS_GATEWAY, pinJSONToIPFS } from "./lib/pinata";
import { Skeleton } from "./components/ui/skeleton";

interface Message {
  content: string;
  role: "system" | "user" | "assistant";
}

interface ModelResponse {
  choices: { finish_reason: string; index: number; message: Message }[];
  created: number;
  id: string;
  model: string;
}

function App() {
  const [fetching, setFetching] = useState<boolean>(false);
  const [writing, setWriting] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [input, setInput] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);

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
        setMessages((msg) => [...msg, data.choices[0].message]);
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
    const res: { IpfsHash: string } = await pinJSONToIPFS(messages);
    console.log("🐞 => onUploadIPFS => res:", IPFS_GATEWAY + res.IpfsHash);
  };

  return (
    <div className={cn("relative flex flex-col min-h-screen overflow-hidden")}>
      <div className="fixed left-0 top-0 -z-10 h-full w-full">
        <div className="absolute top-0 z-[-2] min-h-screen w-full bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]" />
      </div>

      <div className="fixed top-0 w-full h-36 bg-gradient-to-b from-slate-950 to-transparent" />

      <header
        className={cn(
          "fixed top-0 w-full flex justify-between items-center p-6 px-4"
        )}
      >
        <div className="text-white text-xl font-bold">丛生 · Cluster</div>
        <ConnectKitButton />
      </header>

      <main className="w-full max-w-screen-md mx-auto text-white flex-1 px-4 pt-24">
        <div className="flex flex-col gap-2">
          {messages.map((msg) => {
            if (msg.role === "assistant") {
              return (
                <p className="indent-8 hover:underline hover:decoration-dotted">
                  {msg.content}
                </p>
              );
            }
          })}

          {fetching && (
            <div className="flex flex-col gap-2">
              <Skeleton className="h-4 w-[92%] self-end" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-[92%]" />
            </div>
          )}
        </div>
      </main>

      <section className="w-full max-w-screen-md mx-auto p-4">
        {!writing && (
          <div className="flex justify-between">
            <div className="flex space-x-2">
              <Button onClick={() => setWriting(true)}>
                <PenLine className="w-4 h-4 mr-2" />
                Take a turn
              </Button>
              {messages.length > 0 &&
                messages[messages.length]?.role === "assistant" && (
                  <Button
                    onClick={() => {
                      // TODO:
                    }}
                  >
                    <Wand className="w-4 h-4 mr-2" />
                    Retry
                  </Button>
                )}
              {messages.length > 0 &&
                messages[messages.length]?.role === "assistant" && (
                  <Button
                    onClick={() => {
                      // setMessages(messages.)
                    }}
                  >
                    <Delete className="w-4 h-4 mr-2" />
                    Erase
                  </Button>
                )}
            </div>

            <Button onClick={() => generateNFT()}>
              Done
              <FileCheck2 />
            </Button>
          </div>
        )}

        {writing && (
          <div className="rounded-lg border bg-white bg-opacity-10 border-white p-2 mt-2">
            <div className="flex space-x-2">
              <Button size="icon" onClick={() => setWriting(false)}>
                <X />
              </Button>
              <Button>Do</Button>
              <Button>Say</Button>
              <Button>Story</Button>
              <Button>See</Button>
            </div>

            <div className="flex space-x-2 mt-2">
              <Input
                ref={inputRef}
                placeholder="You say what?"
                onChange={(e) => setInput(e.target.value)}
              />

              <Button size="icon">
                <Send
                  onClick={async () => {
                    await sendMessage([
                      ...messages,
                      { role: "user", content: input },
                    ]);
                    setInput("");
                    if (inputRef.current) {
                      inputRef.current.value = "";
                    }
                  }}
                />
              </Button>
            </div>
          </div>
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

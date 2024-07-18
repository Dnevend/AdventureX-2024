import { useEffect, useState } from "react";
import { cn } from "./lib/utils";
import http from "@/lib/http/axios";
import { Input } from "./components/ui/input";
import { Send, PenLine, Wand, Delete, X } from "lucide-react";
import { Button } from "./components/ui/button";
import { DEFAULT_MODEL } from "./const";
import { ConnectKitButton } from "connectkit";

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
  const [writing, setWriting] = useState<boolean>(false);
  const [input, setInput] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const init = async () => {
      const { data } = await http.post<ModelResponse>(
        "/api/paas/v4/chat/completions",
        {
          model: DEFAULT_MODEL,
          messages: [
            {
              role: "user",
              content: "你好",
            },
          ],
        }
      );

      console.log("🐞 => init => data:", data);

      if (data.choices.length > 0) {
        setMessages((msg) => [...msg, data.choices[0].message]);
      }
    };
    init();
  }, []);

  const sendMessage = async () => {
    const { data } = await http.post<ModelResponse>(
      "/api/paas/v4/chat/completions",
      {
        model: DEFAULT_MODEL,
        messages: [...messages, { role: "user", content: input }],
      }
    );

    console.log("🐞 => sendMessage => data:", data);

    if (data.choices.length > 0) {
      setMessages((msg) => [...msg, data.choices[0].message]);
    }
  };

  return (
    <div className="relative flex flex-col min-h-screen">
      <div className="absolute top-0 z-[-2] h-screen w-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>

      <header className={cn("flex justify-between p-6 px-10")}>
        <div className="text-white text-xl font-bold">丛生 · Cluster</div>
        <ConnectKitButton />
      </header>

      <main className="w-full max-w-screen-md mx-auto my-6 text-white flex-1 px-4">
        {messages.map((msg) => {
          if (msg.role === "assistant") {
            return <p>{msg.content}</p>;
          }
        })}
      </main>

      <section className="w-full max-w-screen-md mx-auto py-4 px-4">
        {!writing && (
          <div className="flex space-x-2">
            <Button onClick={() => setWriting(true)}>
              <PenLine className="w-4 h-4 mr-2" />
              Take a turn
            </Button>
            {messages[messages.length]?.role === "assistant" && (
              <Button
                onClick={() => {
                  // TODO:
                }}
              >
                <Wand className="w-4 h-4 mr-2" />
                Retry
              </Button>
            )}
            <Button>
              <Delete className="w-4 h-4 mr-2" />
              Erase
            </Button>
          </div>
        )}

        {writing && (
          <div className="rounded-lg border border-white p-2 mt-2">
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
                placeholder="You say what?"
                onChange={(e) => setInput(e.target.value)}
              />

              <Button size="icon">
                <Send onClick={() => sendMessage()} />
              </Button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

export default App;

import { TurnType } from "@/types/type";
import { Button } from "./ui/button";
import { Send, X } from "lucide-react";
import { Input } from "./ui/input";
import { forwardRef } from "react";

const TurnPlaceholder: Record<TurnType, string> = {
  do: "你做了什么?",
  say: "你说了什么?",
  story: "接下来发生了什么?",
  see: "你看见了什么?",
};

export const WriteBar = forwardRef<
  HTMLInputElement,
  {
    turnType: TurnType;
    onConfirm: () => void;
    onExit: () => void;
    onChooseTurnType: (type: TurnType) => void;
  }
>(({ turnType, onConfirm, onExit, onChooseTurnType }, ref) => {
  return (
    <div className="rounded-lg border bg-white bg-opacity-10 border-white p-2 mt-2">
      <div className="flex space-x-2">
        <Button size="sm" className="rounded-full" onClick={() => onExit()}>
          <X />
        </Button>
        <Button size="sm" onClick={() => onChooseTurnType("do")}>
          发生
        </Button>
        <Button size="sm" onClick={() => onChooseTurnType("say")}>
          对话
        </Button>
        <Button size="sm" onClick={() => onChooseTurnType("see")}>
          看见
        </Button>
        <Button size="sm" onClick={() => onChooseTurnType("story")}>
          故事
        </Button>
      </div>

      <div className="flex items-center space-x-2 mt-2">
        <Input
          className="text-white"
          ref={ref}
          placeholder={TurnPlaceholder[turnType]}
        />

        <Button size="sm">
          <Send onClick={() => onConfirm()} />
        </Button>
      </div>
    </div>
  );
});

import { TurnType } from "@/types/type";
import { Button } from "./ui/button";
import { Send, X } from "lucide-react";
import { Input } from "./ui/input";
import { forwardRef } from "react";

const TurnPlaceholder: Record<TurnType, string> = {
  do: "What do you do?",
  say: "What do you say?",
  story: "What happens next?",
  see: "What do you see?",
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
          Do
        </Button>
        <Button size="sm" onClick={() => onChooseTurnType("say")}>
          Say
        </Button>
        <Button size="sm" onClick={() => onChooseTurnType("story")}>
          Story
        </Button>
        <Button size="sm" onClick={() => onChooseTurnType("see")}>
          See
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

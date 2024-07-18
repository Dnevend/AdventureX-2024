import { Delete, FileCheck2, PenLine, Repeat, Wand } from "lucide-react";
import { Button } from "./ui/button";

export const OperateBar = ({
  onTakeATurn,
  onContinue,
  onRetry,
  onErase,
  onGenerateNFT,
  retryVisible,
  eraseVisible,
  generateNFTVisible,
}: {
  retryVisible: boolean;
  eraseVisible: boolean;
  generateNFTVisible: boolean;
  onTakeATurn: () => void;
  onContinue: () => void;
  onRetry: () => void;
  onErase: () => void;
  onGenerateNFT: () => void;
}) => {
  return (
    <div className="flex flex-wrap justify-center gap-2">
      <Button size="sm" onClick={() => onTakeATurn()}>
        <PenLine className="w-4 h-4 mr-2" />
        Take a turn
      </Button>

      <Button size="sm" onClick={() => onContinue()}>
        <Wand className="w-4 h-4 mr-2" />
        Continue
      </Button>

      {retryVisible && (
        <Button size="sm" onClick={() => onRetry()}>
          <Repeat className="w-4 h-4 mr-2" />
          Retry
        </Button>
      )}
      {eraseVisible && (
        <Button size="sm" onClick={() => onErase()}>
          <Delete className="w-4 h-4 mr-2" />
          Erase
        </Button>
      )}
      {generateNFTVisible && (
        <Button size="sm" variant="secondary" onClick={() => onGenerateNFT()}>
          <FileCheck2 />
        </Button>
      )}
    </div>
  );
};

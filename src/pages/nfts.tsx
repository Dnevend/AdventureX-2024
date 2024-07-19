import { CONTRACE_ADDRESS } from "@/const";
import { useAccount, useConnect, useReadContract } from "wagmi";
import ABI from "@/lib/abis/NFTFactory.json";
import { Button } from "@/components/ui/button";
import { injected } from "wagmi/connectors";
import { Link } from "react-router-dom";
import { BookDashed } from "lucide-react";

const NFTCard = ({ id }: { id: bigint }) => {
  const { data } = useReadContract({
    address: CONTRACE_ADDRESS,
    abi: ABI,
    functionName: "getTokenURI",
    args: [id],
  });

  const ipfsAddress: string = data as string;
  console.log("🐞 => NFTCard => ipfsAddress:", ipfsAddress);

  return (
    <div className="rounded-lg border border-white p-2 max-w-64 text-wrap bg-slate-500 backdrop-blur bg-opacity-15">
      <h2 className="text-white text-wrap break-words">
        {ipfsAddress ? ipfsAddress : "Fetching..."}
      </h2>
      <div className="flex justify-between items-center mt-4">
        <span className="text-white font-bold">Cluster</span>
        <Link to={`/nft/${ipfsAddress}`}>
          <Button size="sm" variant="secondary">
            View
          </Button>
        </Link>
      </div>
    </div>
  );
};

const NFTs = () => {
  const { connect } = useConnect();
  const { address, isConnected } = useAccount();
  const { data: ownerTokens, isFetching } = useReadContract({
    address: CONTRACE_ADDRESS,
    abi: ABI,
    functionName: "getTokenIdsByOwner",
    args: [address],
  });

  const tokenIDs = (ownerTokens ?? []) as bigint[];

  return (
    <div className="py-8 mx-auto min-h-screen max-w-screen-md flex flex-col justify-center">
      {isFetching && (
        <div className="flex space-x-2 my-8 justify-center items-center">
          <span className="sr-only">Loading...</span>
          <div className="h-4 w-4 bg-white rounded-full animate-bounce [animation-delay:-0.3s]"></div>
          <div className="h-4 w-4 bg-white rounded-full animate-bounce [animation-delay:-0.15s]"></div>
          <div className="h-4 w-4 bg-white rounded-full animate-bounce"></div>
        </div>
      )}

      <div className="flex flex-wrap justify-center gap-2">
        {tokenIDs.map((it) => (
          <NFTCard key={it} id={it} />
        ))}
      </div>

      {!isFetching && tokenIDs.length === 0 && (
        <div className="flex flex-col gap-2 items-center my-2">
          <BookDashed className="text-white h-8 w-8" />
          <p className="text-white text-xl">You has no NFTs</p>
        </div>
      )}

      {!isConnected && (
        <div>
          <Button
            onClick={() => {
              connect({ connector: injected() });
            }}
          >
            Please Connect Wallet First
          </Button>
        </div>
      )}
    </div>
  );
};
export default NFTs;

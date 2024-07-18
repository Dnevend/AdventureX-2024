import { http, createConfig } from 'wagmi'
import { mainnet, sepolia } from 'wagmi/chains'
import { getDefaultConfig } from 'connectkit'

export const config = createConfig(getDefaultConfig({
    chains: [mainnet, sepolia],
    transports: {
        [mainnet.id]: http(),
        [sepolia.id]: http(),
    },

    // Required API Keys
    walletConnectProjectId: 'YOUR_WALLET_CONNECT_PROJECT_ID',

    // Required App Info
    appName: "Cluster",

    // Optional App Info
    appDescription: "Cluster App Description",
    appUrl: "https://adventure-cluster.pages.dev/",
}))
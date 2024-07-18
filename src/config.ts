import { http, createConfig } from 'wagmi'
import { sepolia } from 'wagmi/chains'
import { getDefaultConfig } from 'connectkit'

export const config = createConfig(getDefaultConfig({
    chains: [sepolia],

    transports: {
        [sepolia.id]: http(),
    },

    // Required API Keys
    walletConnectProjectId: '6f730cb455c9bf56dcb5be6d03109a36',

    // Required App Info
    appName: "Cluster",

    // Optional App Info
    appDescription: "Cluster App Description",
    appUrl: "https://adventure-cluster.pages.dev/",
}))
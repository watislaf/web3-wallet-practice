import { cookieStorage, createConfig, createStorage, http } from "wagmi";
import { arbitrum, base, mainnet, optimism } from "wagmi/chains";
import { metaMask } from "wagmi/connectors";

declare module "wagmi" {
  interface Register {
    config: typeof wagmi;
  }
}

export const wagmi = createConfig({
  chains: [mainnet, base, arbitrum, optimism],
  ssr: true,
  connectors: [metaMask()],
  storage: createStorage({
    storage: cookieStorage,
  }),
  transports: {
    [mainnet.id]: http(),
    [base.id]: http(),
    [arbitrum.id]: http(),
    [optimism.id]: http(),
  },
});

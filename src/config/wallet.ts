import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { sepolia } from 'wagmi/chains';
import { env } from './env';

export const config = getDefaultConfig({
  appName: 'CapSecure - Private Equity Platform',
  projectId: env.WALLET_CONNECT_PROJECT_ID,
  chains: [sepolia],
  ssr: false, // If your dApp uses server side rendering (SSR)
});

export const chains = [sepolia];

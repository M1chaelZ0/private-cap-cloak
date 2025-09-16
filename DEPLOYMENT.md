# CapSecure - Vercel Deployment Guide

This guide provides step-by-step instructions for deploying CapSecure to Vercel.

## Prerequisites

- GitHub account
- Vercel account
- Node.js 18+ installed locally
- Sepolia ETH for contract deployment

## Step 1: Prepare Your Repository

1. **Ensure all changes are committed and pushed to GitHub:**
   ```bash
   git add .
   git commit -m "Prepare for deployment"
   git push origin main
   ```

2. **Verify your repository is clean:**
   ```bash
   git status
   ```

## Step 2: Connect to Vercel

1. **Visit [Vercel Dashboard](https://vercel.com/dashboard)**
2. **Click "New Project"**
3. **Import your GitHub repository:**
   - Search for `M1chaelZ0/private-cap-cloak`
   - Click "Import"

## Step 3: Configure Project Settings

### 3.1 Project Configuration

- **Project Name**: `capsecure-private-equity`
- **Framework Preset**: `Vite`
- **Root Directory**: `./` (default)
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

### 3.2 Environment Variables

Add the following environment variables in Vercel dashboard:

```env
# Chain Configuration
VITE_CHAIN_ID=11155111
VITE_RPC_URL=https://sepolia.infura.io/v3/b18fb7e6ca7045ac83c41157ab93f990

# Wallet Connect Configuration
VITE_WALLET_CONNECT_PROJECT_ID=2ec9743d0d0cd7fb94dee1a7e6d33475

# Infura Configuration
VITE_INFURA_API_KEY=b18fb7e6ca7045ac83c41157ab93f990
```

**To add environment variables:**
1. Go to Project Settings → Environment Variables
2. Add each variable with the exact values above
3. Make sure to add them for all environments (Production, Preview, Development)

## Step 4: Deploy Smart Contract (Optional)

If you want to deploy the smart contract:

### 4.1 Install Hardhat Dependencies

```bash
npm install --save-dev hardhat @nomicfoundation/hardhat-toolbox
```

### 4.2 Configure Hardhat

Update `hardhat.config.js` with your private key:

```javascript
require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

module.exports = {
  solidity: {
    version: "0.8.24",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    sepolia: {
      url: process.env.RPC_URL || "https://sepolia.infura.io/v3/b18fb7e6ca7045ac83c41157ab93f990",
      accounts: [process.env.PRIVATE_KEY], // Add your private key here
      chainId: 11155111,
    },
  },
};
```

### 4.3 Deploy Contract

```bash
npx hardhat run scripts/deploy.js --network sepolia
```

### 4.4 Update Contract Address

After deployment, update the contract address in `src/config/contract.ts`:

```typescript
const CONTRACT_ADDRESS = 'YOUR_DEPLOYED_CONTRACT_ADDRESS';
```

## Step 5: Deploy to Vercel

1. **Click "Deploy" in Vercel dashboard**
2. **Wait for deployment to complete** (usually 2-3 minutes)
3. **Check deployment logs** for any errors

## Step 6: Configure Custom Domain (Optional)

1. **Go to Project Settings → Domains**
2. **Add your custom domain**
3. **Configure DNS records** as instructed by Vercel
4. **Wait for SSL certificate** to be issued

## Step 7: Verify Deployment

1. **Visit your deployed URL**
2. **Test wallet connection**
3. **Verify all features work correctly**
4. **Check console for any errors**

## Step 8: Set Up Automatic Deployments

1. **Go to Project Settings → Git**
2. **Enable automatic deployments** for:
   - Production branch (main)
   - Preview deployments for pull requests
3. **Configure build settings** if needed

## Troubleshooting

### Common Issues

1. **Build Failures:**
   - Check environment variables are set correctly
   - Verify all dependencies are in package.json
   - Check build logs for specific errors

2. **Wallet Connection Issues:**
   - Verify WalletConnect Project ID is correct
   - Check RPC URL is accessible
   - Ensure chain ID matches Sepolia (11155111)

3. **Contract Interaction Issues:**
   - Verify contract address is correct
   - Check contract is deployed on Sepolia
   - Ensure user has Sepolia ETH for gas

### Environment Variables Checklist

- [ ] `VITE_CHAIN_ID=11155111`
- [ ] `VITE_RPC_URL` (Infura or other RPC provider)
- [ ] `VITE_WALLET_CONNECT_PROJECT_ID`
- [ ] `VITE_INFURA_API_KEY` (if using Infura)

### Build Configuration Checklist

- [ ] Framework: Vite
- [ ] Build Command: `npm run build`
- [ ] Output Directory: `dist`
- [ ] Install Command: `npm install`
- [ ] Node.js Version: 18.x

## Post-Deployment

1. **Test all functionality**
2. **Monitor performance**
3. **Set up analytics** (optional)
4. **Configure monitoring** (optional)
5. **Update documentation** with live URL

## Security Considerations

1. **Never commit private keys** to repository
2. **Use environment variables** for sensitive data
3. **Enable Vercel security features**
4. **Regular security audits**
5. **Monitor for vulnerabilities**

## Performance Optimization

1. **Enable Vercel Analytics**
2. **Configure caching headers**
3. **Optimize images and assets**
4. **Use CDN for static assets**
5. **Monitor Core Web Vitals**

## Support

If you encounter issues:

1. **Check Vercel deployment logs**
2. **Review GitHub Actions** (if enabled)
3. **Test locally** with same environment variables
4. **Contact support** with specific error messages

---

**Deployment URL**: https://capsecure-private-equity.vercel.app
**GitHub Repository**: https://github.com/M1chaelZ0/private-cap-cloak
**Vercel Dashboard**: https://vercel.com/dashboard

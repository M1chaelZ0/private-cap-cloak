# 🚀 CapSecure 智能合约部署指南

本指南将帮助您部署CapSecure智能合约到Sepolia测试网。

## 📋 前置要求

1. **Node.js** (版本 18 或更高)
2. **npm** 或 **yarn**
3. **Sepolia测试网ETH** (用于支付gas费用)
4. **Infura API密钥** (用于连接Sepolia网络)
5. **Etherscan API密钥** (用于验证合约)

## 🔧 环境配置

### 1. 安装依赖

```bash
npm install
```

### 2. 创建环境变量文件

在项目根目录创建 `.env` 文件：

```env
# Frontend Environment Variables
VITE_CHAIN_ID=11155111
VITE_RPC_URL=https://sepolia.infura.io/v3/YOUR_INFURA_API_KEY
VITE_WALLET_CONNECT_PROJECT_ID=2ec9743d0d0cd7fb94dee1a7e6d33475
VITE_INFURA_API_KEY=YOUR_INFURA_API_KEY

# Contract Deployment Variables
RPC_URL=https://sepolia.infura.io/v3/YOUR_INFURA_API_KEY
PRIVATE_KEY=YOUR_PRIVATE_KEY_HERE
ETHERSCAN_API_KEY=YOUR_ETHERSCAN_API_KEY

# Contract Configuration
VERIFIER_ADDRESS=0x742d35Cc6448C10b4c6abfC9A6E5d89f9c4a
COMPANY_WALLET=0x742d35Cc6448C10b4c6abfC9A6E5d89f9c4a
COMPANY_NAME=CapSecure Startup
```

### 3. 获取测试网ETH

访问以下水龙头获取Sepolia测试网ETH：
- [Sepolia Faucet](https://sepoliafaucet.com/)
- [Alchemy Faucet](https://sepoliafaucet.com/)

## 🏗️ 部署步骤

### 1. 编译合约

```bash
npm run compile
```

### 2. 部署到Sepolia测试网

```bash
npm run deploy:contract
```

### 3. 验证合约 (可选)

```bash
npx hardhat verify --network sepolia <CONTRACT_ADDRESS> <VERIFIER_ADDRESS> <COMPANY_WALLET> <COMPANY_NAME>
```

## 📝 部署后配置

### 1. 更新合约地址

部署成功后，将返回的合约地址更新到前端配置中：

```typescript
// src/config/contract.ts
export const CONTRACT_ADDRESS = "0xYourDeployedContractAddressHere";
```

### 2. 重新构建前端

```bash
npm run build:vercel
```

### 3. 部署到Vercel

```bash
npm run deploy
```

## 🔍 验证部署

### 1. 检查合约状态

在Etherscan上查看您的合约：
- 访问 [Sepolia Etherscan](https://sepolia.etherscan.io/)
- 搜索您的合约地址
- 验证合约代码和交易记录

### 2. 测试前端功能

1. 访问部署的Vercel URL
2. 连接钱包
3. 测试添加投资者功能
4. 验证FHE加密功能

## 🛠️ 故障排除

### 常见问题

1. **Gas费用不足**
   - 确保钱包中有足够的Sepolia ETH
   - 检查gas价格设置

2. **网络连接问题**
   - 验证RPC_URL配置
   - 检查Infura API密钥

3. **合约验证失败**
   - 确保构造函数参数正确
   - 检查Solidity版本匹配

### 调试命令

```bash
# 查看Hardhat网络状态
npx hardhat console --network sepolia

# 运行测试
npm run test

# 启动本地节点
npm run node
```

## 📚 相关资源

- [Hardhat文档](https://hardhat.org/docs)
- [FHEVM文档](https://docs.fhevm.org/)
- [Sepolia测试网](https://sepolia.dev/)
- [Etherscan API](https://docs.etherscan.io/)

## 🔐 安全注意事项

1. **永远不要**将私钥提交到版本控制
2. 使用环境变量管理敏感信息
3. 在测试网充分测试后再部署到主网
4. 定期更新依赖包

---

**部署完成后，您的CapSecure平台就可以在Sepolia测试网上运行了！** 🎉

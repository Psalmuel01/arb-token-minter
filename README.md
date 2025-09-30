# Minting UI with Wagmi + Next.js

This project is a simple UI for minting tokens using [wagmi](https://wagmi.sh/) in a **Next.js App Router** environment.  
It supports minting to:
- Yourself
- A single address
- Multiple addresses (via list)

## Tech Stack
- [Next.js 14+](https://nextjs.org/) (App Router)
- [wagmi](https://wagmi.sh/) (React Hooks for Ethereum)
- [Viem](https://viem.sh/) (Ethereum TypeScript library)
- [Arbitrum Sepolia Testnet](https://docs.arbitrum.io/)

---

## Getting Started

### 1. Clone the Repo
```bash
git clone https://github.com/your-username/minting-ui.git
cd minting-ui
```

### 2. Install Dependencies

```bash
pnpm install
# or
npm install
# or
yarn install
```

### 3. Running the App

```bash
pnpm dev
# or
npm run dev
# or
yarn dev
```

App will be available at [http://localhost:3000](http://localhost:3000).

---

## Features

* ✅ Mint to your connected wallet
* ✅ Mint to a single custom address
* ✅ Mint to multiple addresses by passing a list
* ✅ Runs on **Arbitrum Sepolia** by default
* ✅ Safe wagmi config for Next.js App Router

---

## License

MIT

import { SoulboundMinter } from "@/components/soulbound-minter"
import { sbtABI } from "@/constants/abi"
import { SBT_CONTRACT } from "@/constants/contracts"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <SoulboundMinter abi={sbtABI} contractAddress={SBT_CONTRACT} />
    </div>
  )
}

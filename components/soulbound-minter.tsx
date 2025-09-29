"use client"

import { useState } from "react"
import { Navbar } from "./navbar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"
import { Badge } from "./ui/badge"
import { Wallet, Users, Send, Loader2, CheckCircle, XCircle } from "lucide-react"

type TransactionStatus = "idle" | "pending" | "success" | "error"

interface MintStatus {
  type: "self" | "single" | "batch"
  status: TransactionStatus
  txHash?: string
  error?: string
}

export function SoulboundMinter() {
  const [singleAddress, setSingleAddress] = useState("")
  const [batchAddresses, setBatchAddresses] = useState("")
  const [mintStatus, setMintStatus] = useState<MintStatus>({ type: "self", status: "idle" })

  // Mock contract interaction - replace with actual ethers.js or wagmi implementation
  const mockMint = async (type: "self" | "single" | "batch", addresses?: string[]) => {
    setMintStatus({ type, status: "pending" })

    // Simulate transaction
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Mock success/error (90% success rate)
    const success = Math.random() > 0.1

    if (success) {
      setMintStatus({
        type,
        status: "success",
        txHash: "0x" + Math.random().toString(16).substr(2, 64),
      })
    } else {
      setMintStatus({
        type,
        status: "error",
        error: "Transaction failed. Please try again.",
      })
    }
  }

  const handleSelfMint = () => {
    mockMint("self")
  }

  const handleSingleMint = () => {
    if (!singleAddress.trim()) return
    mockMint("single", [singleAddress])
  }

  const handleBatchMint = () => {
    const addresses = batchAddresses
      .split(/[,\n]/)
      .map((addr) => addr.trim())
      .filter((addr) => addr.length > 0)

    if (addresses.length === 0) return
    mockMint("batch", addresses)
  }

  const parseBatchAddresses = () => {
    return batchAddresses
      .split(/[,\n]/)
      .map((addr) => addr.trim())
      .filter((addr) => addr.length > 0)
  }

  const getStatusIcon = (status: TransactionStatus) => {
    switch (status) {
      case "pending":
        return <Loader2 className="h-4 w-4 animate-spin" />
      case "success":
        return <CheckCircle className="h-4 w-4 text-accent" />
      case "error":
        return <XCircle className="h-4 w-4 text-destructive" />
      default:
        return null
    }
  }

  const getStatusBadge = (status: TransactionStatus) => {
    switch (status) {
      case "pending":
        return <Badge variant="secondary">Pending</Badge>
      case "success":
        return <Badge className="bg-accent text-accent-foreground">Success</Badge>
      case "error":
        return <Badge variant="destructive">Error</Badge>
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        <div className="mx-auto max-w-2xl space-y-8">
          <div className="text-center space-y-5">
            <h2 className="text-3xl font-bold text-balance">Mint Soulbound Tokens</h2>
            <p className="text-muted-foreground text-pretty">
              Create non-transferable tokens that represent identity, achievements, or membership. Choose from three
              minting options below.
            </p>
          </div>

          <div className="space-y-6">
            {/* Option A: Mint to Self */}
            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Wallet className="h-5 w-5 text-primary" />
                  Mint to My Wallet
                </CardTitle>
                <CardDescription>Mint a Soulbound Token directly to your connected wallet address.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                <Button
                  onClick={handleSelfMint}
                  disabled={mintStatus.status === "pending"}
                  className="w-full bg-primary hover:bg-primary/90"
                >
                  {mintStatus.type === "self" && mintStatus.status === "pending" ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Minting...
                    </>
                  ) : (
                    <>
                      <Wallet className="mr-2 h-4 w-4" />
                      Mint to Self
                    </>
                  )}
                </Button>

                {mintStatus.type === "self" && mintStatus.status !== "idle" && (
                  <div className="flex items-center justify-between p-3 rounded-lg bg-muted">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(mintStatus.status)}
                      <span className="text-sm">
                        {mintStatus.status === "pending" && "Transaction pending..."}
                        {mintStatus.status === "success" && "Token minted successfully!"}
                        {mintStatus.status === "error" && mintStatus.error}
                      </span>
                    </div>
                    {getStatusBadge(mintStatus.status)}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Option B: Mint to Single Address */}
            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Send className="h-5 w-5 text-primary" />
                  Mint to Address
                </CardTitle>
                <CardDescription>Mint a Soulbound Token to a specific wallet address.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                <Input
                  placeholder="0x742d35Cc6634C0532925a3b8D4C9db96590b5b8c"
                  value={singleAddress}
                  onChange={(e) => setSingleAddress(e.target.value)}
                  className="font-mono text-sm bg-input border-border"
                />
                <Button
                  onClick={handleSingleMint}
                  disabled={!singleAddress.trim() || mintStatus.status === "pending"}
                  className="w-full bg-primary hover:bg-primary/90"
                >
                  {mintStatus.type === "single" && mintStatus.status === "pending" ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Minting...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Mint to Address
                    </>
                  )}
                </Button>

                {mintStatus.type === "single" && mintStatus.status !== "idle" && (
                  <div className="flex items-center justify-between p-3 rounded-lg bg-muted">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(mintStatus.status)}
                      <span className="text-sm">
                        {mintStatus.status === "pending" && "Transaction pending..."}
                        {mintStatus.status === "success" && "Token minted successfully!"}
                        {mintStatus.status === "error" && mintStatus.error}
                      </span>
                    </div>
                    {getStatusBadge(mintStatus.status)}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Option C: Batch Mint */}
            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  Batch Mint
                </CardTitle>
                <CardDescription>
                  Mint Soulbound Tokens to multiple addresses at once. Separate addresses with commas or new lines.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                <Textarea
                  placeholder={`0x742d35Cc6634C0532925a3b8D4C9db96590b5b8c,
0x8ba1f109551bD432803012645Hac136c5c8b8b8c,
0x1234567890123456789012345678901234567890`}
                  value={batchAddresses}
                  onChange={(e) => setBatchAddresses(e.target.value)}
                  className="min-h-[120px] font-mono text-sm bg-input border-border resize-none"
                />

                {batchAddresses.trim() && (
                  <div className="text-sm text-muted-foreground">
                    {parseBatchAddresses().length} address(es) detected
                  </div>
                )}

                <Button
                  onClick={handleBatchMint}
                  disabled={parseBatchAddresses().length === 0 || mintStatus.status === "pending"}
                  className="w-full bg-primary hover:bg-primary/90"
                >
                  {mintStatus.type === "batch" && mintStatus.status === "pending" ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Batch Minting...
                    </>
                  ) : (
                    <>
                      <Users className="mr-2 h-4 w-4" />
                      Batch Mint ({parseBatchAddresses().length})
                    </>
                  )}
                </Button>

                {mintStatus.type === "batch" && mintStatus.status !== "idle" && (
                  <div className="flex items-center justify-between p-3 rounded-lg bg-muted">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(mintStatus.status)}
                      <span className="text-sm">
                        {mintStatus.status === "pending" && "Batch transaction pending..."}
                        {mintStatus.status === "success" &&
                          `${parseBatchAddresses().length} tokens minted successfully!`}
                        {mintStatus.status === "error" && mintStatus.error}
                      </span>
                    </div>
                    {getStatusBadge(mintStatus.status)}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Transaction Hash Display */}
          {mintStatus.txHash && mintStatus.status === "success" && (
            <Card className="border-accent/20 bg-accent/5">
              <CardContent className="pt-6">
                <div className="space-y-2">
                  <div className="text-sm font-medium text-accent">Transaction Hash</div>
                  <div className="font-mono text-xs text-muted-foreground break-all">{mintStatus.txHash}</div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  )
}

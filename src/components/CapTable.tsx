import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Eye, EyeOff, Building2, Wallet, Plus, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useCapSecureContract } from "@/hooks/useContract";
import { useAccount } from 'wagmi';

interface Shareholder {
  id: string;
  name: string;
  percentage: number;
  shares: number;
  type: "founder" | "investor" | "employee";
  masked: boolean;
  address?: string;
  isVerified?: boolean;
}

const mockData: Shareholder[] = [
  { id: "1", name: "Founder Alpha", percentage: 35.5, shares: 355000, type: "founder", masked: false },
  { id: "2", name: "Anonymous Investor", percentage: 25.0, shares: 250000, type: "investor", masked: true },
  { id: "3", name: "Employee Pool", percentage: 15.0, shares: 150000, type: "employee", masked: false },
  { id: "4", name: "Strategic Investor", percentage: 12.5, shares: 125000, type: "investor", masked: true },
  { id: "5", name: "Angel Investor", percentage: 8.0, shares: 80000, type: "investor", masked: true },
  { id: "6", name: "Advisor Pool", percentage: 4.0, shares: 40000, type: "employee", masked: false },
];

export function CapTable() {
  const [showMasked, setShowMasked] = useState(false);
  const [showAddInvestor, setShowAddInvestor] = useState(false);
  const { address, isConnected } = useAccount();
  const { capTableInfo, addInvestor, isPending } = useCapSecureContract();

  const totalShares = mockData.reduce((sum, holder) => sum + holder.shares, 0);

  const getTypeColor = (type: string) => {
    switch (type) {
      case "founder": return "bg-primary";
      case "investor": return "bg-accent";
      case "employee": return "bg-secondary";
      default: return "bg-muted";
    }
  };

  const getTypeBadge = (type: string) => {
    switch (type) {
      case "founder": return "Founder";
      case "investor": return "Investor";
      case "employee": return "Team";
      default: return "Other";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Cap Table Overview
          </h2>
          <p className="text-muted-foreground mt-1">
            Total Shares: {totalShares.toLocaleString()}
            {capTableInfo && (
              <span className="ml-2 text-sm">
                • Company: {capTableInfo[0]}
              </span>
            )}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {isConnected && (
            <Button
              variant="outline"
              onClick={() => setShowAddInvestor(!showAddInvestor)}
              className="gap-2"
            >
              <Plus className="h-4 w-4" />
              Add Investor
            </Button>
          )}
          <Button
            variant="outline"
            onClick={() => setShowMasked(!showMasked)}
            className="gap-2"
          >
            {showMasked ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            {showMasked ? "Hide Details" : "Show Details"}
          </Button>
        </div>
      </div>

      <div className="grid gap-4">
        {mockData.map((holder) => (
          <Card 
            key={holder.id} 
            className="bg-gradient-card border-border/50 shadow-card hover:shadow-glow transition-all duration-300"
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className={`w-12 h-12 rounded-full ${getTypeColor(holder.type)} flex items-center justify-center`}>
                      {holder.type === "founder" && <Building2 className="h-6 w-6 text-primary-foreground" />}
                      {holder.type === "investor" && <TrendingUp className="h-6 w-6 text-accent-foreground" />}
                      {holder.type === "employee" && <Wallet className="h-6 w-6 text-secondary-foreground" />}
                    </div>
                    {holder.masked && !showMasked && (
                      <div className="absolute inset-0 bg-gradient-privacy rounded-full backdrop-blur-privacy animate-privacy-pulse" />
                    )}
                  </div>
                  
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-foreground">
                        {holder.masked && !showMasked ? "••••••••••••" : holder.name}
                      </h3>
                      <Badge variant="secondary" className="text-xs">
                        {getTypeBadge(holder.type)}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {holder.shares.toLocaleString()} shares
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-2xl font-bold text-foreground">
                    {holder.percentage}%
                  </div>
                  <div className="w-24 h-2 bg-secondary rounded-full mt-2">
                    <div 
                      className={`h-full ${getTypeColor(holder.type)} rounded-full transition-all duration-500`}
                      style={{ width: `${(holder.percentage / 40) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-gradient-card border-border/50 shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5 text-primary" />
            Privacy Features
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full" />
              <span>End-to-end encryption</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-accent rounded-full" />
              <span>Anonymous holdings</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-secondary rounded-full" />
              <span>Selective disclosure</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
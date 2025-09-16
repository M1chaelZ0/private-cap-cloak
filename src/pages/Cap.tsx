import { Header } from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Users, Percent, TrendingUp, Calculator } from "lucide-react";
import { useState } from "react";

const Cap = () => {
  const [newEntry, setNewEntry] = useState({
    name: "",
    shares: "",
    type: "investor"
  });

  const capTableData = [
    { name: "Founder Pool", shares: 4000000, percentage: 40.0, type: "founder" },
    { name: "Employee Pool", shares: 1500000, percentage: 15.0, type: "employee" },
    { name: "Series A Investors", shares: 2500000, percentage: 25.0, type: "investor" },
    { name: "Angel Investors", shares: 1200000, percentage: 12.0, type: "investor" },
    { name: "Advisor Pool", shares: 800000, percentage: 8.0, type: "advisor" },
  ];

  const totalShares = capTableData.reduce((sum, entry) => sum + entry.shares, 0);

  const getTypeColor = (type: string) => {
    switch (type) {
      case "founder": return "bg-primary";
      case "investor": return "bg-accent";  
      case "employee": return "bg-secondary";
      case "advisor": return "bg-muted";
      default: return "bg-muted";
    }
  };

  const calculations = {
    preMoneyValuation: 15000000,
    postMoneyValuation: 20000000,
    sharePrice: 4.00,
    totalInvestment: 5000000
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-6 py-12 space-y-8">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Cap Table Management
          </h1>
          <p className="text-muted-foreground">
            Manage equity distribution and ownership calculations
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          <Card className="bg-gradient-card shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Shares</p>
                  <p className="text-xl font-bold">{totalShares.toLocaleString()}</p>
                </div>
                <Users className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Share Price</p>
                  <p className="text-xl font-bold">${calculations.sharePrice}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-accent" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Pre-Money</p>
                  <p className="text-xl font-bold">${(calculations.preMoneyValuation / 1000000).toFixed(1)}M</p>
                </div>
                <Calculator className="h-8 w-8 text-secondary" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Post-Money</p>
                  <p className="text-xl font-bold">${(calculations.postMoneyValuation / 1000000).toFixed(1)}M</p>
                </div>
                <Percent className="h-8 w-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card className="bg-gradient-card shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Current Cap Table
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {capTableData.map((entry, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border border-border/50 rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className={`w-4 h-4 rounded-full ${getTypeColor(entry.type)}`} />
                        <div>
                          <h3 className="font-semibold">{entry.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {entry.shares.toLocaleString()} shares
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-bold">{entry.percentage}%</p>
                        <Badge variant="secondary" className="text-xs capitalize">
                          {entry.type}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card shadow-card">
              <CardHeader>
                <CardTitle>Ownership Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {capTableData.map((entry, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>{entry.name}</span>
                        <span>{entry.percentage}%</span>
                      </div>
                      <div className="w-full h-2 bg-secondary rounded-full">
                        <div 
                          className={`h-full ${getTypeColor(entry.type)} rounded-full transition-all duration-500`}
                          style={{ width: `${entry.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="bg-gradient-card shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="h-5 w-5" />
                  Add New Entry
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    placeholder="Enter shareholder name"
                    value={newEntry.name}
                    onChange={(e) => setNewEntry(prev => ({ ...prev, name: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="shares">Shares</Label>
                  <Input
                    id="shares"
                    type="number"
                    placeholder="Number of shares"
                    value={newEntry.shares}
                    onChange={(e) => setNewEntry(prev => ({ ...prev, shares: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type">Type</Label>
                  <select 
                    id="type"
                    className="w-full p-2 border border-border rounded-md bg-background"
                    value={newEntry.type}
                    onChange={(e) => setNewEntry(prev => ({ ...prev, type: e.target.value }))}
                  >
                    <option value="founder">Founder</option>
                    <option value="investor">Investor</option>
                    <option value="employee">Employee</option>
                    <option value="advisor">Advisor</option>
                  </select>
                </div>
                <Button className="w-full" variant="hero">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Entry
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card shadow-card">
              <CardHeader>
                <CardTitle>Valuation Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Pre-Money Valuation</span>
                  <span className="font-semibold">${(calculations.preMoneyValuation / 1000000).toFixed(1)}M</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Investment Amount</span>
                  <span className="font-semibold">${(calculations.totalInvestment / 1000000).toFixed(1)}M</span>
                </div>
                <div className="flex justify-between border-t border-border pt-4">
                  <span className="text-muted-foreground">Post-Money Valuation</span>
                  <span className="font-bold text-lg">${(calculations.postMoneyValuation / 1000000).toFixed(1)}M</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Price per Share</span>
                  <span className="font-semibold">${calculations.sharePrice}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Cap;
import { Header } from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, DollarSign, Percent, Calendar } from "lucide-react";

const Portfolio = () => {
  const holdings = [
    { company: "TechStart Alpha", shares: 50000, value: 125000, percentage: 2.5, lastUpdate: "2024-01-15" },
    { company: "BlockChain Beta", shares: 25000, value: 75000, percentage: 1.8, lastUpdate: "2024-01-10" },
    { company: "AI Gamma Inc", shares: 30000, value: 90000, percentage: 3.2, lastUpdate: "2024-01-12" },
  ];

  const totalValue = holdings.reduce((sum, holding) => sum + holding.value, 0);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-6 py-12 space-y-8">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Portfolio Overview
          </h1>
          <p className="text-muted-foreground">
            Manage and track your startup investments
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          <Card className="bg-gradient-card shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Value</p>
                  <p className="text-2xl font-bold">${totalValue.toLocaleString()}</p>
                </div>
                <DollarSign className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Companies</p>
                  <p className="text-2xl font-bold">{holdings.length}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-accent" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Avg. Stake</p>
                  <p className="text-2xl font-bold">2.5%</p>
                </div>
                <Percent className="h-8 w-8 text-secondary" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Last Update</p>
                  <p className="text-sm font-medium">Jan 15, 2024</p>
                </div>
                <Calendar className="h-8 w-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-gradient-card shadow-card">
          <CardHeader>
            <CardTitle>Investment Holdings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {holdings.map((holding, index) => (
                <div key={index} className="flex items-center justify-between p-4 border border-border/50 rounded-lg">
                  <div className="space-y-1">
                    <h3 className="font-semibold">{holding.company}</h3>
                    <p className="text-sm text-muted-foreground">
                      {holding.shares.toLocaleString()} shares • {holding.percentage}% stake
                    </p>
                  </div>
                  <div className="text-right space-y-1">
                    <p className="font-semibold">${holding.value.toLocaleString()}</p>
                    <Badge variant="secondary" className="text-xs">
                      Updated {holding.lastUpdate}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Portfolio;
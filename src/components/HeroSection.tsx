import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Eye, Zap, TrendingUp } from "lucide-react";

export function HeroSection() {
  return (
    <section className="py-20 px-6">
      <div className="container mx-auto text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="space-y-4">
            <h1 className="text-6xl md:text-7xl font-bold leading-tight">
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Invest Transparently,
              </span>
              <br />
              <span className="text-foreground">Own Privately</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Revolutionary startup cap table management with end-to-end encryption. 
              See ownership percentages without exposing investor identities.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button variant="hero" size="lg" className="gap-2" onClick={() => window.location.href = '/dashboard'}>
              <Shield className="h-5 w-5" />
              Start Investing
            </Button>
            <Button variant="outline" size="lg" className="gap-2" onClick={() => window.location.href = '/cap'}>
              <Eye className="h-5 w-5" />
              View Demo
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-16">
            <Card className="bg-gradient-card border-border/30 shadow-card hover:shadow-glow transition-all duration-300">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">End-to-End Encryption</h3>
                <p className="text-sm text-muted-foreground">
                  Military-grade encryption protects all investor data and ownership records
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card border-border/30 shadow-card hover:shadow-glow transition-all duration-300">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Eye className="h-6 w-6 text-accent" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Anonymous Holdings</h3>
                <p className="text-sm text-muted-foreground">
                  View cap table percentages while keeping investor identities completely private
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card border-border/30 shadow-card hover:shadow-glow transition-all duration-300">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Instant Verification</h3>
                <p className="text-sm text-muted-foreground">
                  Blockchain-powered verification ensures data integrity and transparency
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
import { Button } from "@/components/ui/button";
import { Building2, Bell, Settings } from "lucide-react";
import { ConnectButton } from '@rainbow-me/rainbowkit';

export function Header() {
  return (
    <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center shadow-glow">
              <Building2 className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">CapSecure</h1>
              <p className="text-xs text-muted-foreground">Private Equity Platform</p>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-6">
            <a href="/dashboard" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Dashboard
            </a>
            <a href="/portfolio" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Portfolio
            </a>
            <a href="/analytics" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Analytics
            </a>
            <a href="/documents" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Documents
            </a>
            <a href="/cap" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Cap
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="hidden md:flex">
              <Bell className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="hidden md:flex">
              <Settings className="h-4 w-4" />
            </Button>
            <ConnectButton />
          </div>
        </div>
      </div>
    </header>
  );
}
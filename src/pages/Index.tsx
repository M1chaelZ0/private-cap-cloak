import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { CapTable } from "@/components/CapTable";
import { WalletConnect } from "@/components/WalletConnect";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <main className="container mx-auto px-6 py-12 space-y-12">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <CapTable />
          </div>
          <div>
            <WalletConnect />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;

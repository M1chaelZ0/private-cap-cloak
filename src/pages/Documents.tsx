import { Header } from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, Download, Eye, Shield, Calendar, User } from "lucide-react";

const Documents = () => {
  const documents = [
    {
      id: "1",
      name: "TechStart Alpha - Investment Agreement",
      type: "Investment Agreement",
      date: "2024-01-15",
      size: "2.4 MB",
      status: "Signed",
      confidential: true
    },
    {
      id: "2", 
      name: "BlockChain Beta - Term Sheet",
      type: "Term Sheet",
      date: "2024-01-10",
      size: "890 KB",
      status: "Pending",
      confidential: false
    },
    {
      id: "3",
      name: "AI Gamma Inc - Due Diligence Report",
      type: "Due Diligence",
      date: "2024-01-12",
      size: "5.2 MB", 
      status: "Review",
      confidential: true
    },
    {
      id: "4",
      name: "Q1 2024 Portfolio Report",
      type: "Portfolio Report",
      date: "2024-01-08",
      size: "1.8 MB",
      status: "Complete",
      confidential: false
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Signed": return "bg-primary";
      case "Complete": return "bg-primary";
      case "Pending": return "bg-accent";
      case "Review": return "bg-secondary";
      default: return "bg-muted";
    }
  };

  const getTypeIcon = (type: string) => {
    return <FileText className="h-5 w-5" />;
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-6 py-12 space-y-8">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Document Center
          </h1>
          <p className="text-muted-foreground">
            Secure access to investment documents and agreements
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          <Card className="bg-gradient-card shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Documents</p>
                  <p className="text-2xl font-bold">{documents.length}</p>
                </div>
                <FileText className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Signed</p>
                  <p className="text-2xl font-bold">
                    {documents.filter(d => d.status === "Signed" || d.status === "Complete").length}
                  </p>
                </div>
                <Shield className="h-8 w-8 text-accent" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Pending</p>
                  <p className="text-2xl font-bold">
                    {documents.filter(d => d.status === "Pending" || d.status === "Review").length}
                  </p>
                </div>
                <Calendar className="h-8 w-8 text-secondary" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Confidential</p>
                  <p className="text-2xl font-bold">
                    {documents.filter(d => d.confidential).length}
                  </p>
                </div>
                <User className="h-8 w-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-gradient-card shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Recent Documents
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {documents.map((doc) => (
                <div key={doc.id} className="flex items-center justify-between p-4 border border-border/50 rounded-lg hover:shadow-glow transition-all duration-300">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      {getTypeIcon(doc.type)}
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{doc.name}</h3>
                        {doc.confidential && (
                          <Shield className="h-4 w-4 text-accent" />
                        )}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>{doc.type}</span>
                        <span>•</span>
                        <span>{doc.date}</span>
                        <span>•</span>
                        <span>{doc.size}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Badge variant="secondary" className={getStatusColor(doc.status)}>
                      {doc.status}
                    </Badge>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              Security & Compliance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary rounded-full" />
                <span>256-bit AES encryption</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-accent rounded-full" />
                <span>Digital signatures verified</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-secondary rounded-full" />
                <span>SOC 2 Type II compliant</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Documents;
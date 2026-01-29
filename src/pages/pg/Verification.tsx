import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShieldCheck, Upload, CheckCircle, AlertCircle, Clock, FileText } from "lucide-react";

const Verification = () => {
  const documents = [
    { name: "Property Ownership Proof", status: "verified", uploadDate: "15 Jan 2024" },
    { name: "Owner ID Proof (Aadhaar)", status: "verified", uploadDate: "15 Jan 2024" },
    { name: "Trade License", status: "pending", uploadDate: "20 Jan 2024" },
    { name: "Fire Safety Certificate", status: "not_uploaded", uploadDate: null },
    { name: "Police Verification", status: "verified", uploadDate: "18 Jan 2024" },
    { name: "Building Approval", status: "pending", uploadDate: "22 Jan 2024" },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "verified":
        return <Badge className="bg-success/10 text-success border-0"><CheckCircle className="w-3 h-3 mr-1" />Verified</Badge>;
      case "pending":
        return <Badge className="bg-warning/10 text-warning border-0"><Clock className="w-3 h-3 mr-1" />Pending</Badge>;
      default:
        return <Badge variant="secondary"><AlertCircle className="w-3 h-3 mr-1" />Not Uploaded</Badge>;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground">Verification & Compliance</h1>
          <p className="text-muted-foreground mt-1">Manage documents and verification status</p>
        </div>
      </div>

      <Card className="border-0 shadow-card overflow-hidden">
        <div className="bg-gradient-primary p-6 text-primary-foreground">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-primary-foreground/10 rounded-2xl flex items-center justify-center">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-xl font-display font-bold">Verification Status</h2>
              <p className="text-primary-foreground/80">3 of 6 documents verified</p>
            </div>
          </div>
        </div>
        <CardContent className="p-6">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="p-4 rounded-lg bg-success/10">
              <p className="text-2xl font-display font-bold text-success">3</p>
              <p className="text-sm text-muted-foreground">Verified</p>
            </div>
            <div className="p-4 rounded-lg bg-warning/10">
              <p className="text-2xl font-display font-bold text-warning">2</p>
              <p className="text-sm text-muted-foreground">Pending</p>
            </div>
            <div className="p-4 rounded-lg bg-muted">
              <p className="text-2xl font-display font-bold text-muted-foreground">1</p>
              <p className="text-sm text-muted-foreground">Not Uploaded</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-accent" />
            Required Documents
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {documents.map((doc) => (
              <div key={doc.name} className="flex items-center justify-between p-4 rounded-lg border border-border">
                <div>
                  <p className="font-medium">{doc.name}</p>
                  {doc.uploadDate && (
                    <p className="text-sm text-muted-foreground">Uploaded: {doc.uploadDate}</p>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  {getStatusBadge(doc.status)}
                  {doc.status === "not_uploaded" ? (
                    <Button size="sm" className="bg-accent hover:bg-accent/90">
                      <Upload className="w-4 h-4 mr-1" />
                      Upload
                    </Button>
                  ) : (
                    <Button size="sm" variant="outline">
                      View
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Verification;

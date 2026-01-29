import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Headphones,
  Phone,
  Mail,
  MessageCircle,
  Clock,
  MapPin,
  Send,
  CheckCircle,
  ExternalLink,
} from "lucide-react";
import { toast } from "sonner";

export default function ContactSupport() {
  const [formData, setFormData] = useState({
    subject: "",
    category: "",
    message: "",
    priority: "normal",
  });

  const supportChannels = [
    {
      title: "Phone Support",
      description: "Talk to our support team",
      value: "+91 1800 123 4567",
      icon: Phone,
      availability: "24/7 Available",
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "Email Support",
      description: "Send us an email",
      value: "support@pgmanagement.com",
      icon: Mail,
      availability: "Response within 24 hours",
      color: "bg-green-100 text-green-600",
    },
    {
      title: "WhatsApp",
      description: "Chat with us",
      value: "+91 98765 43210",
      icon: MessageCircle,
      availability: "9 AM - 9 PM",
      color: "bg-emerald-100 text-emerald-600",
    },
  ];

  const handleSubmit = () => {
    if (!formData.subject || !formData.category || !formData.message) {
      toast.error("Please fill all required fields");
      return;
    }
    toast.success("Message sent successfully!", {
      description: "Our support team will get back to you soon.",
    });
    setFormData({ subject: "", category: "", message: "", priority: "normal" });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold flex items-center gap-2">
            <Headphones className="h-6 w-6 text-primary" />
            Contact Support
          </h1>
          <p className="text-muted-foreground mt-1">
            Get help from our support team
          </p>
        </div>
        <Badge variant="outline" className="text-green-600 border-green-300">
          <CheckCircle className="h-3 w-3 mr-1" />
          Online
        </Badge>
      </div>

      {/* Support Channels */}
      <div className="grid gap-4 md:grid-cols-3">
        {supportChannels.map((channel) => (
          <Card key={channel.title} className="border-0 shadow-card hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className={`inline-flex p-3 rounded-lg ${channel.color} mb-4`}>
                <channel.icon className="h-6 w-6" />
              </div>
              <h3 className="font-semibold mb-1">{channel.title}</h3>
              <p className="text-sm text-muted-foreground mb-3">{channel.description}</p>
              <p className="font-medium text-primary mb-2">{channel.value}</p>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" />
                {channel.availability}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Contact Form */}
      <Card className="border-0 shadow-card">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Mail className="h-5 w-5 text-primary" />
            Send Us a Message
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData({ ...formData, category: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="technical">Technical Issue</SelectItem>
                  <SelectItem value="billing">Billing & Payments</SelectItem>
                  <SelectItem value="account">Account Related</SelectItem>
                  <SelectItem value="feature">Feature Request</SelectItem>
                  <SelectItem value="complaint">Complaint</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="priority">Priority</Label>
              <Select
                value={formData.priority}
                onValueChange={(value) => setFormData({ ...formData, priority: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="normal">Normal</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="urgent">Urgent</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="subject">Subject *</Label>
            <Input
              id="subject"
              placeholder="Brief description of your issue"
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="message">Message *</Label>
            <Textarea
              id="message"
              placeholder="Describe your issue in detail..."
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              rows={5}
            />
          </div>
          <Button onClick={handleSubmit}>
            <Send className="h-4 w-4 mr-2" />
            Send Message
          </Button>
        </CardContent>
      </Card>

      {/* Office Information */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border-0 shadow-card">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              Head Office
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="font-medium">PG Management Solutions Pvt. Ltd.</p>
              <p className="text-sm text-muted-foreground">
                123, Tech Park, Madhapur<br />
                Hyderabad, Telangana 500081<br />
                India
              </p>
            </div>
            <div className="pt-3 border-t">
              <p className="text-sm text-muted-foreground">
                <strong>Office Hours:</strong><br />
                Monday - Friday: 9:00 AM - 6:00 PM<br />
                Saturday: 10:00 AM - 4:00 PM<br />
                Sunday: Closed
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-card">
          <CardHeader>
            <CardTitle className="text-lg">Quick Links</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-between">
              <span>Knowledge Base</span>
              <ExternalLink className="h-4 w-4" />
            </Button>
            <Button variant="outline" className="w-full justify-between">
              <span>Video Tutorials</span>
              <ExternalLink className="h-4 w-4" />
            </Button>
            <Button variant="outline" className="w-full justify-between">
              <span>Community Forum</span>
              <ExternalLink className="h-4 w-4" />
            </Button>
            <Button variant="outline" className="w-full justify-between">
              <span>System Status</span>
              <ExternalLink className="h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

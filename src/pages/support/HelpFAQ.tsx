import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  HelpCircle,
  Search,
  BookOpen,
  Users,
  CreditCard,
  Settings,
  Home,
  FileText,
  Shield,
  MessageCircle,
} from "lucide-react";

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export default function HelpFAQ() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "all", label: "All", icon: BookOpen },
    { id: "getting-started", label: "Getting Started", icon: Home },
    { id: "tenants", label: "Tenants", icon: Users },
    { id: "payments", label: "Payments", icon: CreditCard },
    { id: "bookings", label: "Bookings", icon: FileText },
    { id: "settings", label: "Settings", icon: Settings },
    { id: "security", label: "Security", icon: Shield },
  ];

  const faqs: FAQ[] = [
    {
      id: "1",
      question: "How do I add a new tenant to my PG?",
      answer:
        "Navigate to Tenants > Add Tenant from the sidebar menu. Fill in the tenant's personal details, select the room and bed, enter payment information, and upload required documents. Click 'Add Tenant' to complete the registration.",
      category: "tenants",
    },
    {
      id: "2",
      question: "How can I update room vacancies?",
      answer:
        "Go to Vacancies > Update Vacancies. Select the room you want to update and change the status (Available, Occupied, Reserved, or Under Maintenance). You can also do bulk updates for multiple rooms at once.",
      category: "getting-started",
    },
    {
      id: "3",
      question: "How do I collect rent from tenants?",
      answer:
        "Go to Payments > Rent Collection. You'll see a list of all pending payments. You can record cash payments manually, send payment reminders via SMS/Email, or if online payment is enabled, tenants can pay directly through the app.",
      category: "payments",
    },
    {
      id: "4",
      question: "How do I handle a new booking request?",
      answer:
        "New booking requests appear in Bookings > New Booking Requests. Review the request details, verify the tenant's information, and either Approve or Reject the request. Approved bookings will move to the Approved Bookings section.",
      category: "bookings",
    },
    {
      id: "5",
      question: "How can I change my password?",
      answer:
        "Go to Settings > Security Settings. Under 'Change Password', enter your current password, then enter and confirm your new password. Click 'Update Password' to save the changes.",
      category: "security",
    },
    {
      id: "6",
      question: "How do I enable two-factor authentication?",
      answer:
        "Navigate to Settings > Security Settings. Find the 'Two-Factor Authentication' section and toggle it on. OTP verification will be enabled for your login, and codes will be sent to your registered mobile number.",
      category: "security",
    },
    {
      id: "7",
      question: "Can I manage multiple PGs from one account?",
      answer:
        "Yes! Use the 'Switch Property' option in the header to switch between your PGs. You can add new properties from Settings > PG Settings > Add New Property.",
      category: "settings",
    },
    {
      id: "8",
      question: "How do I download rent receipts?",
      answer:
        "Go to Payments > Download Receipts. Select the month and tenant (or select all), then click 'Generate Receipts'. You can download individual receipts or bulk download all receipts as a ZIP file.",
      category: "payments",
    },
    {
      id: "9",
      question: "How do I handle tenant complaints?",
      answer:
        "Complaints appear in Complaints > Open Complaints. Review the issue, assign it to maintenance staff if needed, and update the status as work progresses. Once resolved, mark it as 'Resolved' and optionally request tenant feedback.",
      category: "tenants",
    },
    {
      id: "10",
      question: "How can I update my PG details and photos?",
      answer:
        "Go to My PG/Hostel > Basic PG Information to update your PG details. For photos, go to My PG/Hostel > Photos & Media where you can upload, rearrange, or delete photos of your property.",
      category: "getting-started",
    },
    {
      id: "11",
      question: "What happens when a tenant vacates?",
      answer:
        "Go to Tenants > Active Tenants, find the tenant, and click 'Process Vacating'. Enter the vacating date, calculate any pending dues or refunds, and complete the checkout. The tenant will move to Vacated Tenants.",
      category: "tenants",
    },
    {
      id: "12",
      question: "How do I set up rent reminders?",
      answer:
        "Go to Settings > Rent Settings. Enable 'Automatic Reminders' and select which days before the due date you want reminders sent. You can choose to send reminders via SMS, Email, or both.",
      category: "settings",
    },
    {
      id: "13",
      question: "How do I generate reports?",
      answer:
        "Navigate to Reports section in the sidebar. Choose from Occupancy Report, Rent Collection Report, Tenant Report, Complaint Report, or Monthly Summary. Select the date range and click 'Generate Report'. Reports can be downloaded as PDF or Excel.",
      category: "getting-started",
    },
    {
      id: "14",
      question: "Can tenants rate and review my PG?",
      answer:
        "Yes! Tenants can leave reviews which appear in Reviews > Tenant Reviews. You can view all reviews, see your overall rating in Reviews > PG Ratings, and respond to reviews in Reviews > Reply to Reviews.",
      category: "tenants",
    },
    {
      id: "15",
      question: "How do I create notices for tenants?",
      answer:
        "Go to Notices > Create Notice. Enter the notice title, content, select the priority, and choose who should receive it (all tenants, specific floors, or specific rooms). You can also schedule notices for future dates.",
      category: "getting-started",
    },
  ];

  const filteredFAQs = faqs.filter((faq) => {
    const matchesSearch =
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold flex items-center gap-2">
            <HelpCircle className="h-6 w-6 text-primary" />
            Help & FAQ
          </h1>
          <p className="text-muted-foreground mt-1">
            Find answers to commonly asked questions
          </p>
        </div>
        <Badge variant="outline">{faqs.length} Articles</Badge>
      </div>

      {/* Search */}
      <Card className="border-0 shadow-card">
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search for help..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 text-lg"
            />
          </div>
        </CardContent>
      </Card>

      {/* Categories */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-colors ${
              selectedCategory === category.id
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-background hover:bg-muted border-border"
            }`}
          >
            <category.icon className="h-4 w-4" />
            <span className="text-sm font-medium">{category.label}</span>
          </button>
        ))}
      </div>

      {/* FAQ List */}
      <Card className="border-0 shadow-card">
        <CardHeader>
          <CardTitle className="text-lg">
            {selectedCategory === "all"
              ? "All Questions"
              : categories.find((c) => c.id === selectedCategory)?.label}
            <Badge variant="outline" className="ml-2">
              {filteredFAQs.length}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {filteredFAQs.length > 0 ? (
            <Accordion type="single" collapsible className="w-full">
              {filteredFAQs.map((faq) => (
                <AccordionItem key={faq.id} value={faq.id}>
                  <AccordionTrigger className="text-left hover:no-underline">
                    <div className="flex items-start gap-3">
                      <HelpCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span>{faq.question}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pl-8 text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          ) : (
            <div className="text-center py-12">
              <HelpCircle className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">No results found</h3>
              <p className="text-muted-foreground">
                Try a different search term or category
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Still Need Help */}
      <Card className="border-0 shadow-card bg-gradient-to-r from-primary/10 to-primary/5">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-primary/10">
                <MessageCircle className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Still need help?</h3>
                <p className="text-sm text-muted-foreground">
                  Our support team is here to assist you
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <a href="/dashboard/support/contact">
                <Badge
                  variant="outline"
                  className="cursor-pointer hover:bg-primary hover:text-primary-foreground px-4 py-2"
                >
                  Contact Support
                </Badge>
              </a>
              <a href="/dashboard/support/ticket">
                <Badge
                  variant="outline"
                  className="cursor-pointer hover:bg-primary hover:text-primary-foreground px-4 py-2"
                >
                  Raise Ticket
                </Badge>
              </a>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import {
  UserPlus,
  User,
  Phone,
  Mail,
  Home,
  Calendar,
  FileText,
  Upload,
  Save,
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  Building,
  CreditCard,
  Shield,
  AlertCircle,
} from "lucide-react";
import { toast } from "sonner";

export default function AddTenant() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Personal Details
    fullName: "",
    email: "",
    mobile: "",
    alternatePhone: "",
    dateOfBirth: "",
    gender: "",
    occupation: "",
    organization: "",
    bloodGroup: "",
    // Address
    permanentAddress: "",
    city: "",
    state: "",
    pincode: "",
    // Room Allocation
    roomNumber: "",
    bedNumber: "",
    sharingType: "",
    floor: "",
    // Stay Details
    joinDate: "",
    rentAmount: "",
    securityDeposit: "",
    advancePayment: "",
    rentDueDate: "",
    // Emergency Contact
    emergencyName: "",
    emergencyRelation: "",
    emergencyPhone: "",
    // Documents
    idProofType: "",
    idProofNumber: "",
    // Terms
    agreeTerms: false,
  });

  const steps = [
    { id: 1, title: "Personal Info", icon: User },
    { id: 2, title: "Address", icon: Home },
    { id: 3, title: "Room Allocation", icon: Building },
    { id: 4, title: "Stay Details", icon: CreditCard },
    { id: 5, title: "Documents", icon: FileText },
    { id: 6, title: "Review", icon: CheckCircle },
  ];

  const availableRooms = [
    { number: "101", floor: "1", type: "Double Sharing", beds: ["A", "B"] },
    { number: "102", floor: "1", type: "Triple Sharing", beds: ["A", "B", "C"] },
    { number: "201", floor: "2", type: "Single", beds: ["A"] },
    { number: "203", floor: "2", type: "Double Sharing", beds: ["A"] },
    { number: "301", floor: "3", type: "Four Sharing", beds: ["A", "B"] },
  ];

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (currentStep < 6) setCurrentStep(currentStep + 1);
  };

  const handlePrevious = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleSubmit = () => {
    toast.success("Tenant added successfully!", {
      description: `${formData.fullName} has been registered and assigned to Room ${formData.roomNumber}.`,
    });
  };

  const selectedRoom = availableRooms.find((r) => r.number === formData.roomNumber);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold flex items-center gap-2">
            <UserPlus className="h-6 w-6 text-primary" />
            Add New Tenant
          </h1>
          <p className="text-muted-foreground mt-1">
            Register a new tenant manually with complete details
          </p>
        </div>
        <Badge variant="outline" className="text-sm">
          Step {currentStep} of 6
        </Badge>
      </div>

      {/* Progress Steps */}
      <Card className="border-0 shadow-card">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors ${
                    currentStep >= step.id
                      ? "bg-primary border-primary text-primary-foreground"
                      : "border-muted-foreground/30 text-muted-foreground"
                  }`}
                >
                  <step.icon className="h-5 w-5" />
                </div>
                <span
                  className={`ml-2 text-sm font-medium hidden md:block ${
                    currentStep >= step.id ? "text-foreground" : "text-muted-foreground"
                  }`}
                >
                  {step.title}
                </span>
                {index < steps.length - 1 && (
                  <div
                    className={`w-8 md:w-16 h-0.5 mx-2 ${
                      currentStep > step.id ? "bg-primary" : "bg-muted"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Form Content */}
      <Card className="border-0 shadow-card">
        <CardContent className="p-6">
          {/* Step 1: Personal Information */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="flex items-center gap-2 mb-4">
                <User className="h-5 w-5 text-primary" />
                <h2 className="text-lg font-semibold">Personal Information</h2>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name *</Label>
                  <Input
                    id="fullName"
                    placeholder="Enter full name"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange("fullName", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email ID *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter email address"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="mobile">Mobile Number *</Label>
                  <Input
                    id="mobile"
                    placeholder="Enter mobile number"
                    value={formData.mobile}
                    onChange={(e) => handleInputChange("mobile", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="alternatePhone">Alternate Phone</Label>
                  <Input
                    id="alternatePhone"
                    placeholder="Enter alternate number"
                    value={formData.alternatePhone}
                    onChange={(e) => handleInputChange("alternatePhone", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                  <Input
                    id="dateOfBirth"
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gender">Gender *</Label>
                  <Select
                    value={formData.gender}
                    onValueChange={(value) => handleInputChange("gender", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="occupation">Occupation *</Label>
                  <Select
                    value={formData.occupation}
                    onValueChange={(value) => handleInputChange("occupation", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select occupation" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="student">Student</SelectItem>
                      <SelectItem value="working">Working Professional</SelectItem>
                      <SelectItem value="business">Business</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="organization">College / Company Name</Label>
                  <Input
                    id="organization"
                    placeholder="Enter organization name"
                    value={formData.organization}
                    onChange={(e) => handleInputChange("organization", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bloodGroup">Blood Group</Label>
                  <Select
                    value={formData.bloodGroup}
                    onValueChange={(value) => handleInputChange("bloodGroup", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select blood group" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="A+">A+</SelectItem>
                      <SelectItem value="A-">A-</SelectItem>
                      <SelectItem value="B+">B+</SelectItem>
                      <SelectItem value="B-">B-</SelectItem>
                      <SelectItem value="O+">O+</SelectItem>
                      <SelectItem value="O-">O-</SelectItem>
                      <SelectItem value="AB+">AB+</SelectItem>
                      <SelectItem value="AB-">AB-</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Address Details */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="flex items-center gap-2 mb-4">
                <Home className="h-5 w-5 text-primary" />
                <h2 className="text-lg font-semibold">Permanent Address</h2>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="permanentAddress">Full Address *</Label>
                  <Textarea
                    id="permanentAddress"
                    placeholder="Enter complete permanent address"
                    value={formData.permanentAddress}
                    onChange={(e) => handleInputChange("permanentAddress", e.target.value)}
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">City *</Label>
                  <Input
                    id="city"
                    placeholder="Enter city"
                    value={formData.city}
                    onChange={(e) => handleInputChange("city", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State *</Label>
                  <Select
                    value={formData.state}
                    onValueChange={(value) => handleInputChange("state", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select state" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="telangana">Telangana</SelectItem>
                      <SelectItem value="andhra">Andhra Pradesh</SelectItem>
                      <SelectItem value="karnataka">Karnataka</SelectItem>
                      <SelectItem value="maharashtra">Maharashtra</SelectItem>
                      <SelectItem value="tamil-nadu">Tamil Nadu</SelectItem>
                      <SelectItem value="kerala">Kerala</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pincode">Pincode *</Label>
                  <Input
                    id="pincode"
                    placeholder="Enter pincode"
                    value={formData.pincode}
                    onChange={(e) => handleInputChange("pincode", e.target.value)}
                  />
                </div>
              </div>

              {/* Emergency Contact */}
              <div className="border-t pt-6 mt-6">
                <div className="flex items-center gap-2 mb-4">
                  <Shield className="h-5 w-5 text-primary" />
                  <h2 className="text-lg font-semibold">Emergency Contact</h2>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="emergencyName">Contact Name *</Label>
                    <Input
                      id="emergencyName"
                      placeholder="Enter name"
                      value={formData.emergencyName}
                      onChange={(e) => handleInputChange("emergencyName", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="emergencyRelation">Relation *</Label>
                    <Select
                      value={formData.emergencyRelation}
                      onValueChange={(value) => handleInputChange("emergencyRelation", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select relation" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="father">Father</SelectItem>
                        <SelectItem value="mother">Mother</SelectItem>
                        <SelectItem value="spouse">Spouse</SelectItem>
                        <SelectItem value="sibling">Sibling</SelectItem>
                        <SelectItem value="guardian">Guardian</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="emergencyPhone">Phone Number *</Label>
                    <Input
                      id="emergencyPhone"
                      placeholder="Enter phone"
                      value={formData.emergencyPhone}
                      onChange={(e) => handleInputChange("emergencyPhone", e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Room Allocation */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="flex items-center gap-2 mb-4">
                <Building className="h-5 w-5 text-primary" />
                <h2 className="text-lg font-semibold">Room Allocation</h2>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="roomNumber">Select Room *</Label>
                  <Select
                    value={formData.roomNumber}
                    onValueChange={(value) => {
                      handleInputChange("roomNumber", value);
                      const room = availableRooms.find((r) => r.number === value);
                      if (room) {
                        handleInputChange("floor", room.floor);
                        handleInputChange("sharingType", room.type);
                        handleInputChange("bedNumber", "");
                      }
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select available room" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableRooms.map((room) => (
                        <SelectItem key={room.number} value={room.number}>
                          Room {room.number} - Floor {room.floor} ({room.type})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {selectedRoom && (
                  <div className="space-y-2">
                    <Label htmlFor="bedNumber">Select Bed *</Label>
                    <Select
                      value={formData.bedNumber}
                      onValueChange={(value) => handleInputChange("bedNumber", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select bed" />
                      </SelectTrigger>
                      <SelectContent>
                        {selectedRoom.beds.map((bed) => (
                          <SelectItem key={bed} value={bed}>
                            Bed {bed}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="floor">Floor</Label>
                  <Input id="floor" value={formData.floor} readOnly className="bg-muted" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sharingType">Sharing Type</Label>
                  <Input id="sharingType" value={formData.sharingType} readOnly className="bg-muted" />
                </div>
              </div>

              {/* Room Preview */}
              {selectedRoom && (
                <Card className="bg-muted/50 border-dashed">
                  <CardContent className="p-4">
                    <h3 className="font-medium mb-3">Room Details Preview</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Room:</span>
                        <p className="font-medium">{selectedRoom.number}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Floor:</span>
                        <p className="font-medium">{selectedRoom.floor}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Type:</span>
                        <p className="font-medium">{selectedRoom.type}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Available Beds:</span>
                        <p className="font-medium">{selectedRoom.beds.join(", ")}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          )}

          {/* Step 4: Stay Details */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div className="flex items-center gap-2 mb-4">
                <CreditCard className="h-5 w-5 text-primary" />
                <h2 className="text-lg font-semibold">Stay & Payment Details</h2>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="joinDate">Join Date *</Label>
                  <Input
                    id="joinDate"
                    type="date"
                    value={formData.joinDate}
                    onChange={(e) => handleInputChange("joinDate", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="rentDueDate">Rent Due Date *</Label>
                  <Select
                    value={formData.rentDueDate}
                    onValueChange={(value) => handleInputChange("rentDueDate", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select due date" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1st of every month</SelectItem>
                      <SelectItem value="5">5th of every month</SelectItem>
                      <SelectItem value="10">10th of every month</SelectItem>
                      <SelectItem value="15">15th of every month</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="rentAmount">Monthly Rent (₹) *</Label>
                  <Input
                    id="rentAmount"
                    type="number"
                    placeholder="Enter rent amount"
                    value={formData.rentAmount}
                    onChange={(e) => handleInputChange("rentAmount", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="securityDeposit">Security Deposit (₹) *</Label>
                  <Input
                    id="securityDeposit"
                    type="number"
                    placeholder="Enter deposit amount"
                    value={formData.securityDeposit}
                    onChange={(e) => handleInputChange("securityDeposit", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="advancePayment">Advance Payment (₹)</Label>
                  <Input
                    id="advancePayment"
                    type="number"
                    placeholder="Enter advance amount"
                    value={formData.advancePayment}
                    onChange={(e) => handleInputChange("advancePayment", e.target.value)}
                  />
                </div>
              </div>

              {/* Payment Summary */}
              {(formData.rentAmount || formData.securityDeposit) && (
                <Card className="bg-primary/5 border-primary/20">
                  <CardContent className="p-4">
                    <h3 className="font-medium mb-3">Payment Summary</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Monthly Rent:</span>
                        <span className="font-medium">₹{formData.rentAmount || 0}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Security Deposit:</span>
                        <span className="font-medium">₹{formData.securityDeposit || 0}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Advance Payment:</span>
                        <span className="font-medium">₹{formData.advancePayment || 0}</span>
                      </div>
                      <div className="border-t pt-2 flex justify-between font-semibold">
                        <span>Total Initial Payment:</span>
                        <span>
                          ₹
                          {(
                            Number(formData.rentAmount || 0) +
                            Number(formData.securityDeposit || 0) +
                            Number(formData.advancePayment || 0)
                          ).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          )}

          {/* Step 5: Documents */}
          {currentStep === 5 && (
            <div className="space-y-6">
              <div className="flex items-center gap-2 mb-4">
                <FileText className="h-5 w-5 text-primary" />
                <h2 className="text-lg font-semibold">Document Verification</h2>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="idProofType">ID Proof Type *</Label>
                  <Select
                    value={formData.idProofType}
                    onValueChange={(value) => handleInputChange("idProofType", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select ID type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="aadhar">Aadhar Card</SelectItem>
                      <SelectItem value="pan">PAN Card</SelectItem>
                      <SelectItem value="passport">Passport</SelectItem>
                      <SelectItem value="driving">Driving License</SelectItem>
                      <SelectItem value="voter">Voter ID</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="idProofNumber">ID Number *</Label>
                  <Input
                    id="idProofNumber"
                    placeholder="Enter ID number"
                    value={formData.idProofNumber}
                    onChange={(e) => handleInputChange("idProofNumber", e.target.value)}
                  />
                </div>
              </div>

              {/* Document Upload Areas */}
              <div className="grid gap-4 md:grid-cols-2">
                <Card className="border-dashed">
                  <CardContent className="p-6 text-center">
                    <Upload className="h-10 w-10 mx-auto text-muted-foreground mb-3" />
                    <p className="font-medium">ID Proof Document</p>
                    <p className="text-sm text-muted-foreground mb-3">
                      Upload front & back of ID card
                    </p>
                    <Button variant="outline" size="sm">
                      <Upload className="h-4 w-4 mr-2" />
                      Upload Document
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border-dashed">
                  <CardContent className="p-6 text-center">
                    <Upload className="h-10 w-10 mx-auto text-muted-foreground mb-3" />
                    <p className="font-medium">Passport Photo</p>
                    <p className="text-sm text-muted-foreground mb-3">
                      Upload recent passport size photo
                    </p>
                    <Button variant="outline" size="sm">
                      <Upload className="h-4 w-4 mr-2" />
                      Upload Photo
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border-dashed">
                  <CardContent className="p-6 text-center">
                    <Upload className="h-10 w-10 mx-auto text-muted-foreground mb-3" />
                    <p className="font-medium">Address Proof</p>
                    <p className="text-sm text-muted-foreground mb-3">
                      Upload utility bill or bank statement
                    </p>
                    <Button variant="outline" size="sm">
                      <Upload className="h-4 w-4 mr-2" />
                      Upload Document
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border-dashed">
                  <CardContent className="p-6 text-center">
                    <Upload className="h-10 w-10 mx-auto text-muted-foreground mb-3" />
                    <p className="font-medium">College/Office ID</p>
                    <p className="text-sm text-muted-foreground mb-3">
                      Upload institution ID card
                    </p>
                    <Button variant="outline" size="sm">
                      <Upload className="h-4 w-4 mr-2" />
                      Upload Document
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {/* Step 6: Review */}
          {currentStep === 6 && (
            <div className="space-y-6">
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle className="h-5 w-5 text-primary" />
                <h2 className="text-lg font-semibold">Review & Confirm</h2>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                {/* Personal Details Summary */}
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium flex items-center gap-2">
                      <User className="h-4 w-4" />
                      Personal Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Name:</span>
                      <span>{formData.fullName || "-"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Email:</span>
                      <span>{formData.email || "-"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Mobile:</span>
                      <span>{formData.mobile || "-"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Occupation:</span>
                      <span className="capitalize">{formData.occupation || "-"}</span>
                    </div>
                  </CardContent>
                </Card>

                {/* Room Allocation Summary */}
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium flex items-center gap-2">
                      <Building className="h-4 w-4" />
                      Room Allocation
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Room:</span>
                      <span>{formData.roomNumber || "-"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Bed:</span>
                      <span>{formData.bedNumber || "-"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Floor:</span>
                      <span>{formData.floor || "-"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Type:</span>
                      <span>{formData.sharingType || "-"}</span>
                    </div>
                  </CardContent>
                </Card>

                {/* Payment Summary */}
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium flex items-center gap-2">
                      <CreditCard className="h-4 w-4" />
                      Payment Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Join Date:</span>
                      <span>{formData.joinDate || "-"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Monthly Rent:</span>
                      <span>₹{formData.rentAmount || 0}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Security Deposit:</span>
                      <span>₹{formData.securityDeposit || 0}</span>
                    </div>
                    <div className="flex justify-between font-medium">
                      <span>Total Initial:</span>
                      <span>
                        ₹
                        {(
                          Number(formData.rentAmount || 0) +
                          Number(formData.securityDeposit || 0) +
                          Number(formData.advancePayment || 0)
                        ).toLocaleString()}
                      </span>
                    </div>
                  </CardContent>
                </Card>

                {/* Documents Summary */}
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      Documents
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">ID Type:</span>
                      <span className="capitalize">{formData.idProofType || "-"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">ID Number:</span>
                      <span>{formData.idProofNumber || "-"}</span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Terms Agreement */}
              <Card className="bg-muted/50">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <Checkbox
                      id="agreeTerms"
                      checked={formData.agreeTerms as boolean}
                      onCheckedChange={(checked) =>
                        handleInputChange("agreeTerms", checked as boolean)
                      }
                    />
                    <div>
                      <Label htmlFor="agreeTerms" className="cursor-pointer">
                        I confirm that all the information provided is accurate and the tenant has
                        agreed to the PG rules and policies.
                      </Label>
                      <p className="text-xs text-muted-foreground mt-1">
                        By checking this, you confirm that necessary documents have been verified.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-6 border-t mt-6">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 1}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>

            {currentStep < 6 ? (
              <Button onClick={handleNext}>
                Next
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={!formData.agreeTerms}
                className="bg-green-600 hover:bg-green-700"
              >
                <Save className="h-4 w-4 mr-2" />
                Add Tenant
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

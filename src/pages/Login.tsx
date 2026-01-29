import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Building2, Users, Lock, Mail, KeyRound, ArrowRight, Shield, Cloud, Zap } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState<string>("");
  const [showOtp, setShowOtp] = useState(false);
  const [otp, setOtp] = useState(["", "", "", ""]);

  const handleOtpChange = (index: number, value: string) => {
    if (value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      
      // Auto-focus next input
      if (value && index < 3) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        nextInput?.focus();
      }
    }
  };

  const handleSendOtp = () => {
    setShowOtp(true);
  };

  const handleLogin = () => {
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Hero Section */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-72 h-72 bg-accent rounded-full blur-3xl animate-pulse-soft" />
          <div className="absolute bottom-40 right-20 w-96 h-96 bg-primary-foreground rounded-full blur-3xl animate-pulse-soft" style={{ animationDelay: "1s" }} />
        </div>
        
        <div className="relative z-10 flex flex-col justify-center px-12 xl:px-20">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center">
                <Building2 className="w-7 h-7 text-accent-foreground" />
              </div>
              <span className="text-2xl font-display font-bold text-primary-foreground">
                Hostel / PG System
              </span>
            </div>
            <h1 className="text-4xl xl:text-5xl font-display font-bold text-primary-foreground leading-tight mb-4">
              Manage Hostels & PGs
              <br />
              <span className="text-accent">Smarter & Faster</span>
            </h1>
            <p className="text-lg text-primary-foreground/70 max-w-md">
              Your intelligent command center for managing properties, tenants, and payments all in one place.
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-4 text-primary-foreground/80">
              <div className="w-10 h-10 bg-primary-foreground/10 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5" />
              </div>
              <span>Secure OTP Login</span>
            </div>
            <div className="flex items-center gap-4 text-primary-foreground/80">
              <div className="w-10 h-10 bg-primary-foreground/10 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5" />
              </div>
              <span>Role-Based Access</span>
            </div>
            <div className="flex items-center gap-4 text-primary-foreground/80">
              <div className="w-10 h-10 bg-primary-foreground/10 rounded-lg flex items-center justify-center">
                <Cloud className="w-5 h-5" />
              </div>
              <span>Cloud-Based Platform</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center gap-3 mb-8 justify-center">
            <div className="w-10 h-10 bg-accent rounded-xl flex items-center justify-center">
              <Building2 className="w-6 h-6 text-accent-foreground" />
            </div>
            <span className="text-xl font-display font-bold text-foreground">
              Hostel / PG System
            </span>
          </div>

          <div className="text-center mb-8">
            <h2 className="text-3xl font-display font-bold text-foreground mb-2">
              Welcome Back
            </h2>
            <p className="text-muted-foreground">
              Login to your account
            </p>
          </div>

          <Card className="border-0 shadow-elevated">
            <CardContent className="p-6 space-y-6">
              {/* Role Selection */}
              <div className="space-y-2">
                <Label htmlFor="role" className="text-sm font-medium">
                  Select Role
                </Label>
                <Select value={role} onValueChange={setRole}>
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Choose your role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tenant">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        Tenant
                      </div>
                    </SelectItem>
                    <SelectItem value="owner">
                      <div className="flex items-center gap-2">
                        <Building2 className="w-4 h-4" />
                        Hostel / PG Owner
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Username */}
              <div className="space-y-2">
                <Label htmlFor="username" className="text-sm font-medium">
                  Username
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="username"
                    type="text"
                    placeholder="Enter your username"
                    className="h-12 pl-10"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    className="h-12 pl-10"
                  />
                </div>
              </div>

              {/* OTP Section */}
              {!showOtp ? (
                <Button
                  variant="secondary"
                  className="w-full h-12"
                  onClick={handleSendOtp}
                >
                  <KeyRound className="w-4 h-4 mr-2" />
                  Send OTP
                </Button>
              ) : (
                <div className="space-y-4 animate-fade-in">
                  <Label className="text-sm font-medium">
                    Enter OTP
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    OTP sent to your registered email or mobile
                  </p>
                  <div className="flex gap-3 justify-center">
                    {otp.map((digit, index) => (
                      <Input
                        key={index}
                        id={`otp-${index}`}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleOtpChange(index, e.target.value)}
                        className="w-14 h-14 text-center text-xl font-semibold"
                      />
                    ))}
                  </div>
                  <p className="text-xs text-center text-muted-foreground">
                    OTP valid for 1 minute. <button className="text-accent hover:underline">Resend OTP</button>
                  </p>
                </div>
              )}

              {/* Login Button */}
              <Button
                variant="hero"
                className="w-full h-12"
                onClick={handleLogin}
              >
                Login
                <ArrowRight className="w-4 h-4" />
              </Button>

              {/* Links */}
              <div className="flex items-center justify-between text-sm">
                <a href="#" className="text-muted-foreground hover:text-accent transition-colors">
                  Forgot Password?
                </a>
                <a href="#" className="text-muted-foreground hover:text-accent transition-colors">
                  Forgot Username?
                </a>
              </div>

              <div className="text-center pt-4 border-t border-border">
                <p className="text-sm text-muted-foreground">
                  New User?{" "}
                  <button className="text-accent font-medium hover:underline">
                    Register Now
                  </button>
                </p>
              </div>
            </CardContent>
          </Card>

          <p className="text-center text-xs text-muted-foreground mt-8">
            © 2025 Hostel / PG Management System · Secure · Reliable · Cloud-Based
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

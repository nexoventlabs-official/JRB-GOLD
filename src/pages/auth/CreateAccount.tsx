import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { User, Mail, Lock, Phone, ArrowRight, Eye, EyeOff, UserPlus, Shield, Check, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const CreateAccount = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [acceptMarketing, setAcceptMarketing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Calculate password strength
    if (name === 'password') {
      calculatePasswordStrength(value);
    }
  };

  const calculatePasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength += 25;
    if (/[A-Z]/.test(password)) strength += 25;
    if (/[0-9]/.test(password)) strength += 25;
    if (/[^A-Za-z0-9]/.test(password)) strength += 25;
    setPasswordStrength(strength);
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength < 50) return 'bg-red-500';
    if (passwordStrength < 75) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength < 25) return 'Very Weak';
    if (passwordStrength < 50) return 'Weak';
    if (passwordStrength < 75) return 'Good';
    return 'Strong';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "Passwords don't match. Please try again.",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    // Validate password strength
    if (passwordStrength < 75) {
      toast({
        title: "Weak Password",
        description: "Please choose a stronger password for better security.",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    // Validate terms accepted
    if (!acceptTerms) {
      toast({
        title: "Terms Required",
        description: "Please accept the terms and conditions to continue.",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock account creation - store user data
      localStorage.setItem('authToken', 'mock-jwt-token');
      localStorage.setItem('userName', `${formData.firstName} ${formData.lastName}`);
      localStorage.setItem('userEmail', formData.email);
      localStorage.setItem('userPhone', formData.phone);
      
      toast({
        title: "Account Created!",
        description: "Welcome to JRB Gold! Your account has been created successfully.",
      });
      
      navigate('/');
    } catch (error) {
      toast({
        title: "Account Creation Failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-ivory via-background to-slate/5 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg w-full">
        <Card className="shadow-luxury border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="text-center space-y-2 pb-8">
            <div className="mx-auto w-12 h-12 bg-gradient-gold rounded-full flex items-center justify-center mb-4">
              <UserPlus className="h-6 w-6 text-charcoal" />
            </div>
            <CardTitle className="text-3xl font-playfair text-charcoal">
              Create Account
            </CardTitle>
            <CardDescription className="text-slate">
              Join JRB Gold and unlock exclusive jewelry collections
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-sm font-medium text-charcoal">
                    First Name
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate" />
                    <Input
                      id="firstName"
                      name="firstName"
                      type="text"
                      required
                      className="pl-10 h-12 border-border/50 focus:border-gold focus:ring-gold/20"
                      placeholder="First name"
                      value={formData.firstName}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-sm font-medium text-charcoal">
                    Last Name
                  </Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    type="text"
                    required
                    className="h-12 border-border/50 focus:border-gold focus:ring-gold/20"
                    placeholder="Last name"
                    value={formData.lastName}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-charcoal">
                  Email Address
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="pl-10 h-12 border-border/50 focus:border-gold focus:ring-gold/20"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-sm font-medium text-charcoal">
                  Phone Number
                </Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate" />
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    className="pl-10 h-12 border-border/50 focus:border-gold focus:ring-gold/20"
                    placeholder="Enter your phone number"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-charcoal">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate" />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    required
                    className="pl-10 pr-10 h-12 border-border/50 focus:border-gold focus:ring-gold/20"
                    placeholder="Create a strong password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-slate" />
                    ) : (
                      <Eye className="h-4 w-4 text-slate" />
                    )}
                  </Button>
                </div>
                {formData.password && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate">Password Strength</span>
                      <span className={`font-medium ${
                        passwordStrength < 50 ? 'text-red-600' : 
                        passwordStrength < 75 ? 'text-yellow-600' : 'text-green-600'
                      }`}>
                        {getPasswordStrengthText()}
                      </span>
                    </div>
                    <Progress value={passwordStrength} className={`h-2 ${getPasswordStrengthColor()}`} />
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-sm font-medium text-charcoal">
                  Confirm Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate" />
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    required
                    className="pl-10 pr-10 h-12 border-border/50 focus:border-gold focus:ring-gold/20"
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4 text-slate" />
                    ) : (
                      <Eye className="h-4 w-4 text-slate" />
                    )}
                  </Button>
                </div>
                {formData.confirmPassword && (
                  <div className="flex items-center text-xs mt-1">
                    {formData.password === formData.confirmPassword ? (
                      <><Check className="h-3 w-3 text-green-600 mr-1" /><span className="text-green-600">Passwords match</span></>
                    ) : (
                      <><X className="h-3 w-3 text-red-600 mr-1" /><span className="text-red-600">Passwords don't match</span></>
                    )}
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Checkbox 
                    id="terms" 
                    checked={acceptTerms}
                    onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
                    className="mt-1"
                  />
                  <Label htmlFor="terms" className="text-sm text-charcoal leading-relaxed cursor-pointer">
                    I agree to the{' '}
                    <Link to="/terms" className="text-gold hover:text-gold-dark font-medium underline">
                      Terms of Service
                    </Link>{' '}
                    and{' '}
                    <Link to="/privacy" className="text-gold hover:text-gold-dark font-medium underline">
                      Privacy Policy
                    </Link>
                  </Label>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Checkbox 
                    id="marketing" 
                    checked={acceptMarketing}
                    onCheckedChange={(checked) => setAcceptMarketing(checked as boolean)}
                    className="mt-1"
                  />
                  <Label htmlFor="marketing" className="text-sm text-slate leading-relaxed cursor-pointer">
                    I'd like to receive exclusive offers and jewelry collection updates via email
                  </Label>
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full h-12 bg-gradient-gold hover:shadow-luxury text-charcoal font-semibold transition-all duration-300"
                disabled={isLoading || !acceptTerms}
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-charcoal mr-2"></div>
                    Creating Account...
                  </>
                ) : (
                  <>
                    Create Account
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </form>

            <div className="text-center pt-4">
              <p className="text-sm text-slate">
                Already have an account?{' '}
                <Link to="/signin" className="font-semibold text-gold hover:text-gold-dark transition-colors">
                  Sign In
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CreateAccount;

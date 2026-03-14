import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, FileText, Phone, Mail, MapPin, ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const RePledgeTransfer = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    currentBank: '',
    loanAmount: '',
    goldWeight: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
    alert('Thank you! We will contact you within 24 hours to discuss your re-pledge transfer.');
  };

  const benefits = [
    {
      title: "Lower Interest Rates",
      description: "Get competitive interest rates starting from 0.75% per month",
      icon: <CheckCircle className="h-6 w-6 text-green-600" />
    },
    {
      title: "Quick Processing",
      description: "Complete transfer within 24-48 hours with minimal documentation",
      icon: <Clock className="h-6 w-6 text-blue-600" />
    },
    {
      title: "No Hidden Charges",
      description: "Transparent pricing with no processing fees or hidden costs",
      icon: <FileText className="h-6 w-6 text-purple-600" />
    }
  ];

  const process = [
    "Submit your current loan details",
    "Our team evaluates your gold and loan amount",
    "We provide you with better terms and rates",
    "Complete documentation and transfer process",
    "Enjoy lower EMIs and better service"
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-playfair text-foreground mb-4">
            Re-Pledge Transfer Service
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-6">
            Transfer your existing gold loan to JRB Gold and enjoy better interest rates,
            flexible terms, and exceptional customer service.
          </p>
          <div className="divider-gold mx-auto max-w-24" />
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Benefits Section */}
          <div>
            <h2 className="text-3xl font-playfair text-foreground mb-8">Why Transfer to JRB Gold?</h2>
            <div className="space-y-6">
              {benefits.map((benefit, index) => (
                <Card key={index} className="card-luxury">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        {benefit.icon}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">
                          {benefit.title}
                        </h3>
                        <p className="text-muted-foreground">
                          {benefit.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Interest Rate Comparison */}
            <Card className="card-luxury mt-8">
              <CardHeader>
                <CardTitle className="text-xl font-playfair">Interest Rate Comparison</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                    <span className="text-sm font-medium">Other Banks/NBFCs</span>
                    <Badge variant="destructive">1.5% - 2.5% per month</Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                    <span className="text-sm font-medium">JRB Gold</span>
                    <Badge className="bg-green-600 hover:bg-green-700">0.75% - 1.25% per month</Badge>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-4">
                  *Interest rates are subject to gold purity, loan amount, and tenure
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Application Form */}
          <div>
            <Card className="card-luxury">
              <CardHeader>
                <CardTitle className="text-2xl font-playfair">Apply for Re-Pledge Transfer</CardTitle>
                <p className="text-muted-foreground">
                  Fill out the form below and our team will contact you within 24 hours
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">
                        Full Name *
                      </label>
                      <Input
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Enter your full name"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">
                        Phone Number *
                      </label>
                      <Input
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="Enter your phone number"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Email Address
                    </label>
                    <Input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Enter your email address"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">
                        Current Bank/NBFC *
                      </label>
                      <Input
                        name="currentBank"
                        value={formData.currentBank}
                        onChange={handleInputChange}
                        placeholder="e.g., HDFC Bank, Bajaj Finance"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">
                        Current Loan Amount *
                      </label>
                      <Input
                        name="loanAmount"
                        value={formData.loanAmount}
                        onChange={handleInputChange}
                        placeholder="₹ Enter loan amount"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Approximate Gold Weight (grams)
                    </label>
                    <Input
                      name="goldWeight"
                      value={formData.goldWeight}
                      onChange={handleInputChange}
                      placeholder="Enter gold weight in grams"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Additional Message
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Any specific requirements or questions..."
                      className="w-full p-3 border border-input rounded-md resize-none h-20"
                    />
                  </div>

                  <Button type="submit" className="w-full" style={{ backgroundColor: 'rgb(202, 138, 4)' }}>
                    Submit Application
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Process Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-playfair text-foreground text-center mb-8">
            Simple Transfer Process
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {process.map((step, index) => (
              <div key={index} className="text-center">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg mx-auto mb-4"
                  style={{ backgroundColor: 'rgb(202, 138, 4)' }}
                >
                  {index + 1}
                </div>
                <p className="text-sm text-muted-foreground">{step}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Section */}
        <Card className="card-luxury">
          <CardHeader>
            <CardTitle className="text-2xl font-playfair text-center">
              Need Immediate Assistance?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div className="flex flex-col items-center space-y-2">
                <Phone className="h-8 w-8" style={{ color: 'rgb(202, 138, 4)' }} />
                <h3 className="font-semibold text-foreground">Call Us</h3>
                <p className="text-muted-foreground">82204 21317</p>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <Mail className="h-8 w-8" style={{ color: 'rgb(202, 138, 4)' }} />
                <h3 className="font-semibold text-foreground">Email Us</h3>
                <p className="text-muted-foreground">inforjrb@gmail.com</p>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <MapPin className="h-8 w-8" style={{ color: 'rgb(202, 138, 4)' }} />
                <h3 className="font-semibold text-foreground">Visit Us</h3>
                <p className="text-muted-foreground text-sm">
                  No: 1539, 1st Floor, Soundar Complex<br />
                  Vellore Road, Thiruvannamalai
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
};

export default RePledgeTransfer;

import { useState } from "react";
import { Phone, Mail, MapPin, Clock, MessageCircle, Send, CheckCircle, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const contactInfo = [
    {
      icon: Phone,
      title: 'Phone',
      primary: '+91 82204 21317',
      secondary: '',
      description: 'Call us for immediate assistance',
    },
    {
      icon: Mail,
      title: 'Email',
      primary: 'jrbgoldprivateltd@gmail.com',
      secondary: 'inforjrb@gmail.com',
      description: 'Send us your queries anytime',
    },
    {
      icon: MapPin,
      title: 'Visit Our Store',
      primary: 'Flagship Store',
      secondary: (
        <a
          href="/location"
          className="hover:text-gold transition-colors duration-200"
        >
          No: 1539, 1st Floor, Soundar Complex, Vellore Road<br />
          Near Anna Arch<br />
          Thiruvannamalai<br />
          Tamil Nadu - 606604
        </a>
      ),
      description: 'Experience our premium collection',
      action: 'Get Directions',
      actionLink: 'https://www.google.com/maps/search/?api=1&query=12.2238,79.0746',
      isJSX: true,
    },
    {
      icon: Clock,
      title: 'Business Hours',
      primary: 'Mon - Sat: 10:00 AM - 8:00 PM',
      secondary: 'Sunday: 11:00 AM - 6:00 PM',
      description: 'We are here when you need us',
    },
  ];

  const departments = [
    { value: 'general', label: 'General Inquiry' },
    { value: 'sales', label: 'Sales & Products' },
    { value: 'exchange', label: 'Gold Exchange' },

    { value: 'services', label: 'Services' },
    { value: 'support', label: 'Customer Support' },
  ];

  const quickLinks = [
    { title: 'Gold Exchange Calculator', description: 'Check current exchange rates', action: 'Calculate Now' },

    { title: 'Product Catalog', description: 'Browse our jewelry collection', action: 'View Catalog' },
    { title: 'Store Visit', description: 'Schedule an appointment', action: 'Book Now' },
  ];

  const faqs = [
    {
      question: 'What are your current gold rates?',
      answer: 'Our gold rates are updated daily based on market prices. Current 22k rate is ₹14,530/g. Please call for exact rates as they change throughout the day.'
    },
    {
      question: 'Do you provide home delivery?',
      answer: 'Yes, we provide secure home delivery for purchases above ₹25,000 within Mumbai. Delivery charges may apply for other locations.'
    },
    {
      question: 'What documents do I need for gold exchange?',
      answer: 'You need a valid ID proof (Aadhar/PAN/Passport) and the original purchase receipt if available. We accept jewelry without receipts too.'
    },

  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Message Sent Successfully!",
        description: "We'll get back to you within 24 hours.",
      });
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    }, 2000);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="bg-gradient-surface py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h1 className="text-hero font-playfair text-foreground mb-4">
                Contact Us
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Get in touch with our expert team for personalized assistance with all your
                jewelry needs, from purchases to services and everything in between.
              </p>
              <div className="divider-gold mt-6 max-w-24 mx-auto" />
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
              <div className="text-center">
                <div className="text-3xl font-bold text-gold mb-2">&lt; 2hrs</div>
                <div className="text-muted-foreground text-sm">Response Time</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gold mb-2">24/7</div>
                <div className="text-muted-foreground text-sm">WhatsApp Support</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gold mb-2">99%</div>
                <div className="text-muted-foreground text-sm">Issue Resolution</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gold mb-2">5-Star</div>
                <div className="text-muted-foreground text-sm">Customer Service</div>
              </div>
            </div>

            {/* Trending Products Search */}
            <div className="bg-white rounded-xl shadow-lg p-8 mb-12 border border-gray-100">
              <h2 className="text-3xl font-playfair font-bold text-gray-900 mb-3">Trending Products</h2>
              <p className="text-gray-600 text-base mb-8">Search and explore our most popular jewelry collections</p>

              <div className="relative max-w-2xl mx-auto">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                  type="text"
                  placeholder="Search trending products..."
                  className="block w-full pl-10 pr-3 py-4 text-base border-2 border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-all duration-200"
                />
              </div>

              <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  'Gold Bangles',
                  'Diamond Rings',
                  'Temple Jewelry',
                  'Antique Necklaces'
                ].map((category, index) => (
                  <div
                    key={index}
                    className="border border-gray-200 rounded-lg p-3 text-center cursor-pointer hover:bg-gray-50 transition-colors"
                  >
                    <div className="text-sm font-medium text-foreground">{category}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Contact Information */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {contactInfo.map((info, index) => (
                <Card key={index} className="card-luxury text-center bg-white shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-200">
                  <CardContent className="p-6">
                    <div className="w-16 h-16 bg-gradient-gold rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                      <info.icon className="h-8 w-8 text-charcoal" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-800 mb-3">
                      {info.title}
                    </h3>
                    <div className="space-y-2 mb-4">
                      <div className="font-semibold text-gray-900 text-base">{info.primary}</div>
                      <div className="text-sm text-gray-700">
                        {info.isJSX ? info.secondary : info.secondary}
                      </div>
                    </div>
                    {info.action && info.actionLink && (
                      <a
                        href={info.actionLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center px-4 py-2 bg-gold text-white rounded-md hover:bg-amber-600 transition-colors duration-200 text-sm font-medium shadow-sm"
                      >
                        {info.action}
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </a>
                    )}
                    <p className="text-xs text-gray-500 mt-3">
                      {info.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Main Contact Form & Map Section */}
        <section className="py-16 bg-gradient-surface">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div>
                <Card className="card-luxury">
                  <CardHeader>
                    <CardTitle className="text-title font-playfair text-foreground">
                      Send Us a Message
                    </CardTitle>
                    <p className="text-muted-foreground">
                      Fill out the form below and we'll get back to you within 24 hours
                    </p>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="name">Full Name *</Label>
                          <Input
                            id="name"
                            value={formData.name}
                            onChange={(e) => handleInputChange('name', e.target.value)}
                            required
                            placeholder="Enter your full name"
                          />
                        </div>
                        <div>
                          <Label htmlFor="phone">Phone Number *</Label>
                          <Input
                            id="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => handleInputChange('phone', e.target.value)}
                            required
                            placeholder="+91 82204 21317"
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          required
                          placeholder="your.email@example.com"
                        />
                      </div>

                      <div>
                        <Label htmlFor="subject">Department</Label>
                        <Select
                          value={formData.subject}
                          onValueChange={(value) => handleInputChange('subject', value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select department" />
                          </SelectTrigger>
                          <SelectContent>
                            {departments.map((dept) => (
                              <SelectItem key={dept.value} value={dept.value}>
                                {dept.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="message">Message *</Label>
                        <Textarea
                          id="message"
                          value={formData.message}
                          onChange={(e) => handleInputChange('message', e.target.value)}
                          required
                          placeholder="Tell us how we can help you..."
                          rows={5}
                        />
                      </div>

                      <Button
                        type="submit"
                        className="w-full"
                        variant="hero"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-charcoal mr-2" />
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send className="h-4 w-4 mr-2" />
                            Send Message
                          </>
                        )}
                      </Button>

                      <p className="text-xs text-muted-foreground text-center">
                        By submitting this form, you agree to our privacy policy and terms of service.
                      </p>
                    </form>
                  </CardContent>
                </Card>
              </div>

              {/* Map & Store Info */}
              <div className="space-y-6">
                {/* Store Map */}
                <Card className="card-luxury">
                  <CardContent className="p-0">
                    <div className="h-64 bg-gradient-to-br from-gold/20 to-gold/5 flex items-center justify-center rounded-lg">
                      <div className="text-center">
                        <MapPin className="h-12 w-12 text-gold mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-foreground mb-2">
                          Visit Our Flagship Store
                        </h3>
                        <p className="text-muted-foreground text-sm">
                          No: 1539, 1st Floor,
                          Soundar Complex, Vellore Road<br />
                          Near Anna Arch
                          Thiruvannamalai
                          Tamil Nadu - 606604
                        </p>
                        <Button variant="outline-gold" size="sm" className="mt-4">
                          Get Directions
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card className="card-luxury">
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold text-foreground">
                      Quick Actions
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {quickLinks.map((link, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                        <div>
                          <div className="font-medium text-foreground text-sm">{link.title}</div>
                          <div className="text-xs text-muted-foreground">{link.description}</div>
                        </div>
                        <Button size="sm" variant="outline-gold">
                          {link.action}
                        </Button>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* WhatsApp Contact */}
                <Card className="card-luxury bg-gradient-to-r from-green-50 to-green-100 border-green-200">
                  <CardContent className="p-6 text-center">
                    <MessageCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-green-800 mb-2">
                      WhatsApp Support
                    </h3>
                    <p className="text-green-700 text-sm mb-4">
                      Get instant answers to your queries on WhatsApp
                    </p>
                    <Button className="bg-green-600 hover:bg-green-700 text-white">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Chat on WhatsApp
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-display font-playfair text-foreground mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-lg text-muted-foreground">
                Quick answers to common questions
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {faqs.map((faq, index) => (
                <Card key={index} className="card-luxury">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-foreground mb-3 flex items-start">
                      <CheckCircle className="h-5 w-5 text-gold mr-2 mt-0.5 flex-shrink-0" />
                      {faq.question}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed pl-7">
                      {faq.answer}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Emergency Contact Section */}
        <section className="py-16 bg-ink text-ivory">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-display font-playfair text-ivory mb-4">
              Need Immediate Assistance?
            </h2>
            <p className="text-lg text-ivory/80 mb-8">
              Our customer support team is available to help you with urgent queries and assistance
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-ivory/10 p-6 rounded-lg border border-ivory/20">
                <Phone className="h-8 w-8 text-gold mx-auto mb-3" />
                <h3 className="font-semibold text-ivory mb-2">Emergency Helpline</h3>
                <p className="text-ivory/80 text-sm mb-3">Available 24/7 for urgent matters</p>
                <Button variant="outline-gold" size="sm">
                  Call Now
                </Button>
              </div>

              <div className="bg-ivory/10 p-6 rounded-lg border border-ivory/20">
                <MessageCircle className="h-8 w-8 text-gold mx-auto mb-3" />
                <h3 className="font-semibold text-ivory mb-2">Live Chat</h3>
                <p className="text-ivory/80 text-sm mb-3">Instant support during business hours</p>
                <Button variant="outline-gold" size="sm">
                  Start Chat
                </Button>
              </div>

              <div className="bg-ivory/10 p-6 rounded-lg border border-ivory/20">
                <Mail className="h-8 w-8 text-gold mx-auto mb-3" />
                <h3 className="font-semibold text-ivory mb-2">Priority Email</h3>
                <p className="text-ivory/80 text-sm mb-3">Guaranteed response within 2 hours</p>
                <Button variant="outline-gold" size="sm">
                  Send Email
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
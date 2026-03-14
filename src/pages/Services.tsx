import { useState } from "react";
import { RefreshCw, Banknote, TrendingUp, GraduationCap, Calculator, FileText, Shield, Clock, CheckCircle, ArrowRight, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Services = () => {
  const [selectedService, setSelectedService] = useState<string>('');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: '',
    goldWeight: '',
    message: '',
  });

  const services = [
    {
      id: 'exchange',
      icon: RefreshCw,
      title: 'Exchange Old Gold',
      subtitle: 'Get Maximum Value for Your Old Jewelry',
      description: 'Transform your old, unused gold jewelry into beautiful new pieces at today\'s market rates with complete transparency.',
      features: [
        'Today\'s market rate guaranteed',
        'Free evaluation by certified appraisers',
        'No hidden deductions',
        'Instant cash option available',
        'Exchange for new jewelry',
      ],
      process: [
        'Bring your old gold jewelry to our store',
        'Free evaluation by certified gemologist',
        'Get quote based on current market rates',
        'Choose cash payment or exchange credit',
        'Complete transaction instantly'
      ],
      documents: ['ID Proof', 'Purchase receipt (if available)', 'Gold jewelry items'],
      timeframe: 'Same day processing',
      minWeight: '1 gram',
    },

    {
      id: 'bonds',
      icon: TrendingUp,
      title: 'Gold Bonds Investment',
      subtitle: 'Government-Backed Gold Securities',
      description: 'Invest in Sovereign Gold Bonds (SGBs) - a safe and profitable way to invest in gold without physical storage.',
      features: [
        'Government of India backed security',
        '2.5% annual interest on invested amount',
        'Capital gains tax exemption on maturity',
        'Can be used as collateral for loans',
        'Tradeable on stock exchanges',
      ],
      process: [
        'Choose investment amount (min 1 gram)',
        'Complete KYC documentation',
        'Make payment via bank transfer',
        'Receive bond certificate',
        'Earn annual interest + gold appreciation'
      ],
      documents: ['PAN Card', 'KYC documents', 'Bank account details', 'Nomination form'],
      timeframe: 'Next available tranche',
      minAmount: 'Equivalent to 1 gram of gold',
    },
    {
      id: 'training',
      icon: GraduationCap,
      title: 'Appraiser Training',
      subtitle: 'Professional Jewelry Evaluation Certification',
      description: 'Learn the art and science of jewelry appraisal from certified experts. Build a career in the jewelry industry.',
      features: [
        'Certified professional course',
        'Hands-on training with real jewelry',
        'Learn gold/silver testing techniques',
        'Gemstone identification skills',
        'Job placement assistance',
      ],
      process: [
        'Submit application with qualifications',
        'Attend orientation session',
        'Complete theoretical modules',
        'Practical training workshops',
        'Final examination and certification'
      ],
      documents: ['Educational certificates', 'ID proof', 'Passport photos', 'Application form'],
      timeframe: '6-8 weeks course duration',
      eligibility: 'Minimum 12th grade education',
    },
  ];

  const benefits = [
    {
      icon: Shield,
      title: 'Trusted & Secure',
      description: 'All transactions are secure with proper documentation and certified processes',
    },
    {
      icon: Calculator,
      title: 'Transparent Pricing',
      description: 'No hidden charges, all rates clearly displayed and explained',
    },
    {
      icon: Clock,
      title: 'Quick Processing',
      description: 'Fast turnaround times with efficient service delivery',
    },
    {
      icon: CheckCircle,
      title: 'Certified Experts',
      description: 'All evaluations done by certified gemologists and appraisers',
    },
  ];

  const faqs = {
    exchange: [
      {
        question: 'How is the exchange rate calculated?',
        answer: 'Exchange rate is based on the current market rate of gold on the day of transaction. We provide the live rates and calculate based on the purity and weight of your gold after testing.'
      },
      {
        question: 'What types of gold jewelry can I exchange?',
        answer: 'We accept all types of gold jewelry including rings, necklaces, bangles, coins, and ornaments. The jewelry should be genuine gold (not gold-plated).'
      },
      {
        question: 'Is there any deduction in the exchange value?',
        answer: 'We follow a transparent pricing policy with minimal deductions only for wastage removal if applicable. All deductions are clearly explained before the transaction.'
      }
    ],

    bonds: [
      {
        question: 'When can I redeem my gold bonds?',
        answer: 'Gold bonds have a tenure of 8 years with an option to exit after 5 years. You can also trade them on stock exchanges before maturity.'
      },
      {
        question: 'How is the interest paid?',
        answer: 'Interest at 2.5% per annum is paid semi-annually on the initial investment amount, credited directly to your registered bank account.'
      },
      {
        question: 'What happens at maturity?',
        answer: 'At maturity, you receive the current market value of gold equivalent to your investment. Capital gains on maturity are tax-exempt.'
      }
    ],
    training: [
      {
        question: 'What job opportunities are available after certification?',
        answer: 'Certified appraisers can work with jewelry stores, banks, insurance companies, auction houses, and as independent consultants. We provide placement assistance.'
      },
      {
        question: 'Is the certification nationally recognized?',
        answer: 'Yes, our certification is recognized across India and accepted by major jewelry retailers, financial institutions, and insurance companies.'
      },
      {
        question: 'Can I start my own appraisal business?',
        answer: 'Absolutely! Many of our graduates have started successful independent appraisal businesses. We provide guidance on business setup and certification requirements.'
      }
    ]
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Enquiry submitted:', formData);
  };

  const openServiceEnquiry = (serviceId: string) => {
    setSelectedService(serviceId);
    setFormData(prev => ({ ...prev, service: serviceId }));
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Add anchor point for exchange section */}
      <div id="exchange" className="relative -top-20"></div>

      <main>
        {/* Hero Section */}
        <section className="bg-gradient-surface py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h1 className="text-hero font-playfair text-foreground mb-4">
                Our Services
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Comprehensive jewelry and gold investment services designed to maximize value
                and provide secure, transparent solutions for all your precious metal needs.
              </p>
              <div className="divider-gold mt-6 max-w-24 mx-auto" />
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-gold mb-2">15,000+</div>
                <div className="text-muted-foreground text-sm">Successful Exchanges</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gold mb-2">₹100Cr+</div>
                <div className="text-muted-foreground text-sm">Gold Transactions</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gold mb-2">500+</div>
                <div className="text-muted-foreground text-sm">Certified Appraisers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gold mb-2">99%</div>
                <div className="text-muted-foreground text-sm">Customer Satisfaction</div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Detail Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-16">
              {services.map((service, index) => (
                <div key={service.id} className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:grid-flow-dense' : ''
                  }`}>
                  {/* Content */}
                  <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-gradient-gold rounded-full flex items-center justify-center mr-4">
                        <service.icon className="h-6 w-6 text-charcoal" />
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {service.id.toUpperCase()}
                      </Badge>
                    </div>

                    <h2 className="text-title font-playfair text-foreground mb-2">
                      {service.title}
                    </h2>
                    <h3 className="text-lg text-gold font-medium mb-4">
                      {service.subtitle}
                    </h3>
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      {service.description}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                      {service.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-gold mr-2 flex-shrink-0" />
                          <span className="text-sm text-foreground">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="hero"
                            onClick={() => openServiceEnquiry(service.id)}
                          >
                            Get Started
                            <ArrowRight className="h-4 w-4 ml-2" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-md">
                          <DialogHeader>
                            <DialogTitle>Enquire About {service.title}</DialogTitle>
                          </DialogHeader>
                          <form onSubmit={handleFormSubmit} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Label htmlFor="name">Full Name *</Label>
                                <Input
                                  id="name"
                                  value={formData.name}
                                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                                  required
                                />
                              </div>
                              <div>
                                <Label htmlFor="phone">Phone Number *</Label>
                                <Input
                                  id="phone"
                                  type="tel"
                                  value={formData.phone}
                                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                                  required
                                />
                              </div>
                            </div>

                            <div>
                              <Label htmlFor="email">Email Address</Label>
                              <Input
                                id="email"
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                              />
                            </div>

                            {service.id === 'exchange' && (
                              <div>
                                <Label htmlFor="goldWeight">
                                  Approximate Gold Weight (grams)
                                </Label>
                                <Input
                                  id="goldWeight"
                                  value={formData.goldWeight}
                                  onChange={(e) => setFormData(prev => ({ ...prev, goldWeight: e.target.value }))}
                                />
                              </div>
                            )}

                            <div>
                              <Label htmlFor="message">Additional Details</Label>
                              <Textarea
                                id="message"
                                value={formData.message}
                                onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                                placeholder="Tell us more about your requirements..."
                                rows={3}
                              />
                            </div>

                            <Button type="submit" className="w-full" variant="hero">
                              Submit Enquiry
                            </Button>

                            <p className="text-xs text-muted-foreground text-center">
                              Our expert will contact you within 2 hours to discuss your requirements.
                            </p>
                          </form>
                        </DialogContent>
                      </Dialog>

                      <Button variant="outline-gold">
                        Learn More
                      </Button>
                    </div>
                  </div>

                  {/* Details Card */}
                  <div className={index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}>
                    <Card className="card-luxury">
                      <CardContent className="p-6">
                        <Tabs defaultValue="process">
                          <TabsList className="grid w-full grid-cols-3">
                            <TabsTrigger value="process">Process</TabsTrigger>
                            <TabsTrigger value="requirements">Requirements</TabsTrigger>
                            <TabsTrigger value="details">Details</TabsTrigger>
                          </TabsList>

                          <TabsContent value="process" className="mt-4">
                            <h4 className="font-semibold text-foreground mb-3">How It Works</h4>
                            <ol className="space-y-2">
                              {service.process.map((step, idx) => (
                                <li key={idx} className="flex items-start text-sm">
                                  <span className="bg-gold text-charcoal rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mr-3 mt-0.5 flex-shrink-0">
                                    {idx + 1}
                                  </span>
                                  <span className="text-foreground">{step}</span>
                                </li>
                              ))}
                            </ol>
                          </TabsContent>

                          <TabsContent value="requirements" className="mt-4">
                            <h4 className="font-semibold text-foreground mb-3">Required Documents</h4>
                            <ul className="space-y-2">
                              {service.documents.map((doc, idx) => (
                                <li key={idx} className="flex items-center text-sm">
                                  <FileText className="h-4 w-4 text-gold mr-2 flex-shrink-0" />
                                  <span className="text-foreground">{doc}</span>
                                </li>
                              ))}
                            </ul>
                          </TabsContent>

                          <TabsContent value="details" className="mt-4">
                            <h4 className="font-semibold text-foreground mb-3">Service Details</h4>
                            <div className="space-y-3">
                              <div className="flex justify-between items-center text-sm">
                                <span className="text-muted-foreground">Processing Time:</span>
                                <span className="text-foreground font-medium">{service.timeframe}</span>
                              </div>
                              {service.minWeight && (
                                <div className="flex justify-between items-center text-sm">
                                  <span className="text-muted-foreground">Minimum Weight:</span>
                                  <span className="text-foreground font-medium">{service.minWeight}</span>
                                </div>
                              )}
                              {service.minAmount && (
                                <div className="flex justify-between items-center text-sm">
                                  <span className="text-muted-foreground">Minimum Amount:</span>
                                  <span className="text-foreground font-medium">{service.minAmount}</span>
                                </div>
                              )}
                              {service.eligibility && (
                                <div className="flex justify-between items-center text-sm">
                                  <span className="text-muted-foreground">Eligibility:</span>
                                  <span className="text-foreground font-medium">{service.eligibility}</span>
                                </div>
                              )}
                            </div>
                          </TabsContent>
                        </Tabs>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 bg-gradient-surface">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-display font-playfair text-foreground mb-4">
                Why Choose Our Services
              </h2>
              <p className="text-lg text-muted-foreground">
                Built on trust, transparency, and three decades of industry expertise
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefits.map((benefit, index) => (
                <Card key={index} className="card-luxury text-center">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-gradient-gold rounded-full flex items-center justify-center mx-auto mb-4">
                      <benefit.icon className="h-6 w-6 text-charcoal" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      {benefit.title}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {benefit.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
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
                Common questions about our services and processes
              </p>
            </div>

            <Tabs defaultValue="exchange" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-8">
                <TabsTrigger value="exchange">Exchange</TabsTrigger>

                <TabsTrigger value="bonds">Bonds</TabsTrigger>
                <TabsTrigger value="training">Training</TabsTrigger>
              </TabsList>

              {Object.entries(faqs).map(([service, questions]) => (
                <TabsContent key={service} value={service}>
                  <Accordion type="single" collapsible className="space-y-4">
                    {questions.map((faq, index) => (
                      <AccordionItem
                        key={index}
                        value={`${service}-${index}`}
                        className="border border-border rounded-lg px-6"
                      >
                        <AccordionTrigger className="text-left font-semibold text-foreground">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground pt-2">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="py-16 bg-ink text-ivory">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-display font-playfair text-ivory mb-4">
              Need Personalized Assistance?
            </h2>
            <p className="text-lg text-ivory/80 mb-8">
              Our expert team is ready to help you with personalized solutions for all your gold and jewelry needs
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <div className="flex items-center justify-center">
                <Phone className="h-5 w-5 text-gold mr-3" />
                <div>
                  <div className="font-semibold">Call Us</div>
                  <div className="text-ivory/80">+91 82204 21317</div>
                </div>
              </div>

              <div className="flex items-center justify-center">
                <Mail className="h-5 w-5 text-gold mr-3" />
                <div>
                  <div className="font-semibold">Email Us</div>
                  <div className="text-ivory/80">jrbgoldprivateltd@gmail.com</div>
                  <div className="text-ivory/80">inforjrb@gmail.com</div>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <a href="/consultation">
                <Button size="lg" variant="hero">
                  Schedule Consultation
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Services;
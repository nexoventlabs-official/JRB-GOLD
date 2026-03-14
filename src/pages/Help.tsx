import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  MessageCircle,
  Phone,
  Mail,
  Clock,
  HelpCircle,
  Package,
  CreditCard,
  RefreshCw,
  CheckCircle,
  ArrowRight
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Help = () => {
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    orderNumber: '',
    subject: '',
    message: ''
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    toast({
      title: "Message Sent!",
      description: "We've received your message and will respond within 24 hours.",
      variant: "default",
    });
    setContactForm({
      name: '',
      email: '',
      orderNumber: '',
      subject: '',
      message: ''
    });
  };

  const faqData = [
    {
      category: "Orders & Shipping",
      icon: <Package className="h-5 w-5" />,
      questions: [
        {
          q: "How can I track my order?",
          a: "You can track your order by going to 'My Orders' in your account. If your order has been shipped, you'll see a tracking number that you can use to monitor delivery status."
        },
        {
          q: "What are your shipping charges?",
          a: "We offer free shipping on all orders above ₹25,000. For orders below this amount, shipping charges are ₹500 within India."
        },
        {
          q: "How long does delivery take?",
          a: "Standard delivery takes 5-7 business days. Express delivery (available for select locations) takes 2-3 business days."
        },
        {
          q: "Can I change my shipping address?",
          a: "You can change your shipping address within 2 hours of placing the order. After that, please contact our support team immediately."
        }
      ]
    },
    {
      category: "Returns & Refunds",
      icon: <RefreshCw className="h-5 w-5" />,
      questions: [
        {
          q: "What is your return policy?",
          a: "We offer a 30-day return policy for all jewelry items. Items must be in original condition with all certificates and packaging."
        },
        {
          q: "How do I initiate a return?",
          a: "Go to 'My Orders', find your order, and click 'Return Item'. Follow the instructions to schedule a pickup."
        },
        {
          q: "When will I receive my refund?",
          a: "Refunds are processed within 5-7 business days after we receive and inspect the returned item."
        },
        {
          q: "Are there any return charges?",
          a: "Returns are free for defective items. For other returns, a pickup charge of ₹200 applies."
        }
      ]
    },
    {
      category: "Payments",
      icon: <CreditCard className="h-5 w-5" />,
      questions: [
        {
          q: "What payment methods do you accept?",
          a: "We accept all major credit/debit cards, UPI, net banking, and digital wallets like Paytm, PhonePe, and Google Pay."
        },
        {
          q: "Is it safe to pay online?",
          a: "Yes, all payments are secured with 256-bit SSL encryption. We don't store your card details on our servers."
        },
        {
          q: "Can I pay in installments?",
          a: "Yes, we offer EMI options for orders above ₹10,000 through select banks and credit cards."
        },
        {
          q: "What if my payment fails?",
          a: "If payment fails, the amount will be refunded to your account within 3-5 business days. You can retry the payment or choose a different method."
        }
      ]
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-playfair font-bold text-gray-900 mb-4">
          How can we help you?
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Find answers to common questions or get in touch with our support team
        </p>
      </div>

      {/* Quick Contact Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <Card className="text-center hover:shadow-lg transition-shadow">
          <CardContent className="pt-6">
            <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Phone className="h-6 w-6 text-yellow-600" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Call Us</h3>
            <p className="text-gray-600 mb-4">Speak with our support team</p>
            <p className="font-medium text-lg">+91 82204 21317</p>
            <p className="text-sm text-gray-500">Mon-Sat, 9 AM - 7 PM</p>
          </CardContent>
        </Card>

        <Card className="text-center hover:shadow-lg transition-shadow">
          <CardContent className="pt-6">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Email Support</h3>
            <p className="text-gray-600 mb-4">Get help via email</p>
            <p className="font-medium">jrbgoldprivateltd@gmail.com</p>
            <p className="font-medium">inforjrb@gmail.com</p>
            <p className="text-sm text-gray-500">Response within 24 hours</p>
          </CardContent>
        </Card>

        <Card className="text-center hover:shadow-lg transition-shadow">
          <CardContent className="pt-6">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageCircle className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Live Chat</h3>
            <p className="text-gray-600 mb-4">Chat with us instantly</p>
            <Button className="bg-green-600 hover:bg-green-700">
              Start Chat
            </Button>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="faq" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="faq" className="flex items-center gap-2">
            <HelpCircle className="h-4 w-4" />
            Frequently Asked Questions
          </TabsTrigger>
          <TabsTrigger value="contact" className="flex items-center gap-2">
            <Mail className="h-4 w-4" />
            Contact Form
          </TabsTrigger>
        </TabsList>

        <TabsContent value="faq" className="mt-8">
          <div className="space-y-8">
            {faqData.map((category, categoryIndex) => (
              <Card key={categoryIndex}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    {category.icon}
                    {category.category}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {category.questions.map((faq, faqIndex) => (
                      <div key={faqIndex} className="border-b border-gray-100 last:border-b-0 pb-4 last:pb-0">
                        <h4 className="font-medium text-gray-900 mb-2 flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                          {faq.q}
                        </h4>
                        <p className="text-gray-600 ml-7">{faq.a}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="contact" className="mt-8">
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle>Send us a message</CardTitle>
              <p className="text-gray-600">
                Can't find what you're looking for? Send us a detailed message and we'll get back to you.
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <Input
                      required
                      value={contactForm.name}
                      onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <Input
                      type="email"
                      required
                      value={contactForm.email}
                      onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Order Number (Optional)
                    </label>
                    <Input
                      value={contactForm.orderNumber}
                      onChange={(e) => setContactForm({ ...contactForm, orderNumber: e.target.value })}
                      placeholder="ORD-2025-XXXX"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Subject *
                    </label>
                    <Input
                      required
                      value={contactForm.subject}
                      onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                      placeholder="Brief subject of your inquiry"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <Textarea
                    required
                    rows={6}
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    placeholder="Please describe your question or issue in detail..."
                  />
                </div>

                <Button type="submit" className="w-full">
                  Send Message
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Business Hours */}
      <Card className="mt-12">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Business Hours
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-3">Customer Support</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Monday - Friday</span>
                  <span>9:00 AM - 7:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday</span>
                  <span>10:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday</span>
                  <span className="text-red-600">Closed</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-medium mb-3">Store Visits</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Monday - Saturday</span>
                  <span>10:00 AM - 8:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday</span>
                  <span>11:00 AM - 7:00 PM</span>
                </div>
                <div className="mt-3 text-gray-600">
                  <p>📍 123 Jewelry Street, Bangalore, Karnataka 560001</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Help;

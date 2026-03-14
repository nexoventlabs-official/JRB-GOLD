import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Award, Shield, Users, TrendingUp, CheckCircle, Star, Heart, Clock, Briefcase, Gem, Info, Phone, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import craftsmanshipImage from "@/assets/craftsmanship.jpg";
import goldCollectionImage from "@/assets/gold-collection.jpg";

const About = () => {
  const location = useLocation();
  const [activeSection, setActiveSection] = useState('about');

  useEffect(() => {
    // Get the hash from URL and update active section
    const hash = location.hash.substring(1) || 'about';
    setActiveSection(hash);

    // Scroll to the section if it exists
    const element = document.getElementById(hash);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }, [location]);

  // Company Information Section
  const renderCompanyInfo = () => (
    <section id="about" className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-playfair font-bold text-center mb-8">Our Story</h2>
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <p className="mb-4 text-lg">
              Founded in 2016, JRB Gold has grown from a small family-owned business to a trusted name in fine jewelry.
              Our commitment to quality and craftsmanship has been the cornerstone of our success.
            </p>
            <p className="mb-6">
              We take pride in offering certified, hallmarked gold jewelry that combines traditional craftsmanship with contemporary designs.
              Each piece is meticulously crafted by our skilled artisans.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center">
                <Gem className="w-5 h-5 text-yellow-500 mr-2" />
                <span>100% Hallmarked Gold</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 text-yellow-500 mr-2" />
                <span>Certified Purity</span>
              </div>
            </div>
          </div>
          <div className="relative rounded-lg overflow-hidden">
            <img src={craftsmanshipImage} alt="JRB Gold Craftsmanship" className="w-full h-auto rounded-lg shadow-lg" />
          </div>
        </div>
      </div>
    </section>
  );

  // Story Section
  const renderStory = () => (
    <section id="story" className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-playfair font-bold text-center mb-12">Our Journey</h2>
        <div className="relative">
          <div className="absolute left-1/2 h-full w-0.5 bg-yellow-300 transform -translate-x-1/2"></div>

          {[
            {
              year: '2016',
              title: 'Humble Beginnings',
              description: 'Started as a small family business with a single store',
              icon: <Info className="w-6 h-6 text-yellow-500" />
            },
            {
              year: '2018',
              title: 'First Milestone',
              description: 'Opened our flagship store and introduced hallmarking',
              icon: <Briefcase className="w-6 h-6 text-yellow-500" />
            },
            {
              year: '2020',
              title: 'Digital Expansion',
              description: 'Launched online store and digital gold services',
              icon: <TrendingUp className="w-6 h-6 text-yellow-500" />
            },
            {
              year: '2024',
              title: 'Industry Leader',
              description: 'Recognized as a trusted premium jewelry brand',
              icon: <Award className="w-6 h-6 text-yellow-500" />
            }
          ].map((item, index) => (
            <div
              key={index}
              className={`relative mb-8 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}
              style={{ marginLeft: index % 2 === 0 ? '50%' : '0' }}
            >
              <div className="absolute top-0 -left-4 w-8 h-8 rounded-full bg-yellow-500 flex items-center justify-center text-white">
                {item.icon}
              </div>
              <div className="p-6 bg-white rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-yellow-700">{item.year}</h3>
                <h4 className="text-lg font-medium mb-2">{item.title}</h4>
                <p className="text-gray-600">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  // Craftsmanship Section
  const renderCraftsmanship = () => (
    <section id="craft" className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-playfair font-bold text-center mb-8">Our Craftsmanship</h2>
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="order-2 md:order-1">
            <h3 className="text-2xl font-semibold mb-4">Handcrafted Excellence</h3>
            <p className="mb-6">
              Each JRB Gold piece is meticulously handcrafted by our master artisans who bring decades of experience and passion to their work.
              We combine traditional techniques with modern technology to create timeless designs.
            </p>
            <div className="space-y-4">
              <div className="flex items-start">
                <CheckCircle className="w-5 h-5 text-yellow-500 mt-1 mr-2 flex-shrink-0" />
                <div>
                  <h4 className="font-medium">Traditional Techniques</h4>
                  <p className="text-sm text-gray-600">Preserving ancient goldsmithing methods</p>
                </div>
              </div>
              <div className="flex items-start">
                <CheckCircle className="w-5 h-5 text-yellow-500 mt-1 mr-2 flex-shrink-0" />
                <div>
                  <h4 className="font-medium">Modern Precision</h4>
                  <p className="text-sm text-gray-600">Utilizing latest technology for perfect finishes</p>
                </div>
              </div>
              <div className="flex items-start">
                <CheckCircle className="w-5 h-5 text-yellow-500 mt-1 mr-2 flex-shrink-0" />
                <div>
                  <h4 className="font-medium">Quality Assurance</h4>
                  <p className="text-sm text-gray-600">Rigorous quality checks at every stage</p>
                </div>
              </div>
            </div>
          </div>
          <div className="order-1 md:order-2">
            <img
              src={craftsmanshipImage}
              alt="JRB Gold Craftsmanship"
              className="w-full h-auto rounded-lg shadow-xl"
            />
          </div>
        </div>
      </div>
    </section>
  );

  // Contact Information Section
  const renderContactInfo = () => (
    <section id="contact-info" className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-playfair font-bold text-center mb-12">Visit Us</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="p-6 text-center">
            <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-yellow-100 flex items-center justify-center">
              <MapPin className="w-6 h-6 text-yellow-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Our Location</h3>
            <p className="text-gray-600">123 Gold Street, Jewelry District<br />Mumbai, Maharashtra 400001</p>
          </Card>

          <Card className="p-6 text-center">
            <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-yellow-100 flex items-center justify-center">
              <Phone className="w-6 h-6 text-yellow-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Contact Us</h3>
            <p className="text-gray-600">
              <a href="tel:+912234567890" className="hover:text-yellow-600">+91 22 3456 7890</a><br />
              <a href="mailto:jrbgoldprivateltd@gmail.com" className="hover:text-yellow-600">jrbgoldprivateltd@gmail.com</a><br />
              <a href="mailto:inforjrb@gmail.com" className="hover:text-yellow-600">inforjrb@gmail.com</a>
            </p>
          </Card>

          <Card className="p-6 text-center">
            <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-yellow-100 flex items-center justify-center">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Business Hours</h3>
            <p className="text-gray-600">
              Monday - Saturday: 10:30 AM - 8:30 PM<br />
              Sunday: 11:00 AM - 7:00 PM
            </p>
          </Card>
        </div>
      </div>
    </section>
  );

  // Heritage Section
  const renderHeritage = () => (
    <section id="heritage" className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-playfair font-bold text-gray-900">Our Heritage</h2>
          <div className="w-24 h-1 bg-yellow-500 mx-auto mt-4"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h3 className="text-2xl font-playfair font-semibold text-gray-900">8+ Years of Excellence</h3>
            <p className="text-gray-600 leading-relaxed">
              Since our founding in 2016, JRB Gold has been a family-owned business dedicated to the art of fine jewelry making.
              What began as a small workshop has grown into a trusted name in the industry, known for our commitment to quality and craftsmanship.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Our master jewelers combine traditional techniques with modern technology to create pieces that stand the test of time.
              Each creation is a testament to our passion for excellence and attention to detail.
            </p>
            <div className="grid grid-cols-2 gap-4 mt-8">
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                <div className="text-3xl font-bold text-yellow-600">8+</div>
                <div className="text-gray-600">Years of Excellence</div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                <div className="text-3xl font-bold text-yellow-600">50K+</div>
                <div className="text-gray-600">Happy Customers</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="relative h-64 rounded-lg overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1605100804763-247f67b3557e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                alt="Traditional jewelry making"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-4 text-white">
                <h4 className="font-medium">Traditional Craftsmanship</h4>
              </div>
            </div>
            <div className="grid gap-4">
              <div className="relative h-30 rounded-lg overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1602173576902-8a8a1a9b1b3d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                  alt="Modern design"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-3 text-white">
                  <h4 className="text-sm font-medium">Modern Designs</h4>
                </div>
              </div>
              <div className="relative h-30 rounded-lg overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1605100804763-247f67b3557e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                  alt="Quality assurance"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-3 text-white">
                  <h4 className="text-sm font-medium">Quality Assurance</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );

  // Render the active section based on URL hash
  const renderActiveSection = () => {
    switch (activeSection) {
      case 'story':
        return renderStory();
      case 'craft':
        return renderCraftsmanship();
      case 'contact-info':
        return renderContactInfo();
      case 'heritage':
        return renderHeritage();
      case 'about':
      default:
        return (
          <>
            {renderCompanyInfo()}
            {renderHeritage()}
            {renderStory()}
            {renderCraftsmanship()}
            {renderContactInfo()}
          </>
        );
    }
  };
  const milestones = [
    { year: '2016', title: 'Founded', description: 'JRB Gold established as family jewelry business' },
    { year: '2018', title: 'Expansion', description: 'Opened flagship store and introduced certified hallmarking' },
    { year: '2020', title: 'Innovation', description: 'Introduced 3D jewelry design and digital services' },
    { year: '2022', title: 'Digital Growth', description: 'E-commerce platform and online gold investments' },
    { year: '2024', title: 'Industry Leader', description: 'Recognized as trusted premium jewelry brand' },
  ];

  const values = [
    {
      icon: Shield,
      title: 'Trust & Transparency',
      description: 'Every transaction is backed by complete transparency in pricing, quality, and processes. No hidden charges, ever.',
    },
    {
      icon: Award,
      title: 'Quality Assurance',
      description: 'All our jewelry comes with certified hallmarking and quality guarantee from recognized testing centers.',
    },
    {
      icon: Users,
      title: 'Customer First',
      description: 'Your satisfaction is our priority. We build lasting relationships through exceptional service and support.',
    },
    {
      icon: Heart,
      title: 'Dedicated Craftsmanship',
      description: 'Our skilled artisans create timeless pieces that blend tradition with modern design.',
    },
  ];

  const achievements = [
    { number: '8+', label: 'Years of Excellence' },
    { number: '50,000+', label: 'Happy Customers' },
    { number: '₹500Cr+', label: 'Gold Transacted' },
    { number: '99.8%', label: 'Customer Satisfaction' },
  ];

  const certifications = [
    'Bureau of Indian Standards (BIS) Hallmarking',
    'Gems & Jewelry Export Promotion Council Member',
    'Gold & Silver Dealers Association Certified',
    'ISO 9001:2015 Quality Management',
    'Responsible Jewelry Council Certified',
  ];

  const team = [
    {
      name: 'Joseph Ramki',
      position: 'Founder & Chairman',
      experience: '8+ years',
      description: 'Visionary leader who established JRB Gold with a commitment to quality and customer trust.',
    },
    {
      name: 'Esa Beaula',
      position: 'Managing Director',
      experience: '8+ years',
      description: 'Driving innovation and digital transformation while maintaining traditional values.',
    },
  ];

  const testimonialHighlights = [
    {
      text: "Their gold exchange process is very transparent. I got the best value for my old gold without any hassle.",
      author: "Priya K., Mumbai"
    },
    {
      text: "They effectively repaired my family's vintage jewelry. Their craftsmanship and care for jewelry repair is unmatched.",
      author: "Mrs. Sharma, Loyal Customer"
    },
    {
      text: "The custom design team created a beautiful necklace set that matches my family heritage perfectly. Truly masterful work!",
      author: "Rajesh M., Delhi"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-surface">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h1 className="text-hero font-playfair text-foreground mb-6">
                Our Story
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Eight years of craftsmanship, trust, and innovation in the jewelry industry.
                Built on the foundation of transparency, quality, and customer relationships that last generations.
              </p>
              <div className="divider-gold mt-8 max-w-24 mx-auto" />
            </div>

            {/* Key Highlights */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {achievements.map((achievement, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl font-bold text-gold mb-2 font-playfair">
                    {achievement.number}
                  </div>
                  <div className="text-muted-foreground font-medium">
                    {achievement.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Brand Story Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-display font-playfair text-foreground mb-6">
                  From Humble Beginnings to Industry Leadership
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Founded in 2016 by Joseph Ramki & Esa Beaula, JRB Gold began as a small family jewelry
                    business with a simple mission: provide genuine, high-quality gold and silver
                    jewelry at fair prices with complete transparency.
                  </p>
                  <p>
                    What started as a single store has grown into a trusted brand serving thousands
                    of customers across India. Our success stems from our unwavering commitment to
                    quality, ethical business practices, and building relationships that span generations.
                  </p>
                  <p>
                    Today, we continue to honor our founder's vision while embracing innovation
                    through digital services, modern retail experiences, and sustainable practices
                    that respect both our customers and the environment.
                  </p>
                </div>

                <div className="mt-8">
                  <div className="flex flex-wrap gap-2">
                    <Badge className="bg-gold/10 text-gold border-gold/20">Heritage Brand</Badge>
                    <Badge className="bg-gold/10 text-gold border-gold/20">Family Business</Badge>
                    <Badge className="bg-gold/10 text-gold border-gold/20">Certified Quality</Badge>
                  </div>
                </div>
              </div>

              <div className="relative">
                <img
                  src={craftsmanshipImage}
                  alt="JRB Gold Craftsmanship"
                  className="rounded-lg shadow-luxury w-full"
                />
                <div className="absolute -bottom-6 -right-6 bg-gradient-gold p-6 rounded-lg text-charcoal shadow-elevated">
                  <div className="text-2xl font-bold mb-1">8+</div>
                  <div className="text-sm font-medium">Years of Trust</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="py-16 bg-gradient-surface">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-display font-playfair text-foreground mb-4">
                Our Journey
              </h2>
              <p className="text-lg text-muted-foreground">
                Key milestones that shaped our growth and success
              </p>
            </div>

            <div className="relative">
              {/* Timeline Line */}
              <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-gold to-gold/30" />

              <div className="space-y-8 md:space-y-12">
                {milestones.map((milestone, index) => (
                  <div key={index} className={`flex items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                    }`}>
                    <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right md:pr-8' : 'md:text-left md:pl-8'
                      }`}>
                      <Card className="card-luxury">
                        <CardContent className="p-6">
                          <div className="text-2xl font-bold text-gold mb-2 font-playfair">
                            {milestone.year}
                          </div>
                          <h3 className="text-lg font-semibold text-foreground mb-2">
                            {milestone.title}
                          </h3>
                          <p className="text-muted-foreground">
                            {milestone.description}
                          </p>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Timeline Dot */}
                    <div className="hidden md:block w-4 h-4 bg-gold rounded-full border-4 border-background shadow-lg z-10" />

                    <div className="flex-1" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-display font-playfair text-foreground mb-4">
                Our Values
              </h2>
              <p className="text-lg text-muted-foreground">
                The principles that guide everything we do
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <Card key={index} className="card-luxury text-center group hover:shadow-elevated transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="w-16 h-16 bg-gradient-gold rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                      <value.icon className="h-8 w-8 text-charcoal" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-3">
                      {value.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Certifications & Trust Section */}
        <section className="py-16 bg-gradient-surface">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-display font-playfair text-foreground mb-6">
                  Certified Excellence
                </h2>
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  Our commitment to quality is validated by industry-leading certifications
                  and memberships that ensure every piece of jewelry meets the highest standards.
                </p>

                <div className="space-y-3">
                  {certifications.map((cert, index) => (
                    <div key={index} className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-gold mr-3 flex-shrink-0" />
                      <span className="text-foreground">{cert}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-8 flex flex-wrap gap-3">
                  <Badge className="bg-gold/10 text-gold border-gold/20 py-2 px-4">
                    <Award className="h-4 w-4 mr-2" />
                    BIS Certified
                  </Badge>
                  <Badge className="bg-gold/10 text-gold border-gold/20 py-2 px-4">
                    <Shield className="h-4 w-4 mr-2" />
                    ISO Certified
                  </Badge>
                  <Badge className="bg-gold/10 text-gold border-gold/20 py-2 px-4">
                    <Star className="h-4 w-4 mr-2" />
                    Industry Leader
                  </Badge>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <Card className="card-luxury p-6 text-center">
                    <div className="text-2xl font-bold text-gold mb-1">100%</div>
                    <div className="text-sm text-muted-foreground">Hallmarked Gold</div>
                  </Card>
                  <Card className="card-luxury p-6 text-center">
                    <div className="text-2xl font-bold text-gold mb-1">Zero</div>
                    <div className="text-sm text-muted-foreground">Wastage Charges</div>
                  </Card>
                </div>
                <div className="space-y-4 mt-8">
                  <Card className="card-luxury p-6 text-center">
                    <div className="text-2xl font-bold text-gold mb-1">24/7</div>
                    <div className="text-sm text-muted-foreground">Customer Support</div>
                  </Card>
                  <Card className="card-luxury p-6 text-center">
                    <div className="text-2xl font-bold text-gold mb-1">30 Days</div>
                    <div className="text-sm text-muted-foreground">Return Policy</div>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Leadership Team */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-display font-playfair text-foreground mb-4">
                Leadership Team
              </h2>
              <p className="text-lg text-muted-foreground">
                Experienced leaders driving our vision forward
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {team.map((member, index) => (
                <Card key={index} className="card-luxury text-center">
                  <CardContent className="p-8">
                    <div className="w-24 h-24 bg-gradient-gold rounded-full flex items-center justify-center mx-auto mb-6">
                      <Users className="h-12 w-12 text-charcoal" />
                    </div>

                    <h3 className="text-xl font-semibold text-foreground mb-1">
                      {member.name}
                    </h3>
                    <div className="text-gold font-medium mb-2">
                      {member.position}
                    </div>
                    <Badge variant="secondary" className="mb-4">
                      {member.experience}
                    </Badge>

                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {member.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Customer Testimonials */}
        <section className="py-16 bg-ink text-ivory">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-display font-playfair text-ivory mb-4">
                Customer Reviews
              </h2>
              <p className="text-lg text-ivory/80">
                Building relationships that last generations
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonialHighlights.map((testimonial, index) => (
                <Card key={index} className="bg-ivory/10 border-ivory/20">
                  <CardContent className="p-6 text-center">
                    <div className="flex justify-center mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 text-gold fill-gold" />
                      ))}
                    </div>

                    <blockquote className="text-ivory/90 mb-4 italic leading-relaxed">
                      "{testimonial.text}"
                    </blockquote>

                    <div className="text-gold font-medium">
                      {testimonial.author}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center mt-12">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                <div>
                  <div className="text-3xl font-bold text-gold mb-2">4.9/5</div>
                  <div className="text-ivory/80 text-sm">Customer Rating</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-gold mb-2">98%</div>
                  <div className="text-ivory/80 text-sm">Repeat Customers</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-gold mb-2">15K+</div>
                  <div className="text-ivory/80 text-sm">Positive Reviews</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-gold mb-2">24hrs</div>
                  <div className="text-ivory/80 text-sm">Response Time</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-gradient-surface">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-display font-playfair text-foreground mb-4">
              Experience the JRB Gold Difference
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Visit our store or explore our online collection to discover jewelry
              that combines traditional craftsmanship with contemporary elegance.
            </p>

            <div className="flex justify-center">
              <Button size="lg" variant="hero">
                Visit Our Store
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
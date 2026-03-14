import { ChevronLeft, ChevronRight, Shield, Award, TrendingUp, CheckCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { useState, useEffect } from "react";
import { useGoldRates } from "@/hooks/useGoldRates";
import LazyImage from "@/components/LazyImage";
import SkeletonLoader from "@/components/SkeletonLoader";
import heroImage from "@/assets/hero-jewelry.jpg";
import craftsmanshipImage from "@/assets/craftsmanship.jpg";

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState<Set<number>>(new Set());
  const [isHeroLoading, setIsHeroLoading] = useState(true);
  const { gold24k, gold22k, gold18k, gold14k, platinum, silver, isLoading, error, lastUpdated } = useGoldRates();

  useEffect(() => {
    // Simulate hero loading
    const timer = setTimeout(() => {
      setIsHeroLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  const handleImageLoad = (slideIndex: number) => {
    setImagesLoaded(prev => new Set([...prev, slideIndex]));
  };

  const slides = [
    {
      image: heroImage,
      title: "Trusted Gold & Silver",
      subtitle: "Fair Prices, Fine Craft",
      description: "Discover our premium collection of hallmarked jewelry with transparent pricing and zero wastage charges.",
      primaryCTA: "Shop Gold & Silver",
      primaryLink: "/shop",
      secondaryCTA: "Exchange Old Jewelry",
      secondaryLink: "/services#exchange"
    },
    {
      image: craftsmanshipImage,
      title: "Heritage Craftsmanship",
      subtitle: "8+ Years of Excellence",
      description: "Experience the artistry of traditional jewelry making with modern certified quality standards.",
      primaryCTA: "View Collection",
      primaryLink: "/shop?category=featured",
      secondaryCTA: "Learn More",
      secondaryLink: "/about#heritage"
    },
  ];

  const highlights = [
    { icon: CheckCircle, text: "Low Making Charges" },
    { icon: Shield, text: "No Wastage" },
    { icon: Award, text: "Certified Hallmark" },
    { icon: TrendingUp, text: "Today's Rate" },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section className="relative overflow-hidden">
      {/* Hero Carousel */}
      <div className="relative h-[60vh] xs:h-[70vh] lg:h-[80vh] min-h-[500px] xs:min-h-[600px]">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? "opacity-100" : "opacity-0"
              }`}
          >
            <div className="relative h-full">
              {/* Background Image */}
              <div className="absolute inset-0">
                <LazyImage
                  src={slide.image}
                  alt={`Hero slide ${index + 1}`}
                  className="w-full h-full object-cover"
                  onLoad={() => handleImageLoad(index)}
                />
                <div className="absolute inset-0 bg-charcoal/60" />
              </div>

              {/* Content */}
              <div className="relative h-full flex items-center">
                <div className="container mx-auto">
                  <div className="max-w-2xl lg:max-w-3xl xl:max-w-4xl">
                    {isHeroLoading ? (
                      <div className="space-y-4 xs:space-y-6">
                        <SkeletonLoader variant="text" height="3rem" width="80%" className="bg-white/20" />
                        <SkeletonLoader variant="text" height="2rem" width="60%" className="bg-white/15" />
                        <SkeletonLoader variant="text" lines={2} className="bg-white/10" />
                        <div className="flex flex-col xs:flex-row gap-3 xs:gap-4">
                          <SkeletonLoader variant="button" width="150px" className="bg-white/20" />
                          <SkeletonLoader variant="button" width="150px" className="bg-white/15" />
                        </div>
                      </div>
                    ) : (
                      <div className="animate-slide-up">
                        <h1 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-playfair font-bold text-ivory mb-3 xs:mb-4 lg:mb-6 leading-tight animate-fade-in">
                          {slide.title}
                        </h1>
                        <p className="text-lg xs:text-xl sm:text-2xl lg:text-3xl text-gold font-playfair font-medium mb-4 xs:mb-6 lg:mb-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
                          {slide.subtitle}
                        </p>
                        <p className="text-sm xs:text-base lg:text-lg text-ivory/90 mb-6 xs:mb-8 leading-relaxed max-w-xl lg:max-w-2xl animate-fade-in" style={{ animationDelay: '0.4s' }}>
                          {slide.description}
                        </p>
                        <div className="flex flex-col xs:flex-row gap-3 xs:gap-4 animate-fade-in" style={{ animationDelay: '0.6s' }}>
                          <a href={slide.primaryLink} className="block">
                            <Button size="lg" className="w-full xs:w-auto bg-gradient-gold hover:shadow-luxury text-charcoal font-semibold px-6 lg:px-8 py-3 lg:py-4 text-sm lg:text-base transform hover:scale-105 transition-all duration-300">
                              {slide.primaryCTA}
                            </Button>
                          </a>
                          <a href={slide.secondaryLink} className="block">
                            <Button size="lg" variant="outline" className="w-full xs:w-auto border-2 border-gold text-gold hover:bg-gold/10 px-6 lg:px-8 py-3 lg:py-4 text-sm lg:text-base transform hover:scale-105 transition-all duration-300">
                              {slide.secondaryCTA}
                            </Button>
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Navigation Arrows */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute left-2 xs:left-4 top-1/2 -translate-y-1/2 text-ivory hover:bg-ivory/20 h-8 w-8 xs:h-10 xs:w-10"
          onClick={prevSlide}
        >
          <ChevronLeft className="h-4 w-4 xs:h-6 xs:w-6" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-2 xs:right-4 top-1/2 -translate-y-1/2 text-ivory hover:bg-ivory/20 h-8 w-8 xs:h-10 xs:w-10"
          onClick={nextSlide}
        >
          <ChevronRight className="h-4 w-4 xs:h-6 xs:w-6" />
        </Button>

        {/* Slide Indicators */}
        <div className="absolute bottom-4 xs:bottom-6 left-1/2 -translate-x-1/2 flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 xs:w-3 xs:h-3 rounded-full transition-all duration-300 ${index === currentSlide ? "bg-gold" : "bg-ivory/50"
                }`}
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>
      </div>

      {/* Live Metal Rates Table Section */}
      <div className="bg-white border-b py-6 xs:py-8">
        <div className="container mx-auto">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4 px-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <TrendingUp className="h-5 w-5 text-gold" />
                  <h3 className="text-xl md:text-2xl font-playfair font-bold text-foreground">Today's Live Market Rates</h3>
                </div>
                <p className="text-sm text-muted-foreground italic">Updated daily based on standard Indian Bullion Market rates</p>
              </div>
              <div className="bg-surface px-4 py-2 rounded-lg border border-gold/10 flex items-center gap-4 text-sm font-medium">
                <div className="flex items-center gap-2 text-gold">
                  <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
                  <span>{isLoading ? 'Updating...' : 'Live Rate'}</span>
                </div>
                <div className="h-4 w-px bg-gray-200"></div>
                <div className="text-muted-foreground">
                  {new Date(lastUpdated).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 xs:gap-4 lg:gap-6 px-4">
              {[
                { label: "Gold (24K)", rate: gold24k, sub: "₹/Gram", purity: "99.9% Pure" },
                { label: "Gold (22K)", rate: gold22k, sub: "₹/Gram", purity: "91.6% Pure" },
                { label: "Gold Coin", rate: gold24k, sub: "₹/Gram", purity: "24K Purity" },
                { label: "Gold (18K)", rate: gold18k, sub: "₹/Gram", purity: "75.0% Pure" },
                { label: "Silver", rate: silver, sub: "₹/Gram", purity: "Fine 999" }
              ].map((item, idx) => (
                <div key={idx} className="bg-white p-4 lg:p-6 rounded-2xl border-2 border-surface shadow-sm hover:shadow-luxury hover:border-gold/30 transition-all duration-300 text-center flex flex-col items-center group">
                  <div className="text-[10px] lg:text-xs font-bold text-gold/80 mb-1 lg:mb-2 uppercase tracking-widest">{item.label}</div>
                  <div className="text-xl lg:text-2xl font-extrabold text-charcoal mb-1 group-hover:scale-110 transition-transform">
                    {isLoading ? "---" : `₹${item.rate.toLocaleString('en-IN')}`}
                  </div>
                  <div className="text-[10px] text-muted-foreground font-medium mb-3">{item.sub}</div>
                  <div className="w-8 h-0.5 bg-gradient-gold mb-3 opacity-30 group-hover:opacity-100 transition-opacity"></div>
                  <div className="text-[10px] lg:text-xs text-charcoal/60 font-semibold">{item.purity}</div>
                </div>
              ))}
            </div>

            <div className="mt-8 mx-4 p-4 bg-gradient-surface border-2 border-surface/50 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
                  <Shield className="h-5 w-5 text-gold" />
                </div>
                <div>
                  <div className="text-sm font-bold text-charcoal">HUID Certified & Hallmarked</div>
                  <div className="text-xs text-muted-foreground">Prices are indicative. Visit our store at Thiruvannamalai for final quotes.</div>
                </div>
              </div>
              <Button variant="hero" size="sm" className="w-full md:w-auto shadow-luxury">
                Check Coin Rates Today
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Highlights Bar */}
      <div className="bg-ink text-ivory py-4 xs:py-6">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 xs:gap-6">
            {highlights.map((highlight, index) => (
              <div key={index} className="flex items-center justify-center space-x-2 xs:space-x-3">
                <highlight.icon className="h-4 w-4 xs:h-5 xs:w-5 text-gold flex-shrink-0" />
                <span className="font-medium text-xs xs:text-sm lg:text-base">{highlight.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
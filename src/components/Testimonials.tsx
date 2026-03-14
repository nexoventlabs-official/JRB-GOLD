import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useState, useEffect } from "react";

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: "Ramesh Kumar",
      location: "Chennai",
      rating: 5,
      text: "I recently purchased a gold chain and I’m very happy with the quality and purity. The buying process was smooth and the staff explained everything clearly before the purchase.",
      service: "Gold Purchase",
    },
    {
      id: 2,
      name: "Priya Sharma",
      location: "Bangalore",
      rating: 5,
      text: "My experience with JRB Gold was excellent. The gold quality and pricing were transparent, and the team helped me choose the right jewelry for my family function.",
      service: "Gold Purchase",
    },
    {
      id: 3,
      name: "Sandeep Patel",
      location: "Ahmedabad",
      rating: 5,
      text: "I bought gold coins recently and the service was very professional. The pricing was fair and the product quality was exactly as promised.",
      service: "Gold Purchase",
    },
    {
      id: 4,
      name: "Lakshmi Narayanan",
      location: "Coimbatore",
      rating: 5,
      text: "I purchased wedding jewelry from JRB Gold and the designs were beautiful. The staff were very supportive and made the whole experience comfortable.",
      service: "Gold Purchase",
    },
    {
      id: 5,
      name: "Anita Verma",
      location: "Delhi",
      rating: 5,
      text: "Very satisfied with my gold purchase. The purity certification and clear explanation of pricing gave me confidence in the purchase.",
      service: "Gold Purchase",
    },
  ];

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      nextTestimonial();
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const getVisibleTestimonials = () => {
    const visible = [];
    for (let i = 0; i < 3; i++) {
      const index = (currentIndex + i) % testimonials.length;
      visible.push(testimonials[index]);
    }
    return visible;
  };

  return (
    <section className="py-16 bg-ink text-ivory">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-display font-playfair text-ivory mb-4">
            Customer Reviews
          </h2>
          <p className="text-lg text-ivory/80 max-w-2xl mx-auto">
            Trusted by thousands of customers for quality, transparency, and exceptional service
          </p>
          <div className="divider-gold mt-6 max-w-24 mx-auto" />
        </div>

        {/* Testimonials Carousel */}
        <div className="relative">
          <div className="overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {getVisibleTestimonials().map((testimonial, index) => (
                <Card
                  key={`${testimonial.id}-${currentIndex}-${index}`}
                  className={`bg-ivory/10 border-ivory/20 transition-all duration-500 ${index === 1 ? 'md:scale-105 md:shadow-luxury' : 'md:scale-95'
                    }`}
                >
                  <CardContent className="p-6">
                    {/* Rating */}
                    <div className="flex justify-center mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 text-gold fill-gold" />
                      ))}
                    </div>

                    {/* Testimonial Text */}
                    <blockquote className="text-ivory/90 text-center mb-6 leading-relaxed italic">
                      "{testimonial.text}"
                    </blockquote>

                    {/* Customer Info */}
                    <div className="text-center">
                      <div className="font-semibold text-ivory mb-1">
                        {testimonial.name}
                      </div>
                      <div className="text-sm text-ivory/70 mb-2">
                        {testimonial.location}
                      </div>

                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 text-ivory hover:bg-ivory/20 hidden md:flex"
            onClick={prevTestimonial}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 text-ivory hover:bg-ivory/20 hidden md:flex"
            onClick={nextTestimonial}
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </div>

        {/* Testimonial Indicators */}
        <div className="flex justify-center mt-8 space-x-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentIndex ? "bg-gold w-8" : "bg-ivory/30"
                }`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>

        {/* Mobile Navigation */}
        <div className="flex justify-center mt-6 space-x-4 md:hidden">
          <Button
            variant="outline"
            size="sm"
            className="text-ivory border-ivory/30 hover:bg-ivory/20"
            onClick={prevTestimonial}
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="text-ivory border-ivory/30 hover:bg-ivory/20"
            onClick={nextTestimonial}
          >
            Next
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>

        {/* Trust Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 pt-8 border-t border-ivory/20">
          <div className="text-center">
            <div className="text-3xl font-bold text-gold mb-2">10,000+</div>
            <div className="text-ivory/80 text-sm">Happy Customers</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-gold mb-2">8+</div>
            <div className="text-ivory/80 text-sm">Years Experience</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-gold mb-2">99%</div>
            <div className="text-ivory/80 text-sm">Customer Satisfaction</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-gold mb-2">₹50Cr+</div>
            <div className="text-ivory/80 text-sm">Gold Transacted</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
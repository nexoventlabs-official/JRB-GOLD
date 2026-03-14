import { MapPin, Clock, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function LocationPage() {
  const address = {
    name: 'Visit Our Flagship Store',
    line1: 'Soundar Complex, Vellore Road',
    line2: 'Near Anna Arch',
    line3: 'Thiruvannamalai',
    line4: 'Tamil Nadu - 606604',
    phone: '+91 82204 21317',
    emails: ['jrbgoldprivateltd@gmail.com', 'inforjrb@gmail.com'],
    hours: {
      weekdays: 'Monday - Saturday: 10:00 AM - 8:00 PM',
      sunday: 'Sunday: 11:00 AM - 6:00 PM'
    },
    mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3908.4567890123456!2d79.0727!3d11.4805!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTHCsDI4JzQ5LjgiTiA3OcKwMDQnMjEuNyJF!5e0!3m2!1sen!2sin!4v1234567890123!5m2!1sen!2sin',
    directionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=12.2238,79.0746'
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-playfair font-bold text-gray-900 mb-4">Our Location</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Visit our store in Thiruvannamalai for a personalized jewelry experience
          </p>
          <div className="w-24 h-1 bg-gold mx-auto mt-6 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Card */}
          <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
            <div className="flex items-center mb-6">
              <div className="p-3 rounded-full bg-amber-50 mr-4">
                <MapPin className="h-8 w-8 text-amber-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Store Address</h2>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{address.name}</h3>
                <address className="not-italic text-gray-700 space-y-1">
                  <p>{address.line1}</p>
                  <p>{address.line2}</p>
                  <p>{address.line3}</p>
                  <p>{address.line4}</p>
                </address>
              </div>

              <div className="flex items-start">
                <Phone className="h-5 w-5 text-amber-600 mr-3 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-gray-900 font-medium">Call Us</p>
                  <a href={`tel:${address.phone.replace(/\D/g, '')}`} className="text-gray-700 hover:text-amber-600 transition-colors">
                    {address.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start">
                <Mail className="h-5 w-5 text-amber-600 mr-3 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-gray-900 font-medium">Email Us</p>
                  <div className="flex flex-col space-y-1">
                    {address.emails.map(email => (
                      <a key={email} href={`mailto:${email}`} className="text-gray-700 hover:text-amber-600 transition-colors">
                        {email}
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex items-start">
                <Clock className="h-5 w-5 text-amber-600 mr-3 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-gray-900 font-medium">Business Hours</p>
                  <p className="text-gray-700">{address.hours.weekdays}</p>
                  <p className="text-gray-700">{address.hours.sunday}</p>
                </div>
              </div>

              <div className="pt-4">
                <a
                  href={address.directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-amber-600 hover:bg-amber-700 transition-colors shadow-sm"
                >
                  <MapPin className="h-5 w-5 mr-2" />
                  Get Directions
                </a>
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="rounded-xl overflow-hidden shadow-xl h-[500px]">
            <iframe
              src={address.mapUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="JRB Gold Store Location"
              className="rounded-xl"
            ></iframe>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-16 bg-gray-50 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Visit Our Store</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Parking</h3>
              <p className="text-gray-600">Convenient parking available in front of the store and nearby public parking areas.</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Public Transport</h3>
              <p className="text-gray-600">Easily accessible by bus and auto-rickshaws. The store is located near Anna Arch bus stop.</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Accessibility</h3>
              <p className="text-gray-600">Our store is wheelchair accessible with ramps and wide aisles for easy navigation.</p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

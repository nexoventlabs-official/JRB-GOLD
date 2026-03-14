import { useState } from 'react';
import { Calendar, Clock, User, Mail, Phone, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

type TimeSlot = {
  time: string;
  available: boolean;
};

const Consultation = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [step, setStep] = useState<number>(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  // Generate time slots from 9 AM to 6 PM
  const timeSlots: TimeSlot[] = [
    { time: '09:00 AM', available: true },
    { time: '10:00 AM', available: true },
    { time: '11:00 AM', available: false },
    { time: '12:00 PM', available: true },
    { time: '01:00 PM', available: true },
    { time: '02:00 PM', available: true },
    { time: '03:00 PM', available: false },
    { time: '04:00 PM', available: true },
    { time: '05:00 PM', available: true },
    { time: '06:00 PM', available: true },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    console.log('Form submitted:', {
      ...formData,
      date: date ? format(date, 'PPP') : '',
      time: selectedTime,
    });
    
    // Move to confirmation step
    setStep(3);
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-2">Select a Date</h3>
        <div className="rounded-md border p-4">
          <CalendarComponent
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border"
            disabled={(date) => date < new Date() || date > new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)}
          />
        </div>
      </div>
      <div>
        <h3 className="text-lg font-medium mb-2">Available Time Slots</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {timeSlots.map((slot) => (
            <Button
              key={slot.time}
              variant={selectedTime === slot.time ? 'default' : 'outline'}
              disabled={!slot.available}
              onClick={() => handleTimeSelect(slot.time)}
              className={`${!slot.available ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {slot.time}
            </Button>
          ))}
        </div>
      </div>
      <div className="flex justify-end">
        <Button 
          onClick={() => setStep(2)} 
          disabled={!date || !selectedTime}
        >
          Continue
        </Button>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-1">
            Full Name
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              id="name"
              name="name"
              type="text"
              required
              value={formData.name}
              onChange={handleInputChange}
              className="pl-10"
              placeholder="John Doe"
            />
          </div>
        </div>
        
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1">
            Email
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleInputChange}
              className="pl-10"
              placeholder="your@email.com"
            />
          </div>
        </div>
        
        <div>
          <label htmlFor="phone" className="block text-sm font-medium mb-1">
            Phone Number
          </label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              id="phone"
              name="phone"
              type="tel"
              required
              value={formData.phone}
              onChange={handleInputChange}
              className="pl-10"
              placeholder="+1 (555) 000-0000"
            />
          </div>
        </div>
        
        <div>
          <label htmlFor="message" className="block text-sm font-medium mb-1">
            What would you like to discuss?
          </label>
          <div className="relative">
            <MessageSquare className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              className="pl-10 min-h-[120px]"
              placeholder="Tell us about your jewelry needs or any specific requirements..."
            />
          </div>
        </div>
        
        <div className="pt-2">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-medium mb-2">Your Appointment</h4>
            <div className="space-y-1 text-sm text-gray-600">
              <p><span className="font-medium">Date:</span> {date ? format(date, 'PPP') : ''}</p>
              <p><span className="font-medium">Time:</span> {selectedTime}</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex justify-between pt-4">
        <Button 
          type="button" 
          variant="outline" 
          onClick={() => setStep(1)}
        >
          Back
        </Button>
        <Button type="submit">
          Schedule Consultation
        </Button>
      </div>
    </form>
  );

  const renderConfirmation = () => (
    <div className="text-center py-12">
      <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100">
        <svg
          className="h-10 w-10 text-green-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>
      <h3 className="mt-4 text-2xl font-medium text-gray-900">
        Consultation Scheduled!
      </h3>
      <p className="mt-2 text-gray-600">
        We've sent a confirmation to {formData.email} with all the details.
      </p>
      <div className="mt-8 bg-gray-50 p-6 rounded-lg text-left max-w-md mx-auto">
        <h4 className="font-medium text-gray-900">Appointment Details</h4>
        <dl className="mt-2 space-y-2 text-sm">
          <div className="flex">
            <dt className="w-24 text-gray-500">Date:</dt>
            <dd className="text-gray-900">{date ? format(date, 'PPP') : ''}</dd>
          </div>
          <div className="flex">
            <dt className="w-24 text-gray-500">Time:</dt>
            <dd className="text-gray-900">{selectedTime}</dd>
          </div>
          <div className="flex">
            <dt className="w-24 text-gray-500">Name:</dt>
            <dd className="text-gray-900">{formData.name}</dd>
          </div>
          <div className="flex">
            <dt className="w-24 text-gray-500">Contact:</dt>
            <dd className="text-gray-900">{formData.phone || formData.email}</dd>
          </div>
        </dl>
      </div>
      <div className="mt-8">
        <Button onClick={() => window.location.href = '/'}>
          Back to Home
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Schedule a Consultation
            </h1>
            <p className="mt-4 text-lg text-gray-600">
              Book a one-on-one session with our jewelry experts
            </p>
          </div>
          
          <div className="bg-white shadow rounded-lg p-6 sm:p-8">
            {step === 1 && renderStep1()}
            {step === 2 && renderStep2()}
            {step === 3 && renderConfirmation()}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Consultation;

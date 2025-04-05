
import { Button } from "@/components/ui/button";
import { WashingMachine, CalendarCheck, TruckIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  const handleBooking = () => {
    // Scroll to booking form section
    const bookingSection = document.getElementById("booking");
    if (bookingSection) {
      bookingSection.scrollIntoView({ behavior: "smooth" });
    } else {
      // If not on homepage, navigate to homepage with booking section
      navigate("/?section=booking");
    }
  };

  return (
    <div className="bg-gradient-to-r from-amber-50 to-orange-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              <span className="text-amber-600">Campus Laundry</span> Made Simple
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Affordable, convenient laundry service designed specifically for busy college students.
            </p>
            <div className="space-y-4 mb-8">
              <div className="flex items-start">
                <div className="mt-1 bg-amber-100 p-2 rounded-full">
                  <WashingMachine className="h-5 w-5 text-amber-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">Professional Cleaning</h3>
                  <p className="text-gray-500">Quality washing that treats your clothes with care</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="mt-1 bg-amber-100 p-2 rounded-full">
                  <CalendarCheck className="h-5 w-5 text-amber-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">Flexible Scheduling</h3>
                  <p className="text-gray-500">Book pickups and deliveries around your class schedule</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="mt-1 bg-amber-100 p-2 rounded-full">
                  <TruckIcon className="h-5 w-5 text-amber-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">Free Campus Delivery</h3>
                  <p className="text-gray-500">Doorstep service to your hostel or apartment</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Button 
                size="lg" 
                className="bg-amber-600 hover:bg-amber-700"
                onClick={handleBooking}
              >
                Book First Pickup
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-amber-600 text-amber-600 hover:bg-amber-50"
                onClick={() => {
                  const pricingSection = document.getElementById("pricing");
                  if (pricingSection) {
                    pricingSection.scrollIntoView({ behavior: "smooth" });
                  }
                }}
              >
                See Pricing
              </Button>
            </div>
          </div>
          <div className="hidden md:block relative">
            <div className="absolute -top-6 -left-6 w-24 h-24 bg-orange-300 rounded-full opacity-20"></div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-amber-300 rounded-full opacity-20"></div>
            <img 
              src="https://images.unsplash.com/photo-1604335399105-a0c585fd81a1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80" 
              alt="Indian students with laundry" 
              className="rounded-lg shadow-xl animate-fade-in w-full h-auto object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;

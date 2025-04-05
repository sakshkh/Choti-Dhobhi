
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Shirt, Sparkles, Clock, Leaf } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

// Define proper type for price object
type PriceData = {
  amount: string;
  unit: string;
  features: string[];
};

const ServicesCard = ({ 
  icon: Icon, 
  title, 
  description, 
  price,
  onSelect 
}: { 
  icon: React.ElementType; 
  title: string; 
  description: string; 
  price: PriceData;
  onSelect: () => void;
}) => (
  <Card className="hover:shadow-lg transition-shadow duration-300 h-full border-amber-200">
    <CardHeader className="pb-2">
      <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center mb-4">
        <Icon className="text-amber-600 w-6 h-6" />
      </div>
      <CardTitle className="text-xl">{title}</CardTitle>
      <CardDescription>{description}</CardDescription>
    </CardHeader>
    <CardContent className="text-gray-600">
      <ul className="space-y-2">
        {price.features.map((feature, index) => (
          <li key={index} className="flex items-center">
            <div className="w-5 h-5 rounded-full bg-amber-100 flex items-center justify-center mr-2">
              <span className="text-amber-600 text-xs">✓</span>
            </div>
            {feature}
          </li>
        ))}
      </ul>
    </CardContent>
    <CardFooter>
      <div className="mt-4 text-xl font-semibold text-amber-600">
        {price.amount}
        <span className="text-sm font-normal text-gray-500">{price.unit}</span>
      </div>
      <Button 
        variant="outline" 
        className="ml-auto border-amber-600 text-amber-600 hover:bg-amber-50"
        onClick={onSelect}
      >
        Select Service
      </Button>
    </CardFooter>
  </Card>
);

const Services = () => {
  const navigate = useNavigate();
  
  const handleServiceSelect = (service: string) => {
    // Navigate to booking section with the selected service
    const bookingSection = document.getElementById("booking");
    if (bookingSection) {
      // Set the service type in localStorage or state management
      localStorage.setItem("selectedService", service);
      bookingSection.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/?section=booking");
    }
  };

  const services = [
    {
      icon: Shirt,
      title: "Wash & Fold",
      description: "Our most popular service for everyday laundry",
      price: {
        amount: "₹120",
        unit: "/kg",
        features: [
          "Mixed clothing items",
          "Washed, dried & neatly folded",
          "24-48 hour turnaround",
          "Free campus delivery"
        ]
      }
    },
    {
      icon: Sparkles,
      title: "Dry Cleaning",
      description: "Professional care for your formal wear",
      price: {
        amount: "₹399",
        unit: "/item",
        features: [
          "Suits, dresses & formal wear",
          "Stain treatment included",
          "Pressed & hung on hangers",
          "48-72 hour turnaround"
        ]
      }
    },
    {
      icon: Clock,
      title: "Express Service",
      description: "For when you need clean clothes fast",
      price: {
        amount: "₹180",
        unit: "/kg",
        features: [
          "Same-day service",
          "Order by 10am",
          "Delivery by 6pm",
          "Available Mon-Fri"
        ]
      }
    },
    {
      icon: Leaf,
      title: "Eco-Friendly",
      description: "Environmentally conscious cleaning",
      price: {
        amount: "₹140",
        unit: "/kg",
        features: [
          "Plant-based detergents",
          "Energy-efficient machines",
          "Reduced water usage",
          "Eco-friendly packaging"
        ]
      }
    }
  ];

  return (
    <section id="services" className="section-padding bg-white relative z-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Services</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Professional laundry services designed with college students in mind. Affordable, reliable, and convenient.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <ServicesCard
              key={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
              price={service.price}
              onSelect={() => handleServiceSelect(service.title)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;

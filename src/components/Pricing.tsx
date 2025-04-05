
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";

type PlanFeature = {
  feature: string;
  included: boolean;
};

type PricingPlan = {
  name: string;
  price: string;
  description: string;
  period: string;
  buttonText: string;
  features: PlanFeature[];
  popular?: boolean;
};

const PricingCard = ({ plan }: { plan: PricingPlan }) => {
  const navigate = useNavigate();
  
  const handlePlanSelect = () => {
    toast({
      title: "Plan Selected",
      description: `You've selected the ${plan.name} plan. Please complete your booking.`,
    });
    
    // Store the selected plan in localStorage or state management
    localStorage.setItem("selectedPlan", plan.name);
    localStorage.setItem("planPrice", plan.price);
    
    // Scroll to booking section or navigate to booking page
    const bookingSection = document.getElementById("booking");
    if (bookingSection) {
      bookingSection.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/?section=booking");
    }
  };

  return (
    <div className={`relative rounded-lg border ${plan.popular ? 'border-amber-500 shadow-lg' : 'border-gray-200'} p-6 lg:p-8 h-full flex flex-col`}>
      {plan.popular && (
        <div className="absolute top-0 right-0 bg-amber-500 text-white text-xs font-semibold px-3 py-1 rounded-bl-lg rounded-tr-lg">
          Most Popular
        </div>
      )}
      <div>
        <h3 className="text-xl font-semibold mb-1">{plan.name}</h3>
        <p className="text-gray-600 mb-4 text-sm">{plan.description}</p>
        <div className="mb-6">
          <span className="text-3xl font-bold">{plan.price}</span>
          <span className="text-gray-600">/{plan.period}</span>
        </div>
      </div>
      <div className="mb-6 flex-grow">
        <ul className="space-y-3">
          {plan.features.map((item, index) => (
            <li key={index} className={`flex items-start ${item.included ? '' : 'text-gray-400'}`}>
              <Check size={18} className={`mt-0.5 mr-2 ${item.included ? 'text-amber-500' : 'text-gray-300'}`} />
              <span>{item.feature}</span>
            </li>
          ))}
        </ul>
      </div>
      <Button 
        variant={plan.popular ? "default" : "outline"} 
        className={`w-full ${plan.popular ? 'bg-amber-600 hover:bg-amber-700' : 'border-amber-600 text-amber-600 hover:bg-amber-50'}`}
        onClick={handlePlanSelect}
      >
        {plan.buttonText}
      </Button>
    </div>
  );
};

const Pricing = () => {
  const plans: PricingPlan[] = [
    {
      name: "Basic Wash",
      price: "₹1499",
      description: "Perfect for light loads",
      period: "week",
      buttonText: "Choose Plan",
      features: [
        { feature: "8 kg of laundry per week", included: true },
        { feature: "Wash & fold service", included: true },
        { feature: "Weekly pickup & delivery", included: true },
        { feature: "48-hour turnaround", included: true },
        { feature: "Stain treatment", included: false },
        { feature: "Special garment care", included: false }
      ]
    },
    {
      name: "Campus Pro",
      price: "₹2499",
      description: "Our most popular plan",
      period: "week",
      buttonText: "Choose This Plan",
      popular: true,
      features: [
        { feature: "15 kg of laundry per week", included: true },
        { feature: "Wash & fold service", included: true },
        { feature: "Twice weekly pickup & delivery", included: true },
        { feature: "24-hour turnaround", included: true },
        { feature: "Stain treatment", included: true },
        { feature: "Special garment care", included: false }
      ]
    },
    {
      name: "Ultimate",
      price: "₹3499",
      description: "For heavy laundry needs",
      period: "week",
      buttonText: "Choose Plan",
      features: [
        { feature: "25 kg of laundry per week", included: true },
        { feature: "Wash & fold service", included: true },
        { feature: "On-demand pickup & delivery", included: true },
        { feature: "Same-day service option", included: true },
        { feature: "Stain treatment", included: true },
        { feature: "Special garment care", included: true }
      ]
    }
  ];

  return (
    <section id="pricing" className="section-padding bg-gradient-to-r from-amber-50 to-orange-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose the plan that fits your laundry needs and budget. All plans include free campus delivery.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <PricingCard key={index} plan={plan} />
          ))}
        </div>
        
        <div className="mt-12 bg-white p-6 rounded-lg shadow-sm border border-gray-100 max-w-2xl mx-auto text-center">
          <h3 className="text-lg font-semibold mb-2">Need a custom plan?</h3>
          <p className="text-gray-600 mb-4">
            We offer special rates for student organizations, hostels, and sports teams.
          </p>
          <Button variant="outline" className="border-amber-600 text-amber-600 hover:bg-amber-50">
            Contact for Group Rates
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Pricing;


import { Package, Calendar, TruckIcon, Sparkles } from "lucide-react";

const Step = ({ 
  number, 
  title, 
  description, 
  icon: Icon
}: { 
  number: number; 
  title: string; 
  description: string; 
  icon: React.ElementType;
}) => (
  <div className="flex flex-col items-center text-center md:items-start md:text-left">
    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-laundry-600 text-white font-bold mb-4">
      {number}
    </div>
    <div className="mb-4">
      <Icon className="mx-auto md:mx-0 h-8 w-8 text-laundry-500" />
    </div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="section-padding bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choti Dhobi makes laundry day a breeze with our simple 4-step process designed for busy students.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          <Step 
            number={1} 
            title="Bag Your Laundry" 
            description="Pack your dirty clothes in our free laundry bags (or your own)."
            icon={Package} 
          />
          <Step 
            number={2} 
            title="Schedule Pickup" 
            description="Book a convenient pickup time through our simple online form."
            icon={Calendar} 
          />
          <Step 
            number={3} 
            title="We Clean" 
            description="Our team professionally washes, dries, and folds your clothes."
            icon={Sparkles} 
          />
          <Step 
            number={4} 
            title="We Deliver" 
            description="Clean laundry delivered right to your door at your scheduled time."
            icon={TruckIcon} 
          />
        </div>
        
        <div className="mt-16 bg-white p-8 rounded-lg shadow-sm border border-gray-100">
          <div className="flex flex-col md:flex-row items-center">
            <div className="mb-6 md:mb-0 md:mr-8">
              <img 
                src="https://images.unsplash.com/photo-1604335399105-a0c585fd81a1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" 
                alt="Student using laundry service" 
                className="rounded-lg h-64 w-full md:w-80 object-cover"
              />
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-4">Choti Dhobi Student Guarantee</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="h-5 w-5 rounded-full bg-accent-100 flex items-center justify-center mr-2 mt-0.5">
                    <span className="text-accent-600 text-xs">✓</span>
                  </span>
                  <span className="text-gray-700">Affordable pricing with student discounts</span>
                </li>
                <li className="flex items-start">
                  <span className="h-5 w-5 rounded-full bg-accent-100 flex items-center justify-center mr-2 mt-0.5">
                    <span className="text-accent-600 text-xs">✓</span>
                  </span>
                  <span className="text-gray-700">Consistent quality with satisfaction guarantee</span>
                </li>
                <li className="flex items-start">
                  <span className="h-5 w-5 rounded-full bg-accent-100 flex items-center justify-center mr-2 mt-0.5">
                    <span className="text-accent-600 text-xs">✓</span>
                  </span>
                  <span className="text-gray-700">Flexible around exam schedules and campus events</span>
                </li>
                <li className="flex items-start">
                  <span className="h-5 w-5 rounded-full bg-accent-100 flex items-center justify-center mr-2 mt-0.5">
                    <span className="text-accent-600 text-xs">✓</span>
                  </span>
                  <span className="text-gray-700">Servicing all campus dorms and nearby apartments</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;

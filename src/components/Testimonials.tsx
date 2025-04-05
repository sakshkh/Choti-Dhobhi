
import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";

type TestimonialProps = {
  name: string;
  role: string;
  content: string;
  avatar: string;
  rating: number;
};

const TestimonialCard = ({ name, role, content, avatar, rating }: TestimonialProps) => (
  <Card className="h-full border-accent-200 hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-white to-laundry-50">
    <CardContent className="pt-6">
      <div className="flex items-center space-x-2 mb-3">
        {Array(5).fill(0).map((_, i) => (
          <Star 
            key={i} 
            size={16} 
            className={i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"} 
          />
        ))}
      </div>
      <p className="text-gray-700 mb-6 italic leading-relaxed">"{content}"</p>
      <div className="flex items-center">
        <div className="relative">
          <img 
            src={avatar} 
            alt={name}
            className="w-12 h-12 rounded-full object-cover border-2 border-accent-200"
          />
          <div className="absolute -bottom-1 -right-1 bg-accent-500 rounded-full w-5 h-5 flex items-center justify-center">
            <Star size={10} className="text-white fill-white" />
          </div>
        </div>
        <div className="ml-4">
          <p className="font-semibold text-gray-900">{name}</p>
          <p className="text-sm text-accent-600">{role}</p>
        </div>
      </div>
    </CardContent>
  </Card>
);

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const testimonials = [
    {
      name: "Jessica Wang",
      role: "Economics Student",
      content: "Choti Dhobi has been a lifesaver during finals week! No more wasting hours at the laundromat when I should be studying. Their service is reliable and their app makes scheduling so convenient.",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
      rating: 5
    },
    {
      name: "Raj Patel",
      role: "Computer Science Major",
      content: "The pickup and delivery service is so convenient. The app makes it easy to schedule and their prices are very reasonable for students. I've recommended them to everyone in my dorm.",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
      rating: 4
    },
    {
      name: "Taylor Johnson",
      role: "Pre-Med Student",
      content: "I love how they properly handle my scrubs and lab coats. Always clean, always on time. Their eco-friendly options are perfect for someone who cares about environmental impact.",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
      rating: 5
    },
    {
      name: "Michael Chen",
      role: "MBA Student",
      content: "As someone with a busy schedule, having laundry taken care of is a huge time-saver. Their subscription plan gives me one less thing to worry about every week.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
      rating: 5
    },
    {
      name: "Sophia Rodriguez",
      role: "Art & Design Student",
      content: "They take special care with my delicate fabrics and art supplies. The stain removal service saved my favorite paint-splattered jeans!",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
      rating: 4
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <section className="section-padding bg-gradient-to-b from-white to-laundry-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-laundry-600 to-accent-600 bg-clip-text text-transparent inline-block">What Students Say</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Hundreds of busy students trust us with their laundry every week. Here's what some of them have to say.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.slice(0, 3).map((testimonial, index) => (
            <TestimonialCard
              key={index}
              name={testimonial.name}
              role={testimonial.role}
              content={testimonial.content}
              avatar={testimonial.avatar}
              rating={testimonial.rating}
            />
          ))}
        </div>

        <div className="flex justify-center mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`w-3 h-3 rounded-full mx-1 ${
                activeIndex === index ? "bg-accent-500" : "bg-gray-300"
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;


import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQSection = () => {
  const faqs = [
    {
      question: "How does the pickup and delivery process work?",
      answer: "We schedule pickups and deliveries around your class schedule. When you book, you'll select a time slot for pickup. We'll text you 30 minutes before arrival. You can either hand off your laundry in person or leave it at your door in one of our bags. We'll return your clean laundry at your scheduled delivery time."
    },
    {
      question: "What if I have special care instructions for certain items?",
      answer: "You can add special care instructions when scheduling your pickup. We have tags you can attach to specific garments with care instructions, or you can note any special requirements in the app for your entire order."
    },
    {
      question: "How do you handle lost or damaged items?",
      answer: "We take great care with your clothes, but in the rare case something is lost or damaged, we have a simple claims process. Submit a claim within 48 hours of delivery, and we'll either repair, replace, or reimburse you for the item based on our fair compensation policy."
    },
    {
      question: "Can I change my subscription plan?",
      answer: "Absolutely! You can upgrade, downgrade or cancel your subscription at any time through your account. Changes will be effective in the next billing cycle. There's no long-term commitment required."
    },
    {
      question: "Do you provide services during school breaks?",
      answer: "We adjust our service schedule around the academic calendar. We offer limited service during shorter breaks like Thanksgiving and Spring Break, and suspend regular service during summer and winter breaks. We'll send notifications before breaks begin."
    },
    {
      question: "What products do you use for washing?",
      answer: "We use high-quality, hypoallergenic detergents that are effective yet gentle. If you have allergies or preferences, you can request fragrance-free options or provide your own detergent for a personalized experience."
    }
  ];

  return (
    <section id="faq" className="section-padding bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Have questions? We've got answers. If you don't see what you're looking for, feel free to contact us.
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left font-medium">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;

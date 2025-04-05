
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

// Component for Invoice
const Invoice = ({ 
  customerDetails, 
  serviceType, 
  date, 
  total, 
  invoiceNumber 
}: { 
  customerDetails: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
  };
  serviceType: string;
  date: Date | undefined;
  total: number;
  invoiceNumber: string;
}) => (
  <div className="bg-white p-6 rounded-lg border border-gray-200 mb-6">
    <div className="flex justify-between items-center mb-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">INVOICE</h2>
        <p className="text-gray-600">#{invoiceNumber}</p>
      </div>
      <div className="text-right">
        <p className="font-bold text-lg">Choti Dhobi</p>
        <p className="text-sm text-gray-600">VIT Vellore Campus</p>
        <p className="text-sm text-gray-600">Vellore, Tamil Nadu 632014</p>
      </div>
    </div>

    <div className="grid grid-cols-2 gap-6 mb-6">
      <div>
        <p className="font-semibold mb-1">Bill To:</p>
        <p>{customerDetails.firstName} {customerDetails.lastName}</p>
        <p>{customerDetails.email}</p>
        <p>{customerDetails.phone}</p>
        <p className="max-w-xs">{customerDetails.address}</p>
      </div>
      <div className="text-right">
        <p className="font-semibold mb-1">Date:</p>
        <p>{date ? format(date, 'PPP') : 'Not specified'}</p>
        <p className="font-semibold mt-2 mb-1">Service Type:</p>
        <p>{serviceType}</p>
      </div>
    </div>

    <div className="border-t border-b border-gray-200 py-4 mb-4">
      <div className="grid grid-cols-5 font-semibold mb-2">
        <div className="col-span-3">Description</div>
        <div className="text-right">Qty</div>
        <div className="text-right">Amount</div>
      </div>
      <div className="grid grid-cols-5">
        <div className="col-span-3">{serviceType} Service</div>
        <div className="text-right">1</div>
        <div className="text-right">₹{total.toFixed(2)}</div>
      </div>
    </div>

    <div className="flex justify-end">
      <div className="w-64">
        <div className="flex justify-between mb-2">
          <span>Subtotal:</span>
          <span>₹{total.toFixed(2)}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span>Tax (18% GST):</span>
          <span>₹{(total * 0.18).toFixed(2)}</span>
        </div>
        <div className="flex justify-between font-bold text-lg border-t border-gray-200 pt-2">
          <span>Total:</span>
          <span>₹{(total * 1.18).toFixed(2)}</span>
        </div>
      </div>
    </div>

    <div className="mt-8 text-center text-sm text-gray-600">
      <p>Thank you for your business!</p>
      <p>For questions regarding this invoice, please contact info@chotidhobi.com</p>
    </div>
  </div>
);

const BookingForm = () => {
  const { toast } = useToast();
  const [date, setDate] = useState<Date>();
  const [serviceType, setServiceType] = useState("wash-fold");
  const [showInvoice, setShowInvoice] = useState(false);
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [customerDetails, setCustomerDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: ""
  });
  const [total, setTotal] = useState(999);
  
  // Get selected service or plan from localStorage
  useEffect(() => {
    const selectedService = localStorage.getItem("selectedService");
    const selectedPlan = localStorage.getItem("selectedPlan");
    
    if (selectedService) {
      switch(selectedService) {
        case "Wash & Fold":
          setServiceType("wash-fold");
          setTotal(999);
          break;
        case "Dry Cleaning":
          setServiceType("dry-clean");
          setTotal(1499);
          break;
        case "Express Service":
          setServiceType("express");
          setTotal(1299);
          break;
        case "Eco-Friendly":
          setServiceType("eco");
          setTotal(1099);
          break;
      }
      // Clear after using
      localStorage.removeItem("selectedService");
    } else if (selectedPlan) {
      const planPrice = localStorage.getItem("planPrice");
      if (selectedPlan === "Basic Wash") {
        setServiceType("wash-fold");
        setTotal(1499);
      } else if (selectedPlan === "Campus Pro") {
        setServiceType("wash-fold");
        setTotal(2499);
      } else if (selectedPlan === "Ultimate") {
        setServiceType("wash-fold");
        setTotal(3499);
      }
      
      // Clear after using
      localStorage.removeItem("selectedPlan");
      localStorage.removeItem("planPrice");
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setCustomerDetails(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleServiceChange = (value: string) => {
    setServiceType(value);
    
    // Update total based on service type
    switch(value) {
      case "wash-fold":
        setTotal(999);
        break;
      case "dry-clean":
        setTotal(1499);
        break;
      case "express":
        setTotal(1299);
        break;
      case "eco":
        setTotal(1099);
        break;
    }
  };

  const saveBookingToSupabase = async () => {
    try {
      // Generate a random invoice number
      const newInvoiceNumber = "INV" + Math.floor(100000 + Math.random() * 900000);
      setInvoiceNumber(newInvoiceNumber);
      
      // Save booking to Supabase
      const { data, error } = await supabase
        .from('bookings')
        .insert([
          { 
            first_name: customerDetails.firstName,
            last_name: customerDetails.lastName,
            email: customerDetails.email,
            phone: customerDetails.phone,
            service_type: serviceType,
            pickup_date: date,
            address: customerDetails.address,
            total_amount: (total * 1.18), // Including tax
            invoice_number: newInvoiceNumber
          }
        ]);
        
      if (error) {
        console.error("Error saving booking:", error);
        toast({
          title: "Booking Failed",
          description: "There was an error saving your booking. Please try again.",
          variant: "destructive",
        });
        return false;
      }
      
      return true;
    } catch (err) {
      console.error("Error:", err);
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Form validation
    if (!customerDetails.firstName || !customerDetails.lastName || 
        !customerDetails.email || !customerDetails.phone || 
        !date || !customerDetails.address) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }
    
    try {
      // Save booking to Supabase or show mock invoice
      const success = await saveBookingToSupabase();
      
      if (success) {
        setShowInvoice(true);
        toast({
          title: "Booking Received!",
          description: "Your invoice has been generated. We'll confirm your pickup shortly.",
          variant: "default",
        });
      }
    } catch (error) {
      console.error("Error creating booking:", error);
      toast({
        title: "Booking Failed",
        description: "There was an error processing your booking. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <section id="booking" className="section-padding bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Book Your Laundry Pickup</h2>
            <p className="text-lg text-gray-600 mb-8">
              Schedule a convenient pickup time and we'll handle the rest. First-time customer? Enjoy 20% off your first order!
            </p>
            
            <div className="bg-amber-50 border border-amber-100 rounded-lg p-6 mb-8">
              <h3 className="text-xl font-semibold text-amber-800 mb-4">Simple Pricing</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-2 border-b border-amber-100">
                  <span className="font-medium">Wash & Fold</span>
                  <span>₹120/kg</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-amber-100">
                  <span className="font-medium">Dry Cleaning</span>
                  <span>₹399/item</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-amber-100">
                  <span className="font-medium">Express Service</span>
                  <span>₹180/kg</span>
                </div>
                <div className="flex justify-between items-center pb-2">
                  <span className="font-medium">Eco-Friendly</span>
                  <span>₹140/kg</span>
                </div>
              </div>
              <div className="mt-4 text-sm text-gray-600">
                *Minimum order ₹999. Free delivery for orders over ₹1499.
              </div>
            </div>
            
            <div className="bg-amber-50 border border-amber-100 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-amber-800 mb-4">Student Discounts</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="h-5 w-5 rounded-full bg-amber-100 flex items-center justify-center mr-2 mt-0.5">
                    <span className="text-amber-600 text-xs">✓</span>
                  </span>
                  <span>20% off first order with code STUDENT20</span>
                </li>
                <li className="flex items-start">
                  <span className="h-5 w-5 rounded-full bg-amber-100 flex items-center justify-center mr-2 mt-0.5">
                    <span className="text-amber-600 text-xs">✓</span>
                  </span>
                  <span>10% off monthly subscription plans</span>
                </li>
                <li className="flex items-start">
                  <span className="h-5 w-5 rounded-full bg-amber-100 flex items-center justify-center mr-2 mt-0.5">
                    <span className="text-amber-600 text-xs">✓</span>
                  </span>
                  <span>15% off during exam weeks (with valid student ID)</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div>
            {showInvoice ? (
              <Invoice 
                customerDetails={customerDetails}
                serviceType={
                  serviceType === 'wash-fold' ? 'Wash & Fold' :
                  serviceType === 'dry-clean' ? 'Dry Cleaning' :
                  serviceType === 'express' ? 'Express Service' : 'Eco-Friendly'
                }
                date={date}
                total={total}
                invoiceNumber={invoiceNumber}
              />
            ) : (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
                <h3 className="text-2xl font-semibold mb-6">Schedule Pickup</h3>
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input 
                        id="firstName" 
                        placeholder="Your first name" 
                        required 
                        value={customerDetails.firstName}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input 
                        id="lastName" 
                        placeholder="Your last name" 
                        required 
                        value={customerDetails.lastName}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2 mb-6">
                    <Label htmlFor="email">Email Address</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="your.email@vit.ac.in" 
                      required 
                      value={customerDetails.email}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div className="space-y-2 mb-6">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input 
                      id="phone" 
                      type="tel" 
                      placeholder="+91 98765 43210" 
                      required 
                      value={customerDetails.phone}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div className="space-y-2 mb-6">
                    <Label>Service Type</Label>
                    <RadioGroup 
                      value={serviceType} 
                      onValueChange={handleServiceChange}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="wash-fold" id="wash-fold" />
                        <Label htmlFor="wash-fold">Wash & Fold (₹120/kg)</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="dry-clean" id="dry-clean" />
                        <Label htmlFor="dry-clean">Dry Cleaning (₹399/item)</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="express" id="express" />
                        <Label htmlFor="express">Express Service (₹180/kg)</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="eco" id="eco" />
                        <Label htmlFor="eco">Eco-Friendly (₹140/kg)</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                    <div className="space-y-2">
                      <Label>Pickup Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full justify-start text-left font-normal"
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {date ? format(date, "PPP") : <span>Pick a date</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    <div className="space-y-2">
                      <Label>Pickup Time</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select time" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="morning">9:00 AM - 12:00 PM</SelectItem>
                          <SelectItem value="afternoon">12:00 PM - 3:00 PM</SelectItem>
                          <SelectItem value="evening">3:00 PM - 6:00 PM</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="space-y-2 mb-6">
                    <Label htmlFor="address">Pickup Address</Label>
                    <Textarea 
                      id="address" 
                      placeholder="Hostel name, room number or campus address" 
                      value={customerDetails.address}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div className="space-y-2 mb-8">
                    <Label htmlFor="instructions">Special Instructions</Label>
                    <Textarea id="instructions" placeholder="Any special handling instructions or notes" />
                  </div>
                  
                  <Button type="submit" className="w-full bg-amber-600 hover:bg-amber-700">
                    Book Pickup & Generate Invoice
                  </Button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookingForm;

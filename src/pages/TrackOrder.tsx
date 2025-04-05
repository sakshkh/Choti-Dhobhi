
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Truck, Package, CheckCircle, ClipboardList, Loader2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { toast } from "@/components/ui/use-toast";

// Mock order statuses for demonstration
const ORDER_STATUSES = {
  "ORD123456": {
    status: "in_transit" as OrderStatus,
    details: {
      customer: "John Doe",
      orderedOn: "2023-04-02",
      items: "8 lbs - Wash & Fold",
      estimatedDelivery: "2023-04-04",
      lastUpdate: "Your laundry is on the way to your hostel",
    }
  },
  "ORD654321": {
    status: "processing" as OrderStatus,
    details: {
      customer: "Jane Smith",
      orderedOn: "2023-04-03",
      items: "3 items - Dry Cleaning",
      estimatedDelivery: "2023-04-05",
      lastUpdate: "Your clothes are being cleaned",
    }
  },
  "ORD789012": {
    status: "completed" as OrderStatus,
    details: {
      customer: "Alex Johnson",
      orderedOn: "2023-04-01",
      items: "12 lbs - Wash & Fold",
      estimatedDelivery: "2023-04-03",
      lastUpdate: "Your order has been delivered",
    }
  }
};

type OrderStatus = "processing" | "in_transit" | "completed";

const StatusStep = ({ 
  title, 
  description, 
  icon: Icon, 
  active, 
  completed 
}: { 
  title: string; 
  description: string; 
  icon: React.ElementType; 
  active: boolean; 
  completed: boolean;
}) => (
  <div className={`flex items-start ${active ? "opacity-100" : "opacity-60"}`}>
    <div className={`
      flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center mr-4
      ${completed ? "bg-green-100" : active ? "bg-amber-100" : "bg-gray-100"}
    `}>
      <Icon 
        className={`w-5 h-5 ${
          completed ? "text-green-600" : active ? "text-amber-600" : "text-gray-400"
        }`} 
      />
    </div>
    <div>
      <p className={`font-medium ${
        completed ? "text-green-600" : active ? "text-amber-600" : "text-gray-400"
      }`}>
        {title}
      </p>
      <p className="text-sm text-gray-500">{description}</p>
    </div>
  </div>
);

const OrderTrackingDisplay = ({ status, details }: { 
  status: OrderStatus; 
  details: {
    customer: string;
    orderedOn: string;
    items: string;
    estimatedDelivery: string;
    lastUpdate: string;
  };
}) => {
  const statusMap = {
    processing: 1,
    in_transit: 2,
    completed: 3
  };
  
  const currentStep = statusMap[status];

  return (
    <div className="mt-6 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <div className="mb-6">
        <h3 className="text-lg font-medium text-gray-900">Order Details</h3>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Customer</p>
            <p className="font-medium">{details.customer}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Ordered On</p>
            <p className="font-medium">{details.orderedOn}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Items</p>
            <p className="font-medium">{details.items}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Estimated Delivery</p>
            <p className="font-medium">{details.estimatedDelivery}</p>
          </div>
        </div>
      </div>
      
      <div className="mb-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Tracking Status</h3>
        <div className="space-y-6">
          <StatusStep
            icon={ClipboardList}
            title="Order Received"
            description="We've received your laundry order"
            active={true}
            completed={true}
          />
          <StatusStep
            icon={Package}
            title="Processing"
            description="Your laundry is being cleaned"
            active={currentStep >= 1}
            completed={currentStep > 1}
          />
          <StatusStep
            icon={Truck}
            title="In Transit"
            description="Your clean laundry is on its way"
            active={currentStep >= 2}
            completed={currentStep > 2}
          />
          <StatusStep
            icon={CheckCircle}
            title="Delivered"
            description="Your laundry has been delivered"
            active={currentStep >= 3}
            completed={currentStep >= 3}
          />
        </div>
      </div>
      
      <div className="p-4 bg-amber-50 rounded-lg">
        <p className="text-sm font-medium text-amber-800">Latest Update</p>
        <p className="text-sm text-amber-700">{details.lastUpdate}</p>
      </div>
    </div>
  );
};

const TrackOrder = () => {
  const [trackingId, setTrackingId] = useState("");
  const [orderData, setOrderData] = useState<null | {
    status: OrderStatus;
    details: {
      customer: string;
      orderedOn: string;
      items: string;
      estimatedDelivery: string;
      lastUpdate: string;
    };
  }>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleTracking = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Simulate API call with a delay
    setTimeout(() => {
      const foundOrder = ORDER_STATUSES[trackingId as keyof typeof ORDER_STATUSES];
      
      if (foundOrder) {
        setOrderData(foundOrder as {
          status: OrderStatus;
          details: {
            customer: string;
            orderedOn: string;
            items: string;
            estimatedDelivery: string;
            lastUpdate: string;
          };
        });
        setError("");
      } else {
        setOrderData(null);
        setError("No order found with this tracking ID. Please check and try again.");
        toast({
          title: "Order Not Found",
          description: "We couldn't find an order with that tracking ID.",
          variant: "destructive",
        });
      }
      
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white flex flex-col">
      <Navbar />
      <div className="flex-grow container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold mb-2">Track Your Order</h1>
            <p className="text-gray-600">Enter your order tracking ID to get real-time updates on your laundry</p>
          </div>

          <Card className="border-amber-200">
            <CardHeader>
              <CardTitle>Order Tracking</CardTitle>
              <CardDescription>Enter the tracking ID from your receipt or confirmation email</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleTracking} className="space-y-4">
                <div className="flex flex-col space-y-2">
                  <label htmlFor="tracking-id" className="text-sm font-medium">
                    Tracking ID
                  </label>
                  <div className="flex space-x-2">
                    <Input
                      id="tracking-id"
                      placeholder="e.g. ORD123456"
                      value={trackingId}
                      onChange={(e) => setTrackingId(e.target.value)}
                      className="flex-grow"
                    />
                    <Button 
                      type="submit" 
                      className="bg-amber-600 hover:bg-amber-700"
                      disabled={loading || !trackingId}
                    >
                      {loading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Tracking...
                        </>
                      ) : "Track Order"}
                    </Button>
                  </div>
                  {error && <p className="text-sm text-red-500">{error}</p>}
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex-col items-start">
              <p className="text-sm text-gray-500">
                For testing, try these IDs: ORD123456, ORD654321, ORD789012
              </p>
            </CardFooter>
          </Card>

          {orderData && (
            <OrderTrackingDisplay
              status={orderData.status}
              details={orderData.details}
            />
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TrackOrder;

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Calendar, Package, Settings, WashingMachine } from "lucide-react";


const mockOrders = [
  {
    id: "LD-98765",
    date: "2025-04-03",
    status: "In Progress",
    items: "Wash & Fold (3 lb), Dry Cleaning (2 items)",
    total: "$14.48",
    deliveryDate: "2025-04-05"
  },
  {
    id: "LD-87654",
    date: "2025-03-25",
    status: "Delivered",
    items: "Express Service (5 lb)",
    total: "$11.25",
    deliveryDate: "2025-03-26"
  },
  {
    id: "LD-76543",
    date: "2025-03-10",
    status: "Delivered",
    items: "Eco-Friendly (4 lb), Dry Cleaning (1 item)",
    total: "$12.00",
    deliveryDate: "2025-03-12"
  }
];

const Dashboard = () => {
  const navigate = useNavigate();
  const [user] = useState({
    name: "Sakshham Khanijau",
    email: "sakshham.khanijau2022@vitstudent.ac.in",
    points: 350
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-laundry-50 to-white">
      <Navbar />
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Welcome back, {user.name}</h1>
            <p className="text-lg text-gray-600">Manage your laundry orders and account details</p>
          </div>
          <div className="bg-gradient-to-r from-laundry-100 to-accent-100 p-3 rounded-lg mt-4 md:mt-0">
            <p className="text-sm text-gray-600">Loyalty Points</p>
            <p className="text-2xl font-bold text-accent-600">{user.points} pts</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="border-laundry-200 hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <div className="w-12 h-12 bg-laundry-100 rounded-full flex items-center justify-center mb-2">
                <WashingMachine className="h-6 w-6 text-laundry-600" />
              </div>
              <CardTitle className="text-lg">New Order</CardTitle>
              <CardDescription>Schedule a new laundry pickup</CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold"
                onClick={() => navigate("/")}
              >
                Book Now
              </Button>
            </CardContent>
          </Card>

          <Card className="border-laundry-200 hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <div className="w-12 h-12 bg-laundry-100 rounded-full flex items-center justify-center mb-2">
                <Package className="h-6 w-6 text-laundry-600" />
              </div>
              <CardTitle className="text-lg">Track Order</CardTitle>
              <CardDescription>Check the status of your orders</CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold"
                onClick={() => navigate("/track")}
              >
                Track Orders
              </Button>
            </CardContent>
          </Card>

          <Card className="border-laundry-200 hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <div className="w-12 h-12 bg-laundry-100 rounded-full flex items-center justify-center mb-2">
                <Calendar className="h-6 w-6 text-laundry-600" />
              </div>
              <CardTitle className="text-lg">Schedule</CardTitle>
              <CardDescription>Set up recurring pickups</CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold"
              >
                Schedule
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Your Orders</h2>
            <Button variant="outline" className="border-orange-500 text-orange-600 hover:bg-orange-50">
              View All
            </Button>
          </div>

          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Order ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Items
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {mockOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-laundry-600">
                        {order.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {order.date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          order.status === "Delivered" 
                            ? "bg-green-100 text-green-800" 
                            : "bg-laundry-100 text-laundry-800"
                        }`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                        {order.items}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {order.total}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          className="text-orange-600 hover:text-orange-800"
                          onClick={() => navigate(`/track?order=${order.id}`)}
                        >
                          Track
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div>
          <div className="flex items-center mb-6">
            <Settings className="h-5 w-5 text-gray-500 mr-2" />
            <h2 className="text-2xl font-bold text-gray-900">Account Settings</h2>
          </div>

          <Card className="border-laundry-200">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Full Name</h3>
                  <p className="font-medium text-gray-800">{user.name}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Email</h3>
                  <p className="font-medium text-gray-800">{user.email}</p>
                </div>
                <div className="md:col-span-2">
                  <Button variant="outline" className="border-orange-500 text-orange-600 hover:bg-orange-50">
                    Edit Profile
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;


import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Loader2 } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate login for now - will integrate with backend later
    setTimeout(() => {
      setIsLoading(false);
      navigate("/dashboard");
      console.log("Login attempted with:", email, password);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-laundry-50 to-white">
      <Navbar />
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="flex justify-center">
          <Card className="w-full max-w-md border-accent-300 shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold text-laundry-700">Welcome Back</CardTitle>
              <CardDescription>Sign in to manage your laundry orders</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-gray-700">Email</label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="border-laundry-200 focus:outline-none focus:ring-2 focus:ring-customOrange hover:border-customOrange"
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label htmlFor="password" className="text-sm font-medium text-gray-700">Password</label>
                    <a href="#" className="text-xs text-customOrange hover:underline">Forgot password?</a>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="border-laundry-200 focus:outline-none focus:ring-2 focus:ring-customOrange hover:border-customOrange"
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full bg-customOrange hover:bg-customOrange-dark text-white font-semibold"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    "Sign In"
                  )}
                </Button>
              </form>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <div className="text-center text-sm text-gray-600">
                Don't have an account?{" "}
                <a href="#" className="text-customOrange hover:underline">
                  Sign up
                </a>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;

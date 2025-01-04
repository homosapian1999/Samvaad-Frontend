import { toast } from "sonner";
import Background from "../../assets/login2.png";
import Victory from "../../assets/victory.svg";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";
import { useState } from "react";
import { apiClient } from "@/libs/auth-client";
import { LOGIN_ROUTE, SIGNUP_ROUTE } from "@/utils/constants";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const validateSignUp = () => {
    if (!email.length) {
      toast.error("Email is required");
      return false;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return false;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return false;
    }
    return true;
  };

  const validateLogin = () => {
    if (!email.length) {
      toast.error("Email is required");
      return false;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return false;
    }
    return true;
  };

  const handleLogin = async () => {
    if (validateLogin()) {
      try {
        const response = await apiClient.post(
          LOGIN_ROUTE,
          {
            email,
            password,
          },
          { withCredentials: true }
        );
        if (response.data.status) {
          toast.success(response.data.message);
          if (response.data.isProfileComplete) navigate("/chat");
          else navigate("/profile");
        }
      } catch (error) {
        console.error("Error during login:", error);
        toast.error("Error While Logging In");
      }
    } else {
      console.log("Login validation failed.");
    }
  };
  const handleSignUp = async () => {
    if (validateSignUp()) {
      try {
        const response = await apiClient.post(
          SIGNUP_ROUTE,
          {
            email,
            password,
            confirmPassword,
          },
          { withCredentials: true }
        );
        if (response.data.status) {
          toast.success(response.data.message);
          navigate("/profile");
        }
      } catch (error) {
        console.error("Error during sign-up:", error);
        toast.error("Error While Signing Up");
      }
    } else {
      console.log("Sign-up validation failed.");
    }
  };

  return (
    <div className="h-[100vh] w-[100vw] flex items-center justify-center">
      <div className="h-[80vh] w-[80vw] bg-grey border-2 border-b-slate-500 text-opacity-90 shadow-2xl md:w-[90vw] lg:w-[70vw] xl:w-[60vw] rounded-3xl grid xl:grid-cols-2">
        <div className="flex flex-col gap-10 items-center justify-center">
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-5xl font-bold md:text-6xl">Welcome</h1>
            <img src={Victory} alt="victory" className="h-[100px]" />
          </div>
          <p className="font-medium text-center">
            Fill in the details to get started with best chat app
          </p>
        </div>
        <div className="flex items-center justify-center w-full">
          <Tabs className="w-3/4" defaultValue="login">
            <TabsList className="bg-transparent rounded-none w-full">
              <TabsTrigger
                value="login"
                className="data-[state=active]:bg-transparent text-black text-opacity-90 border-b-2 rounded-none w-full data-[state=active]: font-semibold data-[state=active]:border-b-purple-500 p-3 transition-all duration-300"
              >
                Login
              </TabsTrigger>
              <TabsTrigger
                value="signup"
                className="data-[state=active]:bg-transparent text-black text-opacity-90 border-b-2 rounded-none w-full data-[state=active]: font-semibold data-[state=active]:border-b-purple-500 p-3 transition-all duration-300"
              >
                SignUp
              </TabsTrigger>
            </TabsList>
            <TabsContent value="login" className="flex flex-col gap-5 mt-10">
              <Input
                placeholder="Email"
                type="email"
                className="rounded-full p-6"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                placeholder="Password"
                type="password"
                className="rounded-full p-6"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button className="rounded-full p-6" onClick={handleLogin}>
                Login
              </Button>
            </TabsContent>
            <TabsContent value="signup" className="flex flex-col gap-5">
              <Input
                placeholder="Email"
                type="email"
                className="rounded-full p-6"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                placeholder="Password"
                type="password"
                className="rounded-full p-6"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Input
                placeholder="Confirm Password"
                type="password"
                className="rounded-full p-6"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <Button className="rounded-full p-6" onClick={handleSignUp}>
                SignUp
              </Button>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <div className="hidden xl:flex items-center justify-center">
        <img
          src={Background}
          alt="background"
          className="h-[700px] object-cover"
        />
      </div>
    </div>
  );
};

export default Auth;

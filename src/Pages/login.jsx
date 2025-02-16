import * as React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

import { useToast } from "@/hooks/use-toast";
import { CheckCircle, XCircle } from "lucide-react";

const formSchema = z.object({
  username: z
    .string()
    .min(5, "Username must be at least 5 characters long")
    .max(15, "Username cannot exceed 15 characters")
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "Username can only contain letters, numbers, and underscores"
    ),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .max(18, "Password cannot exceed 18 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[\W_]/, "Password must contain at least one special character"),
});

const LoginPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (values) => {
    console.log(values);
    const url = "http://localhost:5000/login";
    const options = {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      credentials: "include",
      body: JSON.stringify(values),
    };
    const response = await fetch(url, options);
    const data = await response.json();
    console.log(data, "user data in login page");
    if (response.ok) {
      toast({
        title: (
          <div className="flex items-center gap-2">
            <CheckCircle className="text-green-600" />{" "}
            <span>Login Successful!</span>
          </div>
        ),
        description: "Welcome back! You are now logged in.",
        className: "bg-white text-green-600 border border-green-600 shadow-md",
      });
      navigate("/");
    } else {
      toast({
        title: (
          <div className="flex items-center gap-2">
            <XCircle className="text-red-600" />
            <span>Login Failed!</span>
          </div>
        ),
        description: "Invalid credentials. Please try again.",
        className: "bg-white text-red-600 border border-red-600 shadow-md",
      });
    }
  };

  return (
    <div className="bg-white text-black text-7xl font-serif flex flex-col justify-center items-center min-h-[100vh]">
      Quizo
      <Card className="w-[65vw] md:w-[40vw] bg-transparent mt-3">
        <div className="w-[30vw]md:w-[20vw]  m-3 p-4 space-y-5 items-center flex flex-col justify-center  ">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem className="text-start">
                    <FormLabel className="lg:text-md">Username</FormLabel>
                    <FormControl>
                      <Input
                        className=" w-[45vw] md:w-[30vw]"
                        type="text"
                        placeholder="Enter Username"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Password Field */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="text-start">
                    <FormLabel className="lg:text-md">Password</FormLabel>
                    <FormControl>
                      <Input
                        className=" w-[45vw] md:w-[30vw]"
                        type="password"
                        placeholder="Enter password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="text-center">
                <Button className="bg-blue-400" type="submit">
                  Sign In
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </Card>
    </div>
  );
};

export default LoginPage;

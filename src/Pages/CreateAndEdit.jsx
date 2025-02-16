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
import { Textarea } from "@/components/ui/textarea";
import Navbar from "./navbar";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import BreadCrumbs from "./breadCrumbs";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle, XCircle } from "lucide-react";

const formSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Title cannot be empty")
    .min(3, "Title must be at least 3 characters long")
    .max(100, "Title cannot exceed 100 characters")
    .regex(/^[A-Za-z0-9 ]+$/, "Title can only contain alphabets and numbers"),

  description: z.string().trim().min(1, "Description cannot be empty"),
});

const CreateAndEditPage = () => {
  const { id } = useParams();
  console.log(id, "id details");
  const navigate = useNavigate();
  const { toast } = useToast();

  const [quiz, setQuiz] = useState({});

  const createQuize = async (values) => {
    const url = "http://localhost:5000/create";
    const options = {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      credentials: "include",
      body: JSON.stringify(values),
    };
    const response = await fetch(url, options);

    if (response.ok) {
      toast({
        title: (
          <div className="flex items-center gap-2">
            <CheckCircle className="text-green-600" />
            <span>Quiz Created Successfully!</span>
          </div>
        ),
        description: "Your quiz has been added.",
        duration: 3000,
        className: "bg-white text-green-600 border border-green-600 shadow-md",
      });

      navigate("/");
    } else {
      toast({
        title: (
          <div className="flex items-center gap-2">
            <XCircle className="text-red-600" />
            <span>Failed to Create Quiz!</span>
          </div>
        ),
        description: "Something went wrong. Please try again.",
        duration: 3000,
        className: "bg-white text-red-600 border border-red-600 shadow-md",
      });
    }
  };

  const editQuiz = async (values) => {
    const url = `http://localhost:5000/edit/${id}`;
    const options = {
      headers: {
        "Content-Type": "application/json",
      },
      method: "PUT",
      credentials: "include",
      body: JSON.stringify(values),
    };
    const response = await fetch(url, options);

    if (response.ok) {
      toast({
        title: (
          <div className="flex items-center gap-2">
            <CheckCircle className="text-green-600" />
            <span>Quiz Updated Successfully!</span>
          </div>
        ),
        description: "Your quiz changes have been saved.",
        duration: 3000,
        className: "bg-white text-green-600 border border-green-600 shadow-md",
      });
      navigate("/");
    } else {
      toast({
        title: (
          <div className="flex items-center gap-2">
            <XCircle className="text-red-600" />
            <span>Failed to Update Quiz!</span>
          </div>
        ),
        description: "Could not update the quiz. Try again later.",
        duration: 3000,
        className: "bg-white text-red-600 border border-red-600 shadow-md",
      });
    }
  };

  const onSubmit = async (values) => {
    if (id) {
      editQuiz(values);
    } else {
      createQuize(values);
    }
  };

  const fetchQuiz = async () => {
    const url = `http://localhost:5000/getQuiz/${id}`;
    const options = {
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      method: "GET",
    };
    const response = await fetch(url, options);
    const data = await response.json();
    const { description, title } = data;
    const updatedData = {
      description,
      title,
    };
    if (response.ok) {
      setQuiz(updatedData);
      console.log(updatedData);
    } else {
      alert("error fetching quiz");
    }
  };

  useEffect(() => {
    if (id) {
      fetchQuiz();
    }
  }, [id]);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: quiz,
  });

  useEffect(() => {
    if (quiz) {
      form.reset(quiz);
    }
  }, [quiz]);

  const breadcrumbDetailsCreate = {
    path: "/",
    text: "Create Quiz",
  };

  const breadcrumbDetailsEdit = {
    path: "/",
    text: "Update Quiz",
  };

  return (
    <>
      <Navbar />
      <div className="text-2xl m-4">
        {id ? (
          <BreadCrumbs breadcrumbDetails={breadcrumbDetailsEdit} />
        ) : (
          <BreadCrumbs breadcrumbDetails={breadcrumbDetailsCreate} />
        )}
      </div>
      <div className="flex flex-col justify-center items-center min-h-[80vh]">
        <Card className="w-[65vw] md:w-[40vw]">
          <CardHeader>
            <CardTitle className="md:text-2xl text-center text-xl">
              {id ? "Update Quiz" : "Create Quiz"}
            </CardTitle>
          </CardHeader>
          <div className="w-[30vw]md:w-[20vw]  m-3 p-4 space-y-15 items-center flex flex-col justify-center  ">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-5"
              >
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem className="text-start">
                      <FormLabel className="lg:text-md">Title</FormLabel>
                      <FormControl>
                        <Input
                          className=" w-[45vw] md:w-[30vw] "
                          type="text"
                          placeholder="Enter title"
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
                  name="description"
                  render={({ field }) => (
                    <FormItem className="text-start">
                      <FormLabel className="lg:text-md">Description</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          placeholder="Write descroption....."
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button className="bg-blue-400" type="submit">
                  {id ? "Update" : "Create"}
                </Button>
              </form>
            </Form>
          </div>
        </Card>
      </div>
    </>
  );
};

export default CreateAndEditPage;

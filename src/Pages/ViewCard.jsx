import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useParams } from "react-router-dom";
import Navbar from "./navbar";
import BreadCrumbs from "./breadCrumbs";

const ViewCardPage = () => {
  const [quiz, setQuiz] = useState({});
  const { id } = useParams(); // Extracts the dynamic ID from URL
  console.log("ID:", id);
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
    if (response.ok) {
      setQuiz(data);
    } else {
      alert("error fetching quiz");
    }
  };

  useEffect(() => {
    fetchQuiz();
  }, []);

  const breadcrumbDetails = {
    path: "/",
    text: "View Quiz",
  };

  return (
    <>
      <Navbar />
      <div className="text-2xl m-4">
        <BreadCrumbs breadcrumbDetails={breadcrumbDetails} />
      </div>
      <div className="m-5 p-3 border-2 border-blue-100 rounded-md">
        <Table>
          <TableHeader className="bg-slate-100 font-bold text-lg">
            <TableRow>
              <TableHead>title</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Time</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>{quiz.title}</TableCell>
              <TableCell>{quiz.description}</TableCell>
              <TableCell>
                {new Date(quiz.updated_at).toLocaleDateString("en-GB")}
              </TableCell>
              <TableCell>
                {new Date(quiz.updated_at).toLocaleTimeString("en-GB")}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default ViewCardPage;

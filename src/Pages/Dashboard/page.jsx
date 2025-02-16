import { Button } from "@/components/ui/button";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import Cookies from "js-cookie";
import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../navbar";
import { ErrorAlert } from "../ErrorAlert";

const DashboardPage = () => {
  const [quiz, setquiz] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const url = "http://localhost:5000/getQuiz";
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
      const outdata = data.map((each) => ({
        id: each.id,
        description: each.description,
        title: each.title,
        createOn: new Date(each.updated_at).toLocaleDateString("en-GB"),
      }));

      setquiz(outdata);
    } else {
      <ErrorAlert />;
      alert("error loding information from server");
    }
  };

  return (
    <>
      <Navbar />
      <div className=" text-white m-5">
        <div className="flex justify-end">
          <Button className="bg-blue-500 text-lg">
            <Link to="/create">Create Quiz</Link>
          </Button>
        </div>

        <div className="container mx-auto py-10">
          <DataTable columns={columns(setquiz)} data={quiz} />
        </div>
      </div>
    </>
  );
};

export default DashboardPage;

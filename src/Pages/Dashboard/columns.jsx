import { MoreHorizontal, Trash2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

export const columns = (setData, navigate) => [
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "createOn",
    header: "Created On",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const id = row.original.id;
      const navigate = useNavigate();
      const { toast } = useToast();

      const deleteQuiz = async () => {
        try {
          const url = `http://localhost:5000/delete/${id}`;
          const options = {
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            method: "DELETE",
          };

          const response = await fetch(url, options);
          if (response.ok) {
            setData((prevData) => prevData.filter((item) => item.id !== id));
            toast({
              title: (
                <div className="flex items-center gap-2">
                  <Trash2 className="text-green-600" />
                  <span>Quiz Deleted Successfully!</span>
                </div>
              ),
              description: "The quiz has been removed.",
              duration: 3000,
              className:
                "bg-white text-green-600 border border-green-600 shadow-md",
            });
          } else {
            toast({
              title: (
                <div className="flex items-center gap-2">
                  <XCircle className="text-red-600" />
                  <span>Failed to Delete Quiz!</span>
                </div>
              ),
              description: "Something went wrong. Please try again.",
              duration: 3000,
              className:
                "bg-white text-red-600 border border-red-600 shadow-md",
            });
          }
        } catch (error) {
          console.error("Error:", error);
        }
      };

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => navigate(`/view/${id}`)}>
              View
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate(`/edit/${id}`)}>
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem className="text-red-600" onClick={deleteQuiz}>
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

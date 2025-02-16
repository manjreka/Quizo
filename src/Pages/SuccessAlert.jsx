import { AlertCircle } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const SuccessAlert = () => {
  console.log("hello alert");
  return (
    <Alert variant="destructive">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Success</AlertTitle>
      <AlertDescription>Information fecthed successfully </AlertDescription>
    </Alert>
  );
};

export default SuccessAlert;

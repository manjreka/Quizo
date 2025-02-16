import { Route, Routes } from "react-router-dom";

import LoginPage from "./Pages/login.jsx";
import DashboardPage from "./Pages/Dashboard/page";
import ViewCardPage from "./Pages/ViewCard.jsx";
import CreateAndEditPage from "./Pages/CreateAndEdit";
import { Toaster } from "./components/ui/toaster.jsx";

const App = () => {
  return (
    <>
      <Toaster />
      <Routes>
        <Route exact path="/login" element={<LoginPage />} />
        <Route exact path="/" element={<DashboardPage />} />
        <Route path="/view/:id" element={<ViewCardPage />} />
        <Route exact path="/create" element={<CreateAndEditPage />} />
        <Route exact path="/edit/:id" element={<CreateAndEditPage />} />
      </Routes>
    </>
  );
};

export default App;

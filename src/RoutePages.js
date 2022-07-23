import { Route, Routes } from "react-router-dom";
import Home from "./components/pages/Home";
import HomePos from "./components/pages/Pos/HomePos";
import HomeClient from "./components/pages/registrationClient/HomeClient";
import HomeReceipt from "./components/pages/receipt/HomeReceipt";
import HomeServiceOrder from "./components/pages/serviceOrder/HomeServiceOrder";

const routePages = () => {
  return (
    <>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/homepos" element={<HomePos />} />
        <Route path="/homeclient" element={<HomeClient />} />
        <Route path="/homereceipt" element={<HomeReceipt />} />
        <Route path="/homeserviceorder" element={<HomeServiceOrder />} />
      </Routes>
    </>
  );
};

export default routePages;

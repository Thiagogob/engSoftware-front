import { Route, Routes } from "react-router";
import Home from "./pages/Home";
import { BrowserRouter } from "react-router-dom";
import Levels from "./pages/Home/levels";

const AppRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/">
        <Route index element={<Home />}/>
        <Route path="levels" element={<Levels />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default AppRoutes;

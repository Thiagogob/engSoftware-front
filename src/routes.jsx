import { Route, Routes } from "react-router";
import Home from "./pages/Home";
import { BrowserRouter } from "react-router-dom";
import Levels from "./pages/Home/levels";
import Level1 from "./pages/Home/level1";

const AppRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/">
        <Route index element={<Home />}/>
        <Route path="levels" element={<Levels />} />
        <Route path="level1" element={<Level1/>}/>
      </Route>
    </Routes>
  </BrowserRouter>
);

export default AppRoutes;

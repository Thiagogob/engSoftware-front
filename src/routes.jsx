import { Route, Routes } from "react-router";
import Home from "./pages/Home";
import { BrowserRouter } from "react-router-dom";
import Levels from "./pages/Home/levels";
import Level1 from "./pages/Home/level1";
import Level2 from "./pages/Home/level2";
const AppRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/">
        <Route index element={<Home />}/>
        <Route path="levels" element={<Levels />} />
        <Route path="level1" element={<Level1/>}/>
        <Route path="level2" element={<Level2/>}/>
      </Route>
    </Routes>
  </BrowserRouter>
);

export default AppRoutes;

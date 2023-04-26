import { Route, Routes } from "react-router";
import Home from "./pages/Home";
import { BrowserRouter } from "react-router-dom";
import Levels from "./pages/Home/levels";
import Level1 from "./pages/Home/level1";
import Level2 from "./pages/Home/level2";
import Learn from "./pages/Home/learn";
const AppRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/">
        <Route index element={<Home />}/>
        <Route path="levels" element={<Levels />} />
        <Route path="level1" element={<Level1/>}/>
        <Route path="level2" element={<Level2/>}/>
        <Route path="learn" element={<Learn/>}/>
        <Route path="home" element={<Home/>}/>
      </Route>
    </Routes>
  </BrowserRouter>
);

export default AppRoutes;

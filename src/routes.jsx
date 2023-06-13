import { Route, Routes } from "react-router";
import Home from "./pages/Home";
import { BrowserRouter } from "react-router-dom";
import { Suspense, lazy } from "react";

const Levels = lazy(() => import('./pages/Home/levels'))
const Level1 = lazy(() => import('./pages/Home/Level1'))
const Level2 = lazy(() => import('./pages/Home/Level2'))
const Learn = lazy(() => import('./pages/Home/Learn'))
const Loading = lazy(() => import('./components/Loading'))
const Admin = lazy(() => import('./pages/Admin'))

const AppRoutes = () => (
  <BrowserRouter>
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/">
          <Route index element={<Home />}/>
          <Route path="levels" element={<Levels />} />
          <Route path="level1" element={<Level1/>}/>
          <Route path="level2" element={<Level2/>}/>
          <Route path="learn" element={<Learn/>}/>
          <Route path="home" element={<Home/>}/>
        </Route>
        <Route path="/admin">
          <Route index element={<Admin />}/>
        </Route>
      </Routes>
    </Suspense>
  </BrowserRouter>
);

export default AppRoutes;

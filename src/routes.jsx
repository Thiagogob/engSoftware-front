import { Route, Routes } from "react-router";
import Home from "./pages/Home";
import { BrowserRouter } from "react-router-dom";
import { Suspense, lazy } from "react";
import { AuthProvider } from "./contexts/auth";
import { AnimalsProvider } from "./contexts/animals";
import Loading from "./components/Loading";

const Levels = lazy(() => import("./pages/Home/levels"));
const Level1 = lazy(() => import("./pages/Home/level1"));
const Level2 = lazy(() => import("./pages/Home/level2"));
const Learn = lazy(() => import("./pages/Home/learn"));
const Login = lazy(() => import("./pages/Home/Login"));
const DashBoard = lazy(() => import("./pages/Admin/dashboard"));
const Admin = lazy(() => import("./pages/Admin"));
const AdminRegister = lazy(() => import("./pages/Admin/register"));

const AppRoutes = () => (
  <BrowserRouter>
    <AuthProvider>
      <AnimalsProvider>
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/">
              <Route index element={<Home />} />
              <Route path="levels" element={<Levels />} />
              <Route path="level1" element={<Level1 />} />
              <Route path="level2" element={<Level2 />} />
              <Route path="learn" element={<Learn />} />
              <Route path="login" element={<Login />} />
            </Route>
            <Route path="/admin">
              <Route index element={<Admin />} />
              <Route path="dashboard" element={<DashBoard />} />
              <Route path="cadastro" element={<AdminRegister />} />
            </Route>
          </Routes>
        </Suspense>
      </AnimalsProvider>
    </AuthProvider>
  </BrowserRouter >
);

export default AppRoutes;

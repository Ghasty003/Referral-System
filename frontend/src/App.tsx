import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import PageLoader from "./utils/PageLoader";

function App() {

  const Signup = lazy(() => import("./pages/auth/Signup"));
  const Login = lazy(() => import("./pages/auth/Login"));

  return (
    <div className="bg-primary min-h-screen text-white">
      <Routes>
        <Route path="/signup" element={
          <Suspense fallback={<PageLoader />}>
            <Signup />
          </Suspense>
        } />

        <Route path="/login" element={
          <Suspense fallback={<PageLoader />}>
            <Login />
          </Suspense>
        } />
      </Routes>
    </div>
  );
}

export default App;
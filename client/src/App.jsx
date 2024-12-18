import { Route, Routes } from "react-router-dom";
import "./App.css";
import AuthLayout from "./components/auth/layout";
import AdminIndex from "./pages/admin-view";
import AuthLogin from "./pages/auth/login";
import AuthRegister from "./pages/auth/register";
import AdminLayout from "./components/admin-view/layout";
import AdminProduct from "./pages/admin-view/product";
import AdminOrder from "./pages/admin-view/order";
import AdminFearture from "./pages/admin-view/fearture";
import NotFound from "./pages/not-found/index";
import ClientLayout from "./components/client-view/layout";
import ClientProduct from "./pages/client-view/product";
import ClientAccount from "./pages/client-view/account";
import ClientCheckout from "./pages/client-view/checkout";
import ClientHome from "./pages/client-view/home";
import CheckAuth from "./components/common/check-auth";
import UnAuthPage from "./pages/unauth-page";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { checkAuth } from "./store/auth-slice";
import { Skeleton } from "@/components/ui/skeleton";
import PaypalReturnPage from "./pages/client-view/paypal-return";
import PaymentSuccessPage from "./pages/client-view/payment-success";
import SearchProduct from "./pages/client-view/search";

function App() {
  const { user, isAuthenticated, isLoading } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  if (isLoading) return <Skeleton className="w-[600px] h-[600px]" />;
  console.log(isLoading, user);

  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <Routes>
        <Route
          path="/"
          element={
            <CheckAuth
              isAuthenticated={isAuthenticated}
              user={user}
            ></CheckAuth>
          }
        />
        {/* Auth View */}
        <Route
          path="/auth"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AuthLayout />
            </CheckAuth>
          }
        >
          <Route path="login" element={<AuthLogin />} />
          <Route path="register" element={<AuthRegister />} />
        </Route>
        {/* Admin View */}
        <Route
          path="/admin"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AdminLayout />
            </CheckAuth>
          }
        >
          <Route path="index" element={<AdminIndex />} />
          <Route path="product" element={<AdminProduct />} />
          <Route path="order" element={<AdminOrder />} />
          <Route path="fearture" element={<AdminFearture />} />
        </Route>
        {/* Client View */}
        <Route
          path="/client"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <ClientLayout />
            </CheckAuth>
          }
        >
          <Route path="home" element={<ClientHome />} />
          <Route path="product" element={<ClientProduct />} />
          <Route path="account" element={<ClientAccount />} />
          <Route path="checkout" element={<ClientCheckout />} />
          <Route path="paypal-return" element={<PaypalReturnPage />} />
          <Route path="payment-success" element={<PaymentSuccessPage />} />
          <Route path="search" element={<SearchProduct />} />
        </Route>
        {/* UnAuth-Page */}
        <Route path="/unauth-page" element={<UnAuthPage />} />
        {/* Not Found */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;

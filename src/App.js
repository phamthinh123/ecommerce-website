import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, useNavigate } from "react-router-dom";
import AdminToolBar from "./components/AdminToolBar";
import { auth, handleUserProfile } from "./firebase/utils";
import WithAdminAuth from "./hoc/WithAdminAuth";
import WithAuth from "./hoc/WithAuth";
import AdminPageLayout from "./layouts/AdminPageLayout";
import FullWidthLayout from "./layouts/FullWidthLayout";
import UserPageLayout from "./layouts/UserPageLayout";
import HomePageLayout from "./layouts/HomePageLayout";
import AdminPage from "./pages/AdminPage";
import HomePage from "./pages/HomePage/index";
import CheckoutPage from "./pages/CheckoutPage/index";
import ProductPage from "./pages/ProductPage/index";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import CategoryPage from "./pages/CategoryPage";
import OrderPage from "./pages/OrderPage";
import OrderDetailPage from "./pages/OrderDetailPage";
import { setCurrentUser } from "./redux/User/user.action";
import { checkUserIsAdmin } from "./utils/checkUserIsAdmin";
import { fetchData, fetchProducts } from "./redux/Product/product.action";
import PaymentPage from "./pages/PaymentPage";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { publishableKey } from "./Stripe/config";
const stripePromise = loadStripe(publishableKey);

function App(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    const authListener = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        let userRef;
        if (userAuth.displayName) {
          const name = userAuth.displayName;
          const phone = userAuth.phoneNumber;
          userRef = await handleUserProfile(userAuth, { name, phone });
        } else {
          userRef = await handleUserProfile(userAuth);
        }
        // const userRef = await handleUserProfile(userAuth);

        userRef.get().then((snap) => {
          if (snap.data() !== undefined) {
            // navigate("/");
            dispatch(setCurrentUser({ id: snap.id, ...snap.data() }));
            navigate("/");
          } else {
            dispatch(setCurrentUser(null));
          }
        });
      } else {
        dispatch(setCurrentUser(null));
      }
    });

    return () => {
      authListener();
    };
  }, []);
  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchData());
  }, []);
  const currentUser = useSelector((state) => state.user.currentUser);

  return (
    <div className="App">
      {currentUser !== null && checkUserIsAdmin(currentUser) ? (
        <AdminToolBar />
      ) : null}

      <Routes>
        <Route
          path="/"
          exact
          element={
            <HomePageLayout>
              <HomePage />
            </HomePageLayout>
          }
        />
        <Route
          path="/checkout"
          exact
          element={
            <HomePageLayout>
              <CheckoutPage />
            </HomePageLayout>
          }
        />
        <Route
          path="/category/:category"
          exact
          element={
            <HomePageLayout>
              <CategoryPage />
            </HomePageLayout>
          }
        />
        <Route
          path="/product/:productId"
          exact
          element={
            <HomePageLayout>
              <ProductPage />
            </HomePageLayout>
          }
        />
        <Route
          path="/login"
          element={
            <FullWidthLayout>
              <Login />
            </FullWidthLayout>
          }
        />
        <Route
          path="/registration"
          element={
            <FullWidthLayout>
              <Registration />
            </FullWidthLayout>
          }
        />
        <Route
          path="/admin"
          element={
            <WithAdminAuth>
              <AdminPageLayout>
                <AdminPage />
              </AdminPageLayout>
            </WithAdminAuth>
          }
        />
        <Route
          path="/order"
          element={
            <WithAuth>
              <UserPageLayout>
                <OrderPage />
              </UserPageLayout>
            </WithAuth>
          }
        />
        <Route
          path="/order/:orderId"
          element={
            <WithAuth>
              <UserPageLayout>
                <OrderDetailPage />
              </UserPageLayout>
            </WithAuth>
          }
        />
        <Route
          path="/payment"
          element={
            <WithAuth>
              <HomePageLayout>
                <Elements
                  stripe={stripePromise}
                  // options={{
                  //   // passing the client secret obtained from the server
                  //   clientSecret: "{{CLIENT_SECRET}}",
                  // }}
                >
                  <PaymentPage />
                </Elements>
              </HomePageLayout>
            </WithAuth>
          }
        />
      </Routes>
    </div>
  );
}

export default App;

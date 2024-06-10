import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import Header from "./components/Header/Header";
import AboutPage from "./pages/AboutPage/AboutPage";
import MyTripsPage from "./pages/MyTripsPage/MyTripsPage";
import Footer from "./components/Footer/Footer";
import LandingPage from "./pages/LandingPage/LandingPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import SignupPage from "./pages/SignupPage/SignupPage";
import ViewEntryPage from "./pages/ViewEntryPage/ViewEntryPage";
import AddEntryPage from "./pages/AddEntryPage/AddEntryPage";
import TripDetailsPage from "./pages/TripDetailsPage/TripDetailsPage";
import AuthProvider from "./context/AuthContext";
import PrivateRoutes from "./utils/PrivateRoutes";
import "./App.scss";

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <Toaster
            position="top-center"
            closeButton
            toastOptions={{
              className: "project-toasts",
            }}
          />
          <Header />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route element={<PrivateRoutes />}>
              <Route path="/about" element={<AboutPage />} />
              <Route path="/mytrips" element={<MyTripsPage />} exact />
              <Route path="/mytrips/:tripId" element={<TripDetailsPage />} />
              <Route
                path="/mytrips/:tripId/:entryDate/add"
                element={<AddEntryPage />}
              />
              <Route
                path="/mytrips/:tripId/:entryDate/view"
                element={<ViewEntryPage />}
              />
            </Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
      <Footer />
    </>
  );
}

export default App;

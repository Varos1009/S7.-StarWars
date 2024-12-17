import React from "preact/compat";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ShipDetails from "./components/ShipDetails";
import { StarshipProvider } from "./context/StarshipContext";
import LoginPage  from "./components/LoginPage";
import AuthProvider from "./context/AuthContext";
import SignUpPage from "./components/SignUpPage";



const App = () => {
  return (
    <AuthProvider>
    <StarshipProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/ship/:id" element={<ShipDetails />} />
        <Route path="/register" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
    </StarshipProvider>
    </AuthProvider>
  );
};

export default App;
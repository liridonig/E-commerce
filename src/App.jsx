import { Routes, Route } from "react-router-dom";

import Navigation from "./routes/navigation/navigation.component.jsx";
import Home from "./routes/home/home.component.jsx";
import SignIn from "./routes/authentication/auth-sign-in/authentication-sign-in.jsx";
import SignUp from "./routes/authentication/auth-sign-up/authentication-sign-up.jsx";

const Shop = () => {
  return <h1>Im the shop page</h1>;
};

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="shop" element={<Shop />} />
        <Route path="sign-in" element={<SignIn />} />
        <Route path="sign-up" element={<SignUp />} />
      </Route>
    </Routes>
  );
};

export default App;

import * as React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { User } from "./utils/apiService";
import Home from "./views/Home";
import Products from "./views/Products";
import NotFound from "./views/NotFound";
import ProductView from "./views/ProductView";
import AddProduct from "./views/AddProduct";
import Login from "./views/Login";
import Navbar from "./components/Navbar";

const App: React.FC = () => {
  const [isAdmin, setIsAdmin] = React.useState(User.role === "admin");

  React.useEffect(() => {
    console.log("Permission change");
  }, [isAdmin]);

  return (
    <Router>
      <Navbar isAdmin={isAdmin} setIsAdmin={setIsAdmin} />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/products/add">
          {isAdmin ? <AddProduct /> : <Redirect push to="/login" />}
        </Route>
        <Route exact path="/products/:id">
          <ProductView />
        </Route>
        <Route exact path="/products">
          <Products />
        </Route>
        <Route path="/login">
          <Login setIsAdmin={setIsAdmin} />
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
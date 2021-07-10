import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Cart from "./Components/Cart";
import Checkout from "./Components/Checkout";
import Header from "./Components/Header";
import { useState } from "react";

function App() {
  const [selectedItems, setSelectedItems] = useState([]);
  const [finalOrderId, setfinalOrderId] = useState([]);

  return (
    <Router>
      <div className="App">
        <Header />
        <Route
          exact
          path="/"
          render={(props) => (
            <Cart
              setSelectedItems={setSelectedItems}
              setfinalOrderId={setfinalOrderId}
            />
          )}
        />
        <Route
          exact
          path="/cart"
          render={(props) => (
            <Checkout
              selectedItems={selectedItems}
              finalOrderId={finalOrderId}
            />
          )}
        />
      </div>
    </Router>
  );
}

export default App;

// @flow
import { Fragment } from "react";
import CheckCard from "../styles/CheckoutCard";
import handleEmailOperation from "../services/sendGrid";
import { useState } from "react";
import EventLogger from "../events/logger";

const event = new EventLogger();

// TODO: Is it possible to abstract the event logic into a single file?

event.on("checkout", async (order) => {
  const emailResponse = await handleEmailOperation(order);

  if (emailResponse.Message) {
    alert(`${emailResponse.Message}`);
    sessionStorage.setItem("checkedItems", JSON.stringify([]));
  } else {
    alert("Sorry! Couldn't send email", `${emailResponse.Error}`);
  }
  window.location.reload();
});

function Checkout({ selectedItems, finalOrderId }) {
  const [userEmail, setUserEmail] = useState("");
  const [userFirstName, setUserFirstName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const totalPrice = selectedItems.reduce((acc, { price, quantity }) => {
      return acc + price * quantity;
    }, 0);

    const orderConstruction = {
      orderId: finalOrderId,
      items: selectedItems,
      price: totalPrice,
      userEmail,
      userFirstName,
    };

    // Calls EventLogger .log method for emitting an event
    event.log("checkout", orderConstruction);
  };

  return (
    <div style={{ margin: "1em" }}>
      <h2>Your Cart:</h2>
      <CheckCard style={{ display: "grid", gridTemplateColumns: "auto auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "auto auto" }}>
          {selectedItems.length > 0 ? (
            selectedItems.map((item) => (
              <Fragment>
                <div style={{ padding: ".5em" }}>
                  <h4>{item.name}</h4>
                </div>
              </Fragment>
            ))
          ) : (
            <p style={{ color: "silver" }}>EMPTY CART</p>
          )}
        </div>
        <div style={{ marginTop: "2em" }}>
          <form onSubmit={handleSubmit}>
            <input
              style={userInputStyle}
              type="text"
              placeholder="First Name"
              required
              onChange={(e) => setUserFirstName(e.target.value)}
            ></input>
            <br></br> <br></br>
            <input
              style={userInputStyle}
              type="email"
              placeholder="Please enter your email"
              onChange={(e) => setUserEmail(e.target.value)}
            ></input>
            <button type="submit" style={buttonCreateStyle}>
              CREATE ORDER
            </button>
          </form>
        </div>
      </CheckCard>
    </div>
  );
}

const buttonCreateStyle = {
  margin: "3em auto",
  display: "block",
  padding: "1em 2em",
  backgroundColor: "crimson",
  color: "white",
  fontWeight: "bold",
  cursor: "pointer",
};

const userInputStyle = {
  padding: "1em 1.5em",
  fontSize: "15px",
};

export default Checkout;

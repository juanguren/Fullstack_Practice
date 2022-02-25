// @flow
import { Component, Fragment } from "react";
import retrieveItemInfo from "../services/faker";
import "../styles/Cart.css";
import Card from "../styles/Card";
import { v4 } from "uuid";
import { saveItemInLocal } from "../utils/helpers";

class Cart extends Component {
  constructor({ setSelectedItems }) {
    super(setSelectedItems);
    this.state = {
      order_id: v4(),
      origin: "",
      destination: "",
      items: [],
      totalPrice: 0,
      firstItemInCart: false,
    };
  }

  componentDidMount() {
    this.setState({
      items: [...retrieveItemInfo()],
    });
    Notification.requestPermission();
  }

  handleClick = (e, clickedItemId) => {
    const foundItem = this.state.items.find(
      (item) => item.id === clickedItemId
    );
    if (foundItem) {
      const { id: itemId } = foundItem;
      const itemExists = saveItemInLocal(itemId, foundItem);

      debugger;
      this.setState({ firstItemInCart: true });
      if (itemExists) new Notification(`${foundItem.name} added`);
      console.log("HEY");
      debugger;
    }
  };

  handleOrderForCheckout = (e) => {
    alert("Order Ready! Please go to the Checkout page");
    const savedItems = JSON.parse(sessionStorage.getItem("checkedItems"));

    this.props.setSelectedItems(savedItems);
    this.props.setfinalOrderId(this.state.order_id);
  };

  render() {
    const itemList = this.state.items;
    return (
      <div>
        <button
          style={buttonSendStyle}
          onClick={this.handleOrderForCheckout}
          disabled={!this.state.firstItemInCart ? true : false}
        >
          SAVE!
        </button>
        <div className="main">
          {itemList.map((item) => (
            <Fragment>
              <Card>
                <ul key={item.id} style={{ listStyle: "none" }}>
                  <li>
                    <img
                      style={imageStyle}
                      alt={`${item.name}`}
                      src={item.image}
                    ></img>
                  </li>{" "}
                  <li key={item.name}>Name: {item.name}</li>
                  <li key={item.price}>Price: {`$${item.price}`}</li>
                  <li key={item.weight}>Weight: {item.weight}</li>
                  {/*<li>
                    {" "}
                    Quantity:
                    <input type="number"></input>
                 </li> */}
                </ul>
                <button
                  style={buttonAddStyle}
                  onClick={() => this.handleClick(this, item.id)}
                >
                  ADD
                </button>
              </Card>
            </Fragment>
          ))}
        </div>
      </div>
    );
  }
}

const buttonAddStyle = {
  marginLeft: "125px",
  marginTop: "3px",
  padding: ".5em 1em",
};

const imageStyle = {
  maxWidth: "200px",
};

const buttonSendStyle = {
  margin: "3em auto",
  display: "block",
  padding: "1em 2em",
  backgroundColor: "crimson",
  color: "white",
  fontWeight: "bold",
  cursor: "pointer",
};

export default Cart;

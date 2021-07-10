import ReactDOMServer from "react-dom/server";

const saveItemInLocal = (itemId, item) => {
  const itemsStack = [];
  const savedItems = JSON.parse(sessionStorage.getItem("checkedItems"));
  if (savedItems) {
    const itemExists = savedItems.find((item) => item.id === itemId);
    if (itemExists) return false;

    savedItems.forEach((previousItem) => {
      itemsStack.push(previousItem);
    });
    return saveAndCreateItem(item, itemsStack);
  } else {
    return saveAndCreateItem(item, itemsStack);
  }
};

const saveAndCreateItem = (item, items) => {
  items.push(item);
  sessionStorage.setItem("checkedItems", JSON.stringify(items));
  return true;
};

const constructMessageLayout = (payload) => {
  const { orderId, price, items, userFirstName } = payload;
  const messageString = (
    <body>
      <h2>Hi {userFirstName}! Below you'll find the details of your order:</h2>
      <h4 style={{ color: "crimson" }}>Order ID: {orderId}</h4>
      <h4>Cart:</h4>
      {items.map((item) => {
        return (
          <ul key="556">
            <li key={item.name}>
              <b>Name: {item.name}</b>
            </li>
            <li key="5">
              <b>Quantity: {item.quantity}</b>
            </li>
            <li key={item.weight}>
              <b>Weight: {item.weight}</b>{" "}
            </li>
            <li key={item.price}>
              <b>Price: {item.price}</b>{" "}
            </li>
          </ul>
        );
      })}
      <p>Total Price: ${price} 💰</p>
    </body>
  );
  return ReactDOMServer.renderToStaticMarkup(messageString);
};

export { saveItemInLocal, constructMessageLayout };

import * as fk from "faker";

const getRandomValue = (limit) => Math.floor(Math.random() * limit);

const retrieveItemInfo = () => {
  let randomAmmount = getRandomValue(14);
  const itemList = [];
  if (randomAmmount < 6) randomAmmount = 6;

  for (let i = 0; i < randomAmmount; i++) {
    itemList.push({
      id: String(fk.datatype.number()),
      name: fk.commerce.productName(),
      quantity: getRandomValue(10) === 0 ? 1 : getRandomValue(10),
      weight: `${getRandomValue(450)} gr`,
      price: Number(fk.commerce.price()),
      image: fk.image.image(),
    });
  }
  return itemList;
};

export default retrieveItemInfo;

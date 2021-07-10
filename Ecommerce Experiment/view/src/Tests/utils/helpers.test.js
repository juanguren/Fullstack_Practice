import { saveItemInLocal, constructMessageLayout } from "../../utils/helpers";
require("jest-localstorage-mock");

describe("Test saving an item in local storage", () => {
  beforeEach(() => {});
  it("Should return false if item is already found in localStorage", () => {
    const itemsStack = [];
    const mockItem = [
      {
        id: "5554",
        name: "",
        price: 5,
        quantity: 1,
      },
    ];
    const mockItemId = "5554";

    saveItemInLocal(mockItemId, mockItem);
    expect(sessionStorage.getItem).toHaveBeenCalled();
  });
});

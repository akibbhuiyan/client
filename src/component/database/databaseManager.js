//Push to localstorage
const getDatabaseCart = () => {
  const data = localStorage.getItem("productShop");
  return JSON.parse(data);
};
const addToDatabaseCart = (cart) => {
  localStorage.setItem("productShop", JSON.stringify(cart));
};
const removeFromDatabaseCart = (key) => {
  const currentCart = getDatabaseCart();
  delete currentCart[key];
  localStorage.setItem("productShop", JSON.stringify(currentCart));
};
const proccessOrder = (cart) => {
  localStorage.removeItem("productShop");
};
export {
  addToDatabaseCart,
  getDatabaseCart,
  removeFromDatabaseCart,
  proccessOrder,
};

//polly

const localStorage =
  window.localStorage ||
  (() => {
    let store = {};
    return {
      getItem(key) {
        return store[key];
      },
      setItem(key, value) {
        store[key] = value.toString();
      },
      clear() {
        store = {};
      },
    };
  })();

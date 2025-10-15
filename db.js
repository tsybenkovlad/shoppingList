import ShoppingList from "./ShoppingList.js";
let shoppingList = new ShoppingList("localhost", "root", "111111", "shopinglist")
await shoppingList.update(16, "цукор")
console.log(await shoppingList.list())
await shoppingList.close()
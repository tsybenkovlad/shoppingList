import express from "express"
import ShoppingList from "./ShoppingList.js";

let shoppingList = new ShoppingList("localhost", "root", "111111", "shopinglist")
const app = express();
app.use(express.static('public'));
app.use(express.json());
app.post("/add", async (request, response) => {
    let {name} = request.body
    if (name === undefined || name === null || name.trim() === "") {
        response.status(400).send({message: "Помилка вводу"});
        return;
    }
    await shoppingList.add(name)
    response.send({});
});
app.get("/list", async (request, response) => {
    let list = await shoppingList.list()
    response.send({list});
});
app.post("/delete", async (request, response) => {
    let {id} = request.body
    let items = await shoppingList.get(id)
    if (items.length === 0){
        response.status(404).send({message: "Не знайдено"});
        return;
    }
    await shoppingList.delete(id)
    response.send({});
});
app.post("/update", async (request, response) => {
    let {id, name} = request.body
    if (name === undefined || name === null || name.trim() === "" || Number(id) !== id) {
        response.status(400).send({message: "Помилка вводу"});
        return;
    }
    let items = await shoppingList.get(id)
    if (items.length === 0) {
        response.status(404).send({message: "Елемент не знайдено"});
        return;
    }
    await shoppingList.update(id, name)
    response.send({});
});
app.post("/check", async (request, response) => {
    let {id, checked} = request.body
    if (Boolean(checked) !== checked) {
        response.status(400).send({message: "Неправильний тип даних"});
        return;
    }
    let items = await shoppingList.get(id)
    if (items.length === 0) {
        response.status(404).send({message: "Елемент не знайдено"});
        return;
    }
    await shoppingList.check(id, checked)
    response.send({});
});
app.listen(8080, () => {
    console.log("Server started");
})

async function shutdown() {
    await shoppingList.close()
}

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
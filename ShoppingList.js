import * as mariadb from "mariadb";

export default class ShoppingList {
    #pool;

    constructor(host, user, password, database) {
        this.#pool = mariadb.createPool({
            host,
            user,
            password,
            database,
            connectionLimit: 5
        })
    }

    async add(name) {
        let conn = await this.#pool.getConnection();
        let query = "INSERT INTO shopping_list(name, checked) VALUE (?, ?)"
        try {
            await conn.query(query, [name, 0])
        } catch (err) {
            throw err;
        } finally {
            if (conn) await conn.end();
        }
    }

    async delete(id) {
        let conn = await this.#pool.getConnection();
        let query = "DELETE FROM shopping_list WHERE id = ?"
        try {
            await conn.query(query, [id])
        } catch (err) {
            throw err;
        } finally {
            if (conn) await conn.end();
        }
    }

    async list() {
        let conn = await this.#pool.getConnection();
        let query = "SELECT * FROM shopping_list"
        try {
            return await conn.query(query)
        } catch (err) {
            throw err;
        } finally {
            if (conn) await conn.end();
        }
    }

    async check(id, checked) {
        let conn = await this.#pool.getConnection();
        let query = "UPDATE shopping_list SET checked = ? WHERE id=?"
        try {
            await conn.query(query, [checked, id])
        } catch (err) {
            throw err;
        } finally {
            if (conn) await conn.end();
        }
    }

    async update(id, newName) {
        let conn = await this.#pool.getConnection();
        let query = "UPDATE shopping_list SET name = ? WHERE id=?"
        try {
            await conn.query(query, [newName, id])
        } catch (err) {
            throw err;
        } finally {
            if (conn) await conn.end();
        }
    }
    async get(id){
        let conn = await this.#pool.getConnection();
        let query = "select * from shopping_list where id = ?"
        try {
            return await conn.query(query, [id])
        } catch (err) {
            throw err;
        } finally {
            if (conn) await conn.end();
        }
    }

    async close() {
        await this.#pool.end()
    }
}
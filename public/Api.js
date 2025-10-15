class Api {
    async list() {
        let response = await fetch("/list")
        return await response.json()
    }
    async add(name) {
        if (name.trim() === "") {
            return;
        }
        await fetch("/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({name})
        })
    }
    async delete(id) {
        await fetch("/delete", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({id})
        })
    }
    async check(id, checked) {
        await fetch("/check", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({id, checked})
        })
    }
}
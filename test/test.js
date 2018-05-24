const Juhe = require("../index")
const api = new Juhe("a681024c2a8e013c53d67f13c42c296e")

test("Today of History", async () => {
    const ret = await api.toh()
    console.log(ret)
})

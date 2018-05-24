const Frisbee = require("frisbee")
const currentDate = new Date()
module.exports = class Juhe {
    constructor(key) {
        this.appkey = key
        this.api = new Frisbee({
            baseURI:"http://api.juheapi.com/japi"
        })
    }
    async toh(month = currentDate.getMonth() + 1, day = currentDate.getDate(), v = "1.0") {
        const result = await this.api.get("/toh", {body: {v, month, day, key: this.appkey}})
        if (result.err) throw result.err
        const body = JSON.parse(result.body)
        if (body["error_code"] !== 0) throw new Error(body.reason)
        return body.result
    }
}

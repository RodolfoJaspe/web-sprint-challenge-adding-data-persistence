require("dotenv").config()

const port = process.env.PORT

const server = require("./api/server")

server.listen(port, () => {
    console.log(`server running on port ${port}`)
})
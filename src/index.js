const express = require("express")
const userRouter = require("./routes/userRoutes")
const noteRouter = require("./routes/noteRoutes")
const app = express()
const dotenv = require("dotenv")
const cors = require("cors")

// This reads our env (environment) file and will change all our variables to system variables
dotenv.config()

const mongoose = require("mongoose")

// converts request body from string -> json
app.use(express.json())

// This is a middleware that adds some headers to the response from our api's
app.use(cors())

app.use("/users", userRouter)
app.use("/note", noteRouter)

app.get("/", (req, res) => {
    res.send("Notes API from Udit Shaw")
})

const PORT = process.env.PORT || 5000

mongoose.connect(process.env.MONGO_URL)
.then(() => {
    console.log("Mongoose connected");
    app.listen(PORT, () => {
        console.log(`Server started on port number ${PORT}`);
    })
}).catch((ex)=> {
    console.log("Exception occured while connecting mongoose: " + ex);
})
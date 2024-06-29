const express = require("express")
const userRouter = require("./routes/userRoutes")
const noteRouter = require("./routes/noteRoutes")
const app = express()

const mongoose = require("mongoose")

// converts request body from string -> json
app.use(express.json())

app.use("/users", userRouter)
app.use("/note", noteRouter)

app.get("/", (req, res) => {
    res.send("Hello")
})

mongoose.connect("mongodb+srv://admin:admin@cluster0.fvuww0b.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
.then(() => {
    console.log("Mongoose connected");
    app.listen(5000, () => {
        console.log("Server started on port number 5000");
    })
}).catch((ex)=> {
    console.log("Exception occured while connecting mongoose: " + ex);
})
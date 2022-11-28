const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { addItem,
    editItem,
    deleteItem,
    getItems } = require('./controllers/list-controller')
const app = express();

app.use(express.json());
app.use(cors())
// app.listen("9000", console.log("connected"))
mongoose
    .connect(
        "mongodb://root:root@localhost:27017/testdb2?&authSource=admin"
    )
    .then(() => console.log("Connected To Database"))
    .then(() => {
        app.listen(process.env.PORT || 9000);
    })
    .catch((err) => console.log(err));

app.get('/rest/', (req, res) => {
    res.send("adf")
})
app.post('/', addItem)
app.get('/', getItems)
app.delete('/:id', deleteItem)
app.put('/:id', editItem)
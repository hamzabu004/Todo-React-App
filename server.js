const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb+srv://hamzabu4:hamzabu4@todo-mern.hms6w7o.mongodb.net/?retryWrites=true&w=majority",{
    useNewUrlParser: true,
    useUnifiedTopology: true
})  .then(()=> console.log("Connected to Db"))
    .catch(console.error);

const Todo = require("./models/todo");

app.get("/todos", async (req, res) => {
    const todos = await Todo.find();
    res.json(todos)
})

app.post("/todo/new", (req, res) => {
    const todo = new Todo({
        text: req.body.text
    })
    todo.save();
    res.json(todo);

})

app.delete("/todo/delete/:id", async  (req, res) => {
    const result = await Todo.findByIdAndDelete(req.params.id)
    res.json(result)
});

app.put("/todo/complete/:id", async (req, res) => {
    const todo = await Todo.findById(req.params.id)
    todo.complete = !todo.complete;
    todo.save();
    res.json(todo)
})

app.listen( process.env.PORT || 3001 )
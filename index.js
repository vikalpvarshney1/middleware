const express = require("express");
const PORT = 8000;
const user = require('./user.json')
let app = express();


app.use(express.json())

app.get("/", (req, res) => {
    res.send("welcome to home page")
})
app.get("/books", (req, res) => {
    res.send("fetching all books")
})
app.get("/books/:id", (req, res) => {
    const { id } = req.params;
    // console.log({ id });
    const d = user.find((d) => d.id === Number(id));
    // console.log({ d });
    res.json(d)
})
app.get("/book", (req, res) => {
    let {name}=req.query;
   
    // http://localhost:8000/books?name=GameOfThrones
    if(name ){
        const d = user.find((d) => d.name === name );
        console.log({ d });
        res.json(d ||{})
    }

    else{
    res.json({
        request_from: req.url,
        data: user,
    })
}
})
app.post("/user", (req, res) => {
    // console.log("post to /user", req.body);
    user.push(req.body)
    // let error = new Error("unknow")
    res.json(req.body) //return on screen
    // res.send(error)
    // console.log(error); 
})
app.listen(PORT, () => {
    console.log(`Listing at Port: ${PORT}`);
})
const express = require("express");
const app = express();
const axios = require("axios");
const bodyParser = require("body-parser");
const port = 3000;
const dateModule = require(__dirname + "/date.js")

let items = ["Buy Food", "Cook Food", "Eat Food" ];
let workItems = [];

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
    extended : true
}));
app.use(express.static("public"));

app.get("/" , (req, res) =>{

    res.render("list", {listTittle : dateModule(), items : items});
});

app.post("/", (req, res) => {

    if(req.body.list == "Work"){
        workItems.push(req.body.listItems);
        res.redirect("/work");
    }else{
        items.push(req.body.listItems);
        res.redirect("/");
    }


});

app.get("/work", (req, res) =>{
    res.render("list", {listTittle: "Work List", items : workItems});
});
app.post("/work", (req, res) => {
    workItems.push(req.body.listItems);
    res.redirect("/work");
});

app.get("/about", (req, res) =>{
    res.render("about");
})

app.listen(port,  () =>{
    console.log(`listening at http://localhost:${port}`);
});
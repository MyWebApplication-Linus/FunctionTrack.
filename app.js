const express = require("express");
const app = express();
const axios = require("axios");
const bodyParser = require("body-parser");
const port = 3000;
const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wenesday", "Thursday", "Friday", "Saturday"];
let items = ["Buy Food", "Cook Food", "Eat Food" ];
let workItems = [];

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
    extended : true
}));
app.use(express.static("public"));

app.get("/" , (req, res) =>{
    let today = new Date();
    const options = {
        weekday:"long",
        day : "numeric",
        month : "long"
    }

    let day = today.toLocaleDateString("en-US", options);
    res.render("list", {listTittle : day, items : items});
});

app.post("/", (req, res) => {
    items.push(req.body.listItems);
    res.redirect("/");
});

app.get("/work", (req, res) =>{
    res.render("list", {listTittle: "Work List", items : workItems});
});
app.post("/work", (req, res) => {
    workItems.push(req.body.listItems);
    res.redirect("/work");
});



app.listen(port,  () =>{
    console.log(`listening at http://localhost:${port}`);
});
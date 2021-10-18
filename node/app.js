const express = require('express')
const bodyParser = require('body-parser');
const mysql = require('mysql');
const handleBars = require('express-handlebars'); 
const app = express();
const urlencodeParser=bodyParser.urlencoded({extended:false});

const port = 3000;

const config = {
        host: 'db',
        user: 'root',
        password: 'root',
        port: 3306,
        database: 'nodedb'
};

const con = mysql.createConnection(config);


//Tamplate engine
app.engine("handlebars", handleBars({defaultLayout:'main'}));
app.set('view engine','handlebars');

//Definir arquivos estaticos
app.use("/img", express.static("img"));
app.use("/css", express.static("css"));
app.use("/js", express.static("js"));


//Definição das rotas     
// app.get("/", function(req,res) {
//   res.render('index');
// })



app.get("/inserir", function(req,res) {
  res.render("inserir");
});
                           
app.post("/ctlInsert", urlencodeParser, function (req,res) {
    con.query("insert into people (name) values(?)", [req.body.name]);
    res.render('ctlInsert', {name:req.body.name});
});

app.get("/:id?", function(req,res) {
  if (!req.params.id) {
      con.query("select * from people order by name", function(err, results, fields){
        res.render("select", {data:results});
      });
  } else {
      con.query("select * from people where id = ?", [req.params.id], function(err,results, fields){
        res.render("select", {data:results});
      });
  }  
});

app.get("/deletar/:id", function(req,res) {
  con.query("delete from people where id =?",[req.params.id]);
  res.render("deletar");
});

app.get("/update/:id", urlencodeParser, function(req,res) {
  con.query("select * from people where id =?",[req.params.id], function(err, results, fields){
    res.render("update", {data:results});
  });  
});

app.post("/update/ctlUpdate", urlencodeParser, function(req,res) {
  con.query("update people set name = ? where id = ?", [req.body.name, req.body.id]);
  res.render("ctlUpdate");
});
     

app.listen(port,() => {
    console.log('Rodando na porta ' + port);
});
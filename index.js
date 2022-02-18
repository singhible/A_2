// create an express app
const express = require("express");
//const {urlencoded} = require("express");
const app = express();
const path = require("path");
//const PORT = process.env.PORT || 4000
const { Pool } = require('pg');
//const {connectionString} = require("pg/lib/defaults");
var pool;
pool = new Pool ({
  connectionString: process.env.DATABASE_URL
});

// use the express-static middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// define the first route
app.get("/", function (req, res) {
  res.send("<h1>Hello World!</h1>");
});


//display rectangles...
app.get("/views/pages/disp_rec.ejs", function (req, res){
  var getUsersQuery = `SELECT * FROM recs`;
  pool.query(getUsersQuery, (error,result) => {
    if(error)
      res.send(error);
    var results = {'rows': result.rows};
    res.render('pages/disp_rec',results);
  })
});
//delete rectangles
app.get('/views/pages/delete_rec.html', async (req, res) => {
  const NAME = req.body.RName;
  try{
    const newRec = await pool.query(`delete from recs where name=${NAME}`);
    res.send("Deleted");
  }
  catch(err){
    console.error(err);
  }
});

//submit request (post)
app.post('/addrec',async(req,res) => {

  const rna = req.body.rname;
  const len = req.body.length;
  const bread = req.body.breadth;
  const xof = req.body.x_offset;
  const yof = req.body.y_offset;
  const line = req.body.l_width;
  try{
    const newRec = await pool.query(`INSERT INTO recs values ('${rna}',${xof},${yof},${line},${len},${bread})`);
    res.send("Insertion");
  }
  catch(err){
    console.error(err);
  }
});
app.post('/deleterec',async(req,res) => {

  //const rna = req.body.RName;
  const len = req.body.length;
  const bread = req.body.breadth;
  const xof = req.body.x_offset;
  const yof = req.body.y_offset;
  const line = req.body.l_width;
  const NAME = req.body.RName;
  try{
    const Rec = await pool.query(`delete from recs where name='${NAME}'`);
    res.send("Deleted");
  }
  catch(err){
    console.error(err);
  }
});
// start the server listening for requests
app.listen(process.env.PORT || 4000 , () => console.log("Server is running..."));
const express=require('express');
const path=require('path');
const cors = require('cors');
const app=express();

app.use(cors());
// const exphbs = require('html');
const PORT=process.env.port || 5000;
// var members=require('./Members_json');                                                                                                                          
const { ensureAsync } = require('async');
var mysql = require('mysql');
const db = mysql.createConnection({
          host: 'localhost', 
          user: 'root', password: '', 
          database: 'adp',
      });
      db.connect((err) => {
          // you should probably add reject instead of throwing error
          // reject(new Error()); 
          if(err){throw err;}
          console.log('Mysql: Connected');
      });
      db.promise = (sql) => {
          return new Promise((resolve, reject) => {
              db.query(sql, (err, result) => {
                if(err){reject(new Error());}
                else{resolve(result);}
              });
          });
      };
connection= async ()=>{
  var result = await db.promise("SELECT * FROM users");
  // console.log(result);
  return result;
}
connection().then((result)=>{
  var members=(result);
  console.log(members);
  module.exports = members;
  app.use(express.json());
  // app.get('/',(req,res)=>res.render('index'));
  // app.engine('handlebars',exphbs.engine({defaultLayout:'main'}));
  // app.set('view engine', 'handlebars');
  // app.use(express.urlencoded({extended:false}));
  app.use('/api/members',require('./members'));
  // app.use('/api/members', require('./members'));
  // app.get('/', (req, res) =>
  //   res.render('index', {
  //     title: 'Member App',
  //     members
  //   })
  // );
  app.listen(PORT,()=>console.log(`Server started on port: ${PORT}`));
  console.log(members);
})
// console.log(members);
// var mysql = require('mysql');

// var con = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: ""
// });

// con.connect(function(err) {
//   if (err) throw err;
//   console.log("Connected!");
// });

// module.exports=members;
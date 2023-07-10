var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database:"adp"
});
const express=require('express');
const router=express.Router();
// var members=require('./Members_json')
const { ensureAsync } = require('async');
// const mysql = require('mysql');
var db = mysql.createConnection({
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
                if(err){console.log(err);}
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
  // console.log();
  // module.exports = members;
  // get all members
  router.get('/',(req,res)=>res.json(members));
  // single member
  router.post('/user',(req,res)=>{
    console.log(JSON.stringify(req.body));
    const newmember={
      user_id:req.body.user_id
  }
  console.log(newmember.user_id);
  connection= async ()=>{
    var result = await db.promise("SELECT * FROM users");
    // console.log(result);
    return result;
  }
  connection().then((result)=>{
    var members=(result);
    const found=members.some((members=>members.user_id===parseInt(newmember.user_id)));
    if(found){
        console.log(1, members=>members.user_id===parseInt(newmember.user_id));
        res.json(members.filter(member=>member.user_id===parseInt(newmember.user_id)));
    }
    else{
        res.json("invalid login credentials");
    }
  
  });
});
  //login check
  router.post('/login',(req,res)=>{
    console.log(JSON.stringify(req.body));
    const newmember={
      user_email:req.body.user_email,
      user_password:req.body.user_password
  }
  console.log(newmember.user_password);
  connection= async ()=>{
    var result = await db.promise("SELECT * FROM users");
    // console.log(result);
    return result;
  }
  connection().then((result)=>{
    var members=(result);
    const found1=members.some((members=>members.user_email===(newmember.user_email)));
    const found2=members.some((members=>members.user_password===(newmember.user_password)));
    if(found1 && found2){
        var s=(members.filter(members=>members.user_email===(newmember.user_email)));
        console.log(s[0].user_id);
        res.json(s[0]);
    }
    else{
        res.json("invalid login credentials");
    }});
  });
  // create new member
  router.post('/',(req,res)=>{
      console.log(JSON.stringify(req.body));
      const newmember={
          user_name:req.body.user_name,
          user_email:req.body.user_email,
          age:req.body.age,
          gender:req.body.gender,
          user_password:req.body.user_password
      }
      if(!newmember.user_name || !newmember.user_email  || !newmember.user_password || !newmember.age || !newmember.gender){
          return res.status(404).json("Please enter correct details");
      }
      members.push(newmember);
      var mysql = require('mysql');

      var con = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "",
      database:"adp"
      });
      con.connect(function(err) {
          if (err) throw err;
          console.log("Connected!");
          var l=[[newmember.user_name,newmember.user_password,newmember.age,newmember.gender,newmember.user_email]];
          console.log(l);
          var sql = "INSERT INTO users(user_name,user_password,age,gender,user_email) VALUES ?";
          con.query(sql,[l], function(queryError, queryResult){
            if(queryError){
              throw queryError;
            }
            console.log(queryResult);
          });
          con.commit(function(err) {
              if (err) { 
                con.rollback(function() {
                  throw err;
                });
              }
              console.log('success!');
            });
            var sql=`Select user_id from users where user_email='${newmember.user_email}'`
            con.query(sql, function(queryError, queryResult){
              if(queryError){
                throw queryError;
              }
              console.log(queryResult);
              res.json(queryResult[0]);
            });
      
        });
  });
  
})
// console.log(members);
connection= async ()=>{
  var result = await db.promise("SELECT * FROM trains");
  // console.log(result);
  return result;
}
connection().then(async(result)=>{
  var trainsw=(JSON.parse(JSON.stringify(result)));
  // console.log();
  // module.exports = members;

router.post('/search',(req,res)=>{
  connection= async ()=>{
    var result = await db.promise("SELECT * FROM trains");
    // console.log(result);
    return result;
  }
  connection().then(async(result)=>{
    var trainsw=(JSON.parse(JSON.stringify(result)));
  const newentry={
      t_source:req.body.t_source,
      t_destination:req.body.t_destination,
      t_date:req.body.t_date
  }
  console.log(trainsw)
  const found=trainsw.some((train) => {return train.t_source === newentry.t_source && train.t_destination === newentry.t_destination && train.t_date === newentry.t_date});
  console.log(JSON.stringify(newentry));
  console.log(found)
  if(found){
      res.json(trainsw.filter((train) => {return train.t_source === newentry.t_source && train.t_destination === newentry.t_destination && train.t_date === newentry.t_date}));
  }
  else{
      res.json({});
  }
});
});
router.post('/new',(req,res)=>{
  connection= async ()=>{
    var result = await db.promise("SELECT * FROM trains");
    // console.log(result);
    return result;
  }
  connection().then(async(result)=>{
    var trainsw=(JSON.parse(JSON.stringify(result)));
  var newbook={
      user_id:parseInt(req.body.user_id),
      train_id:parseInt(req.body.train_id),
      seats:parseInt(req.body.seats)
  }
  console.log(newbook);
  if(!newbook.user_id || !newbook.train_id || !newbook.seats){
    console.log(newbook);
      return res.status(400).json("Please enter correct details");
  }

  var mysql = require('mysql');
  var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database:"adp"
  });
  con.connect(function(err) {
      if (err) throw err;
      console.log("Connected!");
      var l=[[newbook.user_id,newbook.train_id,newbook.seats]];
      var sql = `select t_seats from trains where train_id='${newbook.train_id}'`;
          // console.log(sql);
          con.query(sql, function(queryError, queryResult){
            if(queryError){
              throw queryError;
            }
            // console.log(i);
          // var query1=queryResult;
          var  query1=JSON.parse(JSON.stringify(queryResult));
          console.log(query1[0]);
          console.log((query1[0].t_seats));
      console.log(l);
      if(query1[0].t_seats<newbook.seats){return res.status(400).json("Not enough seats");}
      console.log(1234);
      var sql = "INSERT INTO booking(user_id,train_id,seats) VALUES ?";
      con.query(sql,[l], function(queryError, queryResult){
        if(queryError){
          throw queryError;
        }
        console.log(queryResult);
        // return res.json("value updated ");
        res.json(queryResult)
      });
      con.commit(function(err) {
        if (err) { 
          con.rollback(function() {
            throw err;
          });
        }
        console.log('success!');
      });
      var seat_remain=query1[0].t_seats-newbook.seats;
      console.log(seat_remain);
      var sql = `UPDATE trains set t_seats='${seat_remain}' where  train_id='${newbook.train_id}'`;
      // console.log(sql);
      con.query(sql, function(queryError, queryResult){
        if(queryError){
          throw queryError;
        }
      })
      con.commit(function(err) {
          if (err) { 
            con.rollback(function() {
              throw err;
            });
          }
          console.log('success!');
        });
      });
    });
});

})

router.post('/profile',(req,res)=>{
  var newentry={
      user_id:parseInt(req.body.user_id)
  }
connection= async ()=>{
  var result = await db.promise("SELECT * FROM booking where user_id="+newentry.user_id.toString());
  console.log(result);
  return result;
}
connection().then(async(result)=>{
  var bookings=(result);
    console.log(JSON.stringify(bookings))
    const found=bookings;
    console.log(found);
    console.log(JSON.stringify(newentry));
    console.log(typeof(found))
    if(found){
      var mysql = require('mysql');

      var con = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "",
      database:"adp"
      });
      // var query1;
      con.connect(function(err) {
          if (err) throw err;
          console.log("Connected!");
          var sql = `select train_id from booking where user_id='${newentry.user_id}'`;
          // console.log(sql);
          con.query(sql, function(queryError, queryResult){
            if(queryError){
              throw queryError;
            }
            // console.log(i);
          // var query1=queryResult;
          var  query1=JSON.parse(JSON.stringify(queryResult));
          if(query1.length == 0){res.status(400).json({});return;}
          var arr=[];
          console.log(JSON.stringify(query1))
          query1.forEach(element => {
            console.log(element.train_id);  
            var k=parseInt(element.train_id);
            var sql = `select train_id,t_source,t_destination,t_date,t_start_time,t_stop_time from trains where train_id=${k}`;
            con.query(sql, function(queryError, queryResult){
              if(queryError){
                throw queryError;
              }
              // console.log(i);
              arr.push((queryResult[0]));
            
          });
        })
        const s = setInterval(()=>{
          if(arr.length == query1.length){
            res.json(arr);
            clearInterval(s);
          }
        }, 100)
        // res.json(arr)
          con.commit(function(err) {
              if (err) { 
                con.rollback(function() {
                  throw err;
                });
              }
              console.log('success!');
            });});

    })
  }
  });
});
})
module.exports=router;
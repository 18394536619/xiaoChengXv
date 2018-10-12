require('babel-polyfill');
var Alumnus=require('../model/alumnus');
var alumnusDB=require('./alumnusDB');

//alumnusDB.findAll().then(function(data){
//console.log(data);
//}).catch(function(error){
//console.log("报错了 ！"+error);
//});
//id,name,gender,nation,birth,gradtime,college,dress,phone,major,edu,state
var alumnus = new Alumnus(null,'王五','男','汉','1996-01-01','1996-01-01','大','吃饭','12345678996',null,null,null);
alumnusDB.save(alumnus).then(function(data){
  console.log(data);
}).catch(function(error){
  console.log("报错了 ！"+error);
});
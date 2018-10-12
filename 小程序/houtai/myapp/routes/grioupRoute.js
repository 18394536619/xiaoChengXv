let express=require('express');
let route=express.Router();
let grioupDB=require('../db/grioupDB');
let Grioup=require('../model/grioup');

route.get('/findAll',(req,resp)=>{
  grioupDB.findAll().then((data)=>{
  	var a=data.length;
  	// console.log('++++++',data[a-1].grioup.id);
  	var k=0;
  	 	 resp.send(data);
   
  }).catch((error)=>{
    resp.send(error);
  });
});
//通过id查询
route.get('/findById',(req,resp)=>{
  grioupDB.findById(req.query.id).then((data)=>{
    resp.send(data);
  }).catch((error)=>{
    resp.send(error);
  });
});
//模糊查询
route.get('/query',(req,resp)=>{
//	console.log(rep);
  grioupDB.query(req.query.keys).then((data)=>{
//   console.log(data);
    resp.send(data);
  }).catch((error)=>{
    resp.send(error);
  });
});
route.get('/findByName',(req,resp)=>{
  grioupDB.query(req.query.name).then((data)=>{
  		// console.log(data);
    resp.send(data);
  }).catch((error)=>{
    resp.send(error);
  });
});
//录入
route.post('/save',(req,resp)=>{

  let grioup = new Grioup();
  Object.assign(grioup,req.body);
  grioupDB.save(grioup).then((data)=>{
    resp.send(data);
  }).catch((error)=>{
    resp.send(error);
  });
});
//修改
route.post("/update",(req,resp)=>{
  let grioup = new Grioup();
  // console.log('dd');
 
  Object.assign(grioup,req.body);
  grioupDB.update(grioup).then((data)=>{
     // console.log(data);
    resp.send(data);
  }).catch((error)=>{
    resp.send(error);
  });
})
//批量删除
route.post('/batchDelete',(req,resp)=>{
  var ids = JSON.parse(req.body.ids);
  grioupDB.batchDelete(ids).then((data)=>{
    resp.send(data);
  }).catch((error)=>{
    resp.send(error);
  });
});

module.exports = route;
let express=require('express');
let route=express.Router();
let alumnusDB=require('../db/alumnusDB');
let Alumnus=require('../model/Alumnus');

route.get('/findAll',(req,resp)=>{
	alumnusDB.findAll().then((data)=>{
		resp.send(data);
	}).catch((error)=>{
		resp.send(error);
	});
});
route.get('/findById',(req,resp)=>{
	alumnusDB.findById(req.query.id).then((data)=>{
		resp.send(data);
	}).catch((error)=>{
		resp.send(error);
	});
});
route.get('/findByName',(req,resp)=>{
  alumnusDB.findByName(req.query.name).then((data)=>{
        resp.send(data);
  }).catch((error)=>{
    resp.send(error);
  });
});
route.get('/query',(req,resp)=>{
	alumnusDB.query(req.query.keys).then((data)=>{
		resp.send(data);
	}).catch((error)=>{
		resp.send(error);
	});
});
route.get('/findClazz',(req,resp)=>{
	alumnusDB.findClazz(req.query.grade,req.query.clazz).then((data)=>{
		resp.send(data);
	}).catch((error)=>{
		resp.send(error);
	});
});
route.post('/save',(req,resp)=>{
	let alumnus = new Alumnus();
	Object.assign(alumnus,req.body);
	alumnusDB.save(alumnus).then((data)=>{
		resp.send(data);
	}).catch((error)=>{
		resp.send(error);
	});
});
route.post('/savepwd',(req,resp)=>{
	let alumnus = new Alumnus();
	Object.assign(alumnus,req.body);
	alumnusDB.savepwd(alumnus).then((data)=>{	
		resp.send(data);
	}).catch((error)=>{
		resp.send(error);
	});
});
route.post('/savestate',(req,resp)=>{
	let alumnus = new Alumnus();
	Object.assign(alumnus,req.body);
	alumnusDB.savestate(alumnus).then((data)=>{	
		resp.send(data);
	}).catch((error)=>{
		resp.send(error);
	});
});
route.post('/update',(req,resp)=>{
	let alumnus = new Alumnus();
  	Object.assign(alumnus,req.body);
	alumnusDB.update(alumnus).then((data)=>{
		resp.send(data);
	}).catch((error)=>{
		resp.send(error);
	});
});
route.post('/updatepwd',(req,resp)=>{
	let alumnus = new Alumnus();
  	Object.assign(alumnus,req.body);
	alumnusDB.updatepwd(alumnus).then((data)=>{
		resp.send(data);
	}).catch((error)=>{
		resp.send(error);
	});
});
route.post('/updatestate',(req,resp)=>{
	let alumnus = new Alumnus();
  	Object.assign(alumnus,req.body);
	alumnusDB.updatestate(alumnus).then((data)=>{
		resp.send(data);
	}).catch((error)=>{
		resp.send(error);
	});
});
route.post('/batchDelete',(req,resp)=>{
  var ids = JSON.parse(req.body.ids);
  alumnusDB.batchDelete(ids).then((data)=>{
    resp.send(data);
  }).catch((error)=>{
    resp.send(error);
  });
});
route.post('/register',(req,resp)=>{
	let alumnus = new Alumnus();
	Object.assign(alumnus,req.body);
	alumnusDB.register(alumnus).then((data)=>{
		resp.send(data);
	}).catch((error)=>{
		resp.send(error);
	});
});
route.post('/regist',(req,resp)=>{
	let alumnus = new Alumnus();
	Object.assign(alumnus,req.body);
	alumnusDB.regist(alumnus).then((data)=>{
		resp.send(data);
	}).catch((error)=>{
		resp.send(error);
	});
});
route.post('/login',(req,resp)=>{
  alumnusDB.login(req.body.name,req.body.phone,req.body.password).then((data)=>{
        resp.send(data);
  }).catch((error)=>{
    resp.send(error);
  });
});

module.exports = route;
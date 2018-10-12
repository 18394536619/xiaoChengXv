let pool=require('./pool');

module.exports={
    //关键字查询
    query(keys){
        var sql="select * from alumnus where name like '%"+keys+"%' or gender like '%"+keys+"%' or college like '%"+keys+"%' or dress like '%"+keys+"%' or major like '%"+keys+"%' or clazz like '%"+keys+"%' or grade like '%"+keys+"%' or edu like '%"+keys+"%'";
        return pool.execute(sql);
    },
    findClazz(grade,clazz){
    	var sql="select * from alumnus where grade ='"+grade+"' and clazz='"+clazz+"'";
//  	 console.log('+++findclazz++++',sql);
        return pool.execute(sql);
    },
    //关键字查询
    findById(id){
        var sql="select * from alumnus where id="+id;
        return pool.execute(sql);
    },   
    findAll(){
        var sql="select * from alumnus";
        return pool.execute(sql);
    },
    findByName(name){
        var sql="select * from alumnus where name='"+name+"'";
        return pool.execute(sql);
    },
    batchDelete(ids){
         var sql = "ALTER TABLE alumnus DROP FOREIGN KEY grioup_ibfk_1";
       pool.execute(sql);
        var sql="delete from alumnus where id in ("+ids.join()+")";
        return pool.execute(sql);
    },
    save(alumnus){
        var sql="insert into alumnus(name,gender,nation,birth,gradtime,college,dress,phone,major,edu,grade,clazz,password) values('"+alumnus.name+"','"
        +alumnus.gender+"','"+alumnus.nation+"','"
        +alumnus.birth+"','"+alumnus.gradtime+"','"
        +alumnus.college+"','"+alumnus.dress+"','"
        +alumnus.phone+"','"+alumnus.major+"','"+alumnus.edu+"','"+alumnus.grade+"','"+alumnus.clazz+"','"+alumnus.password+"')";
        return pool.execute(sql);
    },
    savepwd(alumnus){
        var sql="insert into alumnus(password) values('"+alumnus.password+"')";
        return pool.execute(sql);
    },
    savestate(alumnus){
        var sql="insert into alumnus(state) values("+alumnus.state+")";
        return pool.execute(sql);
    },
    update(alumnus){
        var sql="update alumnus set name='"+alumnus.name+"',gender='"
        +alumnus.gender+"',nation='"+alumnus.nation+"',birth='"
        +alumnus.birth+"',gradtime='"+alumnus.gradtime+"',college='"
        +alumnus.college+"',dress='"+alumnus.dress+"',phone='"
        +alumnus.phone+"',major='"+alumnus.major+"',edu='"+alumnus.edu+"',grade='"+alumnus.grade+"',clazz='"+alumnus.clazz+"' where id="+alumnus.id;
        return pool.execute(sql);
    },
    
    updatepwd(alumnus){
        var sql="update alumnus set password='"+alumnus.password+"' where id="+alumnus.id;
        return pool.execute(sql);
    },
    updatestate(alumnus){
        var sql="update alumnus set state="+alumnus.state+" where id="+alumnus.id;
        return pool.execute(sql);
    },
    login(name,phone,password){
    	
        var sql="select * from alumnus where name='"+name+"' and phone='"+phone+"' and password='"+password+"'";
        return pool.execute(sql);
    },
    register(alumnus){
        var sql="insert into alumnus(name,college,phone,password,state) values('"+alumnus.name+"','"
        +alumnus.college+"','"
        +alumnus.phone+"','"+alumnus.password+"',"+alumnus.state+")";
        return pool.execute(sql);
    },
    regist(alumnus){
        var sql="update alumnus set name='"+alumnus.name+"',college='"
        +alumnus.college+"',phone='"
        +alumnus.phone+"',password='"+alumnus.password+"' where id="+alumnus.id;
        return pool.execute(sql);
    },
}
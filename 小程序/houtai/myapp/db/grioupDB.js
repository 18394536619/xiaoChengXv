let pool=require('./pool');

module.exports={
    //关键字查询
    query(keys){
        var sql="select * from grioup where groupname like '%"+keys+"%' or province like '%"+keys+"%' or city like '%"+keys+"%' or alumnus_id like '%"+keys+"%'";
        return pool.execute(sql);
    },
    //关键字查询
    findById(id){
        var sql="select * from grioup where id="+id;
        return pool.execute(sql);
    },
    findByName(name){
        var sql="select * from grioup where groupname='"+name+"'";
        return pool.execute(sql);
    },
    findAll(){

        var sql="select grioup.id , grioup.groupname,grioup.foundtime,grioup.province,grioup.city,grioup.mem,alumnus.name from grioup , alumnus where alumnus.id=grioup.alumnus_id;";
        return pool.execute(sql);
    },
    batchDelete(ids){
        var sql="delete from grioup where id in ("+ids.join()+")";
        return pool.execute(sql);
    },
    save(grioup){
        var sql="insert into grioup(groupname,province,city,foundtime,mem,alumnus_id) values('"+grioup.groupname+"','"
        +grioup.province+"','"+grioup.city+"','"
        +grioup.foundtime+"',"+grioup.mem+","
        +grioup.alumnus_id+")";
        return pool.execute(sql);

    },
    update(grioup){
        var sql="update grioup set groupname='"+grioup.groupname+"',province='"
        +grioup.province+"',city='"+grioup.city+"',foundtime='"
        +grioup.foundtime+"',mem='"+grioup.mem+"',alumnus_id="
        +grioup.alumnus_id+ " where id="+grioup.id;
        return pool.execute(sql);
    }
}
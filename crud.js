const {client} = require('./database/database')

module.exports.executeQuery = async (query) => 
{
    console.log("timestamp---->"+new Date());
    console.log(query)
    var obj={};
    try{
        var res= await client.query(query);
        // console.log(".....",res)
        obj={
            status:true,
            data:res.rows
        }
    }
    catch(err){
        console.log(err);       
        obj={
            status:false,
            data:[]
        }
    }
    return obj;
}


module.exports.makeInsertQueryString = (tablename,valueArr,returningArr,flagReturnAll) => {
    var sql = "";
    var values = valueArr.map(obj => {
        if(obj.value == null){
            return "NULL";
        }
        else if(typeof(obj.value) == "string"){
            return "'"+obj.value.replace(/'/gi, "''")+"'";
        }else{
            return obj.value;
        }
    }).join(",");
    if(flagReturnAll){
        sql =  `INSERT INTO ${tablename}(${valueArr.map(obj => obj.field).join(",")}) VALUES (${values}) Returning *;`;
    }else{
        sql = `INSERT INTO ${tablename}(${valueArr.map(obj => obj.field).join(",")}) VALUES (${values}) Returning ${returningArr.join(",")}`;
        // sql = `INSERT INTO ${tablename}(${valueArr.map(obj => obj.field).join(",")}) VALUES (${values});`;
    }
    console.log("dynamic sql");

    console.log(sql);
    return sql;
}

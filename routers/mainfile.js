const express = require('express');
const crud = require('../crud')

// var contactList = ['+91 1234567890', '+911234567890','1234567890','1234567890','+91 2345654323'];
var unique = (v,i,self)=>{
    return i == self.indexOf(v)
}
const MyFunction = async(valu)=>{
    var satusresults = {status:true, data:[]}

    var numberarry = valu.map( (itms)=>{ return itms.replace("+91","").trim()});
    var filterarry =numberarry.filter(unique);
    var filtercontectList = filterarry.map( itm => itm.replace("","+91"));
    var sql =`SELECT * FROM public.contect_list where contect_number in ('${filtercontectList.join("','")}') ORDER BY contect_id ASC`
    var checkData = await crud.executeQuery(sql);
    if(!checkData.status){
        return{
            status:false,
            error:" MYSQL ERROR..."
        }
    }
    if(checkData.data.length > 0){
        return {
            status:false,
            error:"Already Exist"
        }
    }
    for(i=0;i<filtercontectList.length;i++){
        var valuearry =[{field:"contect_number", value:filtercontectList[i]}];
        var setContectInData = await crud.executeQuery(crud.makeInsertQueryString("contect_list",valuearry,['contect_id'],false));
        let id = setContectInData.data[0]['contect_id'];
        satusresults.data.push({
            contect_id : id
        });
        
    }
   
    return satusresults
}
// MyFunction(contactList)

module.exports ={
    MyFunction:MyFunction
}

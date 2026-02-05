// @target: es2015
function isEmpty(list: {length:number;})
{
return list.length ===0;
}
 
isEmpty([]); // error
 

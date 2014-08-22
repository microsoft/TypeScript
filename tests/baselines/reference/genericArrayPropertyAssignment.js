//// [genericArrayPropertyAssignment.ts]
function isEmpty(list: {length:number;})
{
return list.length ===0;
}
 
isEmpty([]); // error
 


//// [genericArrayPropertyAssignment.js]
function isEmpty(list) {
    return list.length === 0;
}
isEmpty([]); // error

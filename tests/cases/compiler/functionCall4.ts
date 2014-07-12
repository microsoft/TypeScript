function foo():any{return ""}; 
function bar():()=>any{return foo}; 
var x = bar();
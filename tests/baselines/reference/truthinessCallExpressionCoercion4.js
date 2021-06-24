//// [truthinessCallExpressionCoercion4.ts]
const or = x => y => x || y;

if (or(true)) { // error
  
}


//// [truthinessCallExpressionCoercion4.js]
var or = function (x) { return function (y) { return x || y; }; };
if (or(true)) { // error
}

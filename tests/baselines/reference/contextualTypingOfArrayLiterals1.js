//// [contextualTypingOfArrayLiterals1.ts]
interface I {
   [x: number]: Date;
}

var x3: I = [new Date(), 1]; 
var r2 = x3[1]; 
r2.getDate(); 


//// [contextualTypingOfArrayLiterals1.js]
var x3 = [new Date(), 1];
var r2 = x3[1];
r2.getDate();

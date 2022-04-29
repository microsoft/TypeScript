//// [functionType.ts]
function salt() {}
salt.apply("hello", []);
(new Function("return 5"))();
 
 


//// [functionType.js]
function salt() { }
salt.apply("hello", []);
(new Function("return 5"))();

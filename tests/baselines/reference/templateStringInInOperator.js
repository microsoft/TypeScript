//// [templateStringInInOperator.ts]
var x = `${ "hi" }` in { hi: 10, hello: 20};

//// [templateStringInInOperator.js]
var x = "" + "hi" in { hi: 10, hello: 20 };

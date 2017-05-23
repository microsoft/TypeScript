//// [newExpressionWithCast.ts]
function Test() { }
// valid but error with noImplicitAny
var test = new Test();

function Test2() { }
// parse error
var test2 = new <any>Test2();

function Test3() { }
// valid with noImplicitAny
var test3 = new (<any>Test3)();



//// [newExpressionWithCast.js]
function Test() { }
// valid but error with noImplicitAny
var test = new Test();
function Test2() { }
// parse error
var test2 = new  < any > Test2();
function Test3() { }
// valid with noImplicitAny
var test3 = new Test3();

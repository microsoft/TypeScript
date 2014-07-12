//// [newFunctionImplicitAny.ts]
// No implicit any error given when newing a function (up for debate)

function Test() { }
var test = new Test();

//// [newFunctionImplicitAny.js]
function Test() {
}
var test = new Test();

//// [arrowFunctionWithObjectLiteralBody5.ts]
var a = () => <Error>{ name: "foo", message: "bar" };      

var b = () => (<Error>{ name: "foo", message: "bar" });    

var c = () => ({ name: "foo", message: "bar" });           

var d = () => ((<Error>({ name: "foo", message: "bar" })));

//// [arrowFunctionWithObjectLiteralBody5.js]
var a = function () { return ({ name: "foo", message: "bar" }); };
var b = function () { return ({ name: "foo", message: "bar" }); };
var c = function () { return ({ name: "foo", message: "bar" }); };
var d = function () { return ({ name: "foo", message: "bar" }); };

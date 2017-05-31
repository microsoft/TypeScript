//// [arrowFunctionWithObjectLiteralBody5.ts]
var a = () => <Error>{ name: "foo", message: "bar" };      

var b = () => (<Error>{ name: "foo", message: "bar" });    

var c = () => ({ name: "foo", message: "bar" });           

var d = () => ((<Error>({ name: "foo", message: "bar" })));

//// [arrowFunctionWithObjectLiteralBody5.js]
var a = function a() { return ({ name: "foo", message: "bar" }); };
var b = function b() { return ({ name: "foo", message: "bar" }); };
var c = function c() { return ({ name: "foo", message: "bar" }); };
var d = function d() { return (({ name: "foo", message: "bar" })); };

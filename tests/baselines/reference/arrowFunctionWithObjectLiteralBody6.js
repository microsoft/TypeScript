//// [tests/cases/compiler/arrowFunctionWithObjectLiteralBody6.ts] ////

//// [arrowFunctionWithObjectLiteralBody6.ts]
var a = () => <Error>{ name: "foo", message: "bar" };      

var b = () => (<Error>{ name: "foo", message: "bar" });    

var c = () => ({ name: "foo", message: "bar" });           

var d = () => ((<Error>({ name: "foo", message: "bar" })));

//// [arrowFunctionWithObjectLiteralBody6.js]
var a = () => ({ name: "foo", message: "bar" });
var b = () => ({ name: "foo", message: "bar" });
var c = () => ({ name: "foo", message: "bar" });
var d = () => ({ name: "foo", message: "bar" });

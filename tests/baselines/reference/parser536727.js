//// [tests/cases/conformance/parser/ecmascript5/RegressionTests/parser536727.ts] ////

//// [parser536727.ts]
function foo(f: (x: string) => string) {
    return f("");
}
var g = (x: string) => x + "blah";
var x = () => g;
foo(g);
foo(() => g);
foo(x);


//// [parser536727.js]
function foo(f) {
    return f("");
}
var g = function (x) { return x + "blah"; };
var x = function () { return g; };
foo(g);
foo(function () { return g; });
foo(x);

//// [tests/cases/conformance/dynamicImport/importCallExpressionSpecifierNotStringTypeError.ts] ////

//// [importCallExpressionSpecifierNotStringTypeError.ts]
declare function getSpecifier(): boolean;
declare var whatToLoad: boolean;

// Error specifier is not assignable to string
import(getSpecifier());
var p1 = import(getSpecifier());
const p2 = import(whatToLoad ? getSpecifier() : "defaulPath")
p1.then(zero => {
    return zero.foo();  // ok, zero is any
});

var p3 = import(["path1", "path2"]);
var p4 = import(()=>"PathToModule");

//// [importCallExpressionSpecifierNotStringTypeError.js]
// Error specifier is not assignable to string
Promise.resolve(`${getSpecifier()}`).then(s => require(s));
var p1 = Promise.resolve(`${getSpecifier()}`).then(s => require(s));
const p2 = Promise.resolve(`${whatToLoad ? getSpecifier() : "defaulPath"}`).then(s => require(s));
p1.then(zero => {
    return zero.foo(); // ok, zero is any
});
var p3 = Promise.resolve(`${["path1", "path2"]}`).then(s => require(s));
var p4 = Promise.resolve(`${() => "PathToModule"}`).then(s => require(s));

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
var __resolved = new Promise(function (resolve) { resolve(); });
// Error specifier is not assignable to string
__resolved.then(function () { return require(getSpecifier()); });
var p1 = __resolved.then(function () { return require(getSpecifier()); });
const p2 = __resolved.then(function () { return require(whatToLoad ? getSpecifier() : "defaulPath"); });
p1.then(zero => {
    return zero.foo(); // ok, zero is any
});
var p3 = __resolved.then(function () { return require(["path1", "path2"]); });
var p4 = __resolved.then(function () { return require(() => "PathToModule"); });

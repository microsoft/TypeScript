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
(_a => Promise.resolve().then(() => require(_a)))(getSpecifier());
var p1 = (_b => Promise.resolve().then(() => require(_b)))(getSpecifier());
const p2 = (_c => Promise.resolve().then(() => require(_c)))(whatToLoad ? getSpecifier() : "defaulPath");
p1.then(zero => {
    return zero.foo(); // ok, zero is any
});
var p3 = (_d => Promise.resolve().then(() => require(_d)))(["path1", "path2"]);
var p4 = (_e => Promise.resolve().then(() => require(_e)))(() => "PathToModule");

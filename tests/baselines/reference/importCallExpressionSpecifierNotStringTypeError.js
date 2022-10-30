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
var _a, _b, _c, _d, _e;
// Error specifier is not assignable to string
_a = getSpecifier(), Promise.resolve().then(() => require(_a));
var p1 = (_b = getSpecifier(), Promise.resolve().then(() => require(_b)));
const p2 = (_c = whatToLoad ? getSpecifier() : "defaulPath", Promise.resolve().then(() => require(_c)));
p1.then(zero => {
    return zero.foo(); // ok, zero is any
});
var p3 = (_d = ["path1", "path2"], Promise.resolve().then(() => require(_d)));
var p4 = (_e = () => "PathToModule", Promise.resolve().then(() => require(_e)));

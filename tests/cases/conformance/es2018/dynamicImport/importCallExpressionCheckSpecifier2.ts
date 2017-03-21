// @module: commonjs
// @target: es6
// @noImplicitAny: false

declare function getSpecifier(): boolean;
declare var whatToLoad: boolean;
// Error specifier is not assignable to string
import(getSpecifier());
var p1 = import(getSpecifier());
const p2 = import(whatToLoad ? getSpecifier() : "defaulPath")
p1.then(zero => {
    return zero.foo();  // ok, zero is any
});
// @module: commonjs
// @target: es6
// @noImplicitAny: false

declare function getSpecifier(): string;
declare var whatToLoad: boolean;
import(getSpecifier());
var p1 = import(getSpecifier());
const p2 = import(whatToLoad ? getSpecifier() : "defaulPath")
p1.then(zero => {
    return zero.foo();  // ok, zero is any
});
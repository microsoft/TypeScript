// @module: es2018
// @target: esnext
// @filename: 0.ts
// @noImplicitAny: true

// @filename: 1.ts
declare function ValidSomeCondition(): boolean;
import(ValidSomeCondition() ? "./0" : "externalModule");  // implicit any error
var p1 = import(ValidSomeCondition() ? "./0" : "externalModule");  // implicit any error
p1.then(zero => {
    return zero.foo();  // ok
});
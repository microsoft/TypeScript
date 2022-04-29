//// [typeArgumentDefaultUsesConstraintOnCircularDefault.ts]
type Test<T extends string = T> = { value: T };  // Error

let zz: Test = { foo: "abc" };  // should error on comparison with Test<string>

let zzy: Test = { value: {} };

// Simplified repro from #28873

class C1<T extends C1 = any> {}

class C2<T extends C2<any> = any> {}


//// [typeArgumentDefaultUsesConstraintOnCircularDefault.js]
var zz = { foo: "abc" }; // should error on comparison with Test<string>
var zzy = { value: {} };
// Simplified repro from #28873
var C1 = /** @class */ (function () {
    function C1() {
    }
    return C1;
}());
var C2 = /** @class */ (function () {
    function C2() {
    }
    return C2;
}());

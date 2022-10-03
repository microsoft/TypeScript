//// [noImplicitAnyNamelessParameter.ts]
class C { }
declare var a: { m(...string): void }
declare var b: (string, C) => void;
declare var c: { (C, number): void };
declare var d: { m(boolean, C, object, undefined): void }
// note: null and void do not parse correctly without a preceding parameter name


//// [noImplicitAnyNamelessParameter.js]
var C = /** @class */ (function () {
    function C() {
    }
    return C;
}());
// note: null and void do not parse correctly without a preceding parameter name

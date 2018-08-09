//// [destructureComputedProperty.ts]
declare const ab: { n: number } | { n: string };
const nameN = "n";
const { [nameN]: n } = ab;

class C { private p: number; }
const nameP = "p";
const { [nameP]: p } = new C();
const { p: p2 } = new C();


//// [destructureComputedProperty.js]
var nameN = "n";
var _a = nameN, n = ab[_a];
var C = /** @class */ (function () {
    function C() {
    }
    return C;
}());
var nameP = "p";
var _b = nameP, p = new C()[_b];
var p2 = new C().p;

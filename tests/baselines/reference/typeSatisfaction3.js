//// [tests/cases/conformance/expressions/typeSatisfaction/typeSatisfaction3.ts] ////

//// [typeSatisfaction3.ts]
type T1 = {
    p: string;
}

class C1 {
    p: number;
} satisfies T1;

class C2 {
    p: string;
} satisfies T1;


//// [typeSatisfaction3.js]
var C1 = /** @class */ (function () {
    function C1() {
    }
    return C1;
}());
;
var C2 = /** @class */ (function () {
    function C2() {
    }
    return C2;
}());
;

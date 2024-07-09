//// [tests/cases/conformance/expressions/newOperator/newOperatorErrorCases.ts] ////

//// [newOperatorErrorCases.ts]
class C0 {

}
class C1 {
    constructor(n: number, s: string) { }
}

class T<T> {
    constructor(n?: T) { }
}

var anyCtor: {
    new (): any;
};

var anyCtor1: {
    new (n): any;
};

interface nestedCtor {
    new (): nestedCtor;
}
var nestedCtor: nestedCtor;

// Construct expression with no parentheses for construct signature with > 0 parameters
var b = new C0 32, ''; // Parse error

// Generic construct expression with no parentheses
var c1 = new T;
var c1: T<{}>;
var c2 = new T<string>;  // Ok


// Construct expression of non-void returning function
function fnNumber(): number { return 32; }
var s = new fnNumber(); // Error


//// [newOperatorErrorCases.js]
var C0 = /** @class */ (function () {
    function C0() {
    }
    return C0;
}());
var C1 = /** @class */ (function () {
    function C1(n, s) {
    }
    return C1;
}());
var T = /** @class */ (function () {
    function T(n) {
    }
    return T;
}());
var anyCtor;
var anyCtor1;
var nestedCtor;
// Construct expression with no parentheses for construct signature with > 0 parameters
var b = new C0;
32, ''; // Parse error
// Generic construct expression with no parentheses
var c1 = new T;
var c1;
var c2 = new T; // Ok
// Construct expression of non-void returning function
function fnNumber() { return 32; }
var s = new fnNumber(); // Error

//// [assignmentCompatForSignaturesWithTypePredicates01.ts]

class A {
    private a;
}

class B extends A {
    private b;
}

function isA(x: any): x is A {
    return x instanceof A;
}

function isB(x: any): x is B {
    return x instanceof B;
}

let myIsA = isA;
let myIsB = isB;

myIsA = myIsB;
myIsB = myIsA;

//// [assignmentCompatForSignaturesWithTypePredicates01.js]
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var A = (function () {
    function A() {
    }
    return A;
})();
var B = (function (_super) {
    __extends(B, _super);
    function B() {
        _super.apply(this, arguments);
    }
    return B;
})(A);
function isA(x) {
    return x instanceof A;
}
function isB(x) {
    return x instanceof B;
}
var myIsA = isA;
var myIsB = isB;
myIsA = myIsB;
myIsB = myIsA;


//// [assignmentCompatForSignaturesWithTypePredicates01.d.ts]
declare class A {
    private a;
}
declare class B extends A {
    private b;
}
declare function isA(x: any): x is A;
declare function isB(x: any): x is B;
declare let myIsA: typeof isA;
declare let myIsB: typeof isB;

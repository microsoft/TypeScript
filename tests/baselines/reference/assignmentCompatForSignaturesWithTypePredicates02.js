//// [assignmentCompatForSignaturesWithTypePredicates02.ts]

class A {
    private a;
}

function isA(x: any): x is A {
    return x instanceof A;
}

function isAny(x: any): x is any {
    return x instanceof B;
}

let myIsA = isA;
let myIsAny = isAny;

myIsA = myIsAny;
myIsAny = myIsA;

//// [assignmentCompatForSignaturesWithTypePredicates02.js]
var A = (function () {
    function A() {
    }
    return A;
})();
function isA(x) {
    return x instanceof A;
}
function isAny(x) {
    return x instanceof B;
}
var myIsA = isA;
var myIsAny = isAny;
myIsA = myIsAny;
myIsAny = myIsA;


//// [assignmentCompatForSignaturesWithTypePredicates02.d.ts]
declare class A {
    private a;
}
declare function isA(x: any): x is A;
declare function isAny(x: any): x is any;
declare let myIsA: typeof isA;
declare let myIsAny: typeof isAny;

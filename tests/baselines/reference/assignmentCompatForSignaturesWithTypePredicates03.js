//// [assignmentCompatForSignaturesWithTypePredicates03.ts]

interface A {
    a?;
}

interface B {
}

function isA(x: any): x is A {
    return !!(<A>x).a;
}

function isB(x: any): x is B {
    return !!isA(x);
}

let myIsA = isA;
let myIsAny = isB;

myIsA = myIsAny;
myIsAny = myIsA;

//// [assignmentCompatForSignaturesWithTypePredicates03.js]
function isA(x) {
    return !!x.a;
}
function isB(x) {
    return !!isA(x);
}
var myIsA = isA;
var myIsAny = isB;
myIsA = myIsAny;
myIsAny = myIsA;


//// [assignmentCompatForSignaturesWithTypePredicates03.d.ts]
interface A {
    a?: any;
}
interface B {
}
declare function isA(x: any): x is A;
declare function isB(x: any): x is B;
declare let myIsA: typeof isA;
declare let myIsAny: typeof isB;

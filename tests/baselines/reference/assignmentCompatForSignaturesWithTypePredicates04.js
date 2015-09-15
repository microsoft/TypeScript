//// [assignmentCompatForSignaturesWithTypePredicates04.ts]

enum E {
    A = 1,
    B = 2,
    C = 3,
}

function isA(x: any): x is number {
    return typeof x === "number";
}

function isB(x: any): x is E {
    switch (x) {
        case E.A:
        case E.B:
        case E.C:
            return true;
    }
    return false;
}

let myIsA = isA;
let myIsB = isB;

myIsA = myIsB;
myIsB = myIsA;

//// [assignmentCompatForSignaturesWithTypePredicates04.js]
var E;
(function (E) {
    E[E["A"] = 1] = "A";
    E[E["B"] = 2] = "B";
    E[E["C"] = 3] = "C";
})(E || (E = {}));
function isA(x) {
    return typeof x === "number";
}
function isB(x) {
    switch (x) {
        case E.A:
        case E.B:
        case E.C:
            return true;
    }
    return false;
}
var myIsA = isA;
var myIsB = isB;
myIsA = myIsB;
myIsB = myIsA;


//// [assignmentCompatForSignaturesWithTypePredicates04.d.ts]
declare enum E {
    A = 1,
    B = 2,
    C = 3,
}
declare function isA(x: any): x is number;
declare function isB(x: any): x is E;
declare let myIsA: typeof isA;
declare let myIsB: typeof isB;

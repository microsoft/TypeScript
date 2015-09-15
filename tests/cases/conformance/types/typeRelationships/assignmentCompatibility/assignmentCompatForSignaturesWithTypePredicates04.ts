// @declaration: true

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
//// [stringLiteralConstsReturnedFromFunction01.ts]

namespace E {
    export const A = "A";
    export const B = "B";
    export const C = "C";
}

function f1() {
    return E.A;
}

function f2(b1: boolean, b2: boolean) {
    if (b1) {
        return b2 ? E.A : E.B;
    }
    
    return b2 ? E.C : E.B;
}

function f3(b1: boolean, b2: boolean) {
    if (b1) {
        const result1 = b2 ? E.A : E.B;
        return result1;
    }
    
    const result2 = b2 ? E.C : E.B;
    return result2;
}


//// [stringLiteralConstsReturnedFromFunction01.js]
var E;
(function (E) {
    E.A = "A";
    E.B = "B";
    E.C = "C";
})(E || (E = {}));
function f1() {
    return E.A;
}
function f2(b1, b2) {
    if (b1) {
        return b2 ? E.A : E.B;
    }
    return b2 ? E.C : E.B;
}
function f3(b1, b2) {
    if (b1) {
        var result1 = b2 ? E.A : E.B;
        return result1;
    }
    var result2 = b2 ? E.C : E.B;
    return result2;
}


//// [stringLiteralConstsReturnedFromFunction01.d.ts]
declare namespace E {
    const A: "A";
    const B: "B";
    const C: "C";
}
declare function f1(): "A";
declare function f2(b1: boolean, b2: boolean): string;
declare function f3(b1: boolean, b2: boolean): string;

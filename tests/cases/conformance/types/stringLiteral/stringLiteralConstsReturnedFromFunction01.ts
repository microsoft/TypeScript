// @declaration: true
// @noImplicitAny: true

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

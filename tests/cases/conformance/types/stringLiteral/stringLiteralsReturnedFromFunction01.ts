// @declaration: true
// @noImplicitAny: true

function f1() {
    return "A";
}

function f2(b1: boolean, b2: boolean) {
    if (b1) {
        return b2 ? "A" : "B";
    }
    
    return b2 ? "C" : "B";
}

function f3(b1: boolean, b2: boolean) {
    if (b1) {
        const result1 = b2 ? "A" : "B";
        return result1;
    }
    
    const result2 = b2 ? "A" : "B";
    return result2;
}

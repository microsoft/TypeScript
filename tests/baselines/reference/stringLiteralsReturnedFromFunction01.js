//// [stringLiteralsReturnedFromFunction01.ts]

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
    
    const result2 = b2 ? "C" : "B";
    return result2;
}


//// [stringLiteralsReturnedFromFunction01.js]
function f1() {
    return "A";
}
function f2(b1, b2) {
    if (b1) {
        return b2 ? "A" : "B";
    }
    return b2 ? "C" : "B";
}
function f3(b1, b2) {
    if (b1) {
        var result1 = b2 ? "A" : "B";
        return result1;
    }
    var result2 = b2 ? "C" : "B";
    return result2;
}


//// [stringLiteralsReturnedFromFunction01.d.ts]
declare function f1(): string;
declare function f2(b1: boolean, b2: boolean): string;
declare function f3(b1: boolean, b2: boolean): string;

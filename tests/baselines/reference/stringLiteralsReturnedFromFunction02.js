//// [stringLiteralsReturnedFromFunction02.ts]

function f1() {
    return "A";
}

function f2(b1: boolean, b2: boolean) {
    if (b1) {
        return b2 ? "A" : "B";
    }
    
    return b2 ? "B" : "A";
}

function f3(b1: boolean, b2: boolean) {
    if (b1) {
        const result1 = b2 ? "A" : "B";
        return result1;
    }
    
    const result2 = b2 ? "B" : "A";
    return result2;
}


//// [stringLiteralsReturnedFromFunction02.js]
function f1() {
    return "A";
}
function f2(b1, b2) {
    if (b1) {
        return b2 ? "A" : "B";
    }
    return b2 ? "B" : "A";
}
function f3(b1, b2) {
    if (b1) {
        var result1 = b2 ? "A" : "B";
        return result1;
    }
    var result2 = b2 ? "B" : "A";
    return result2;
}


//// [stringLiteralsReturnedFromFunction02.d.ts]
declare function f1(): string;
declare function f2(b1: boolean, b2: boolean): string;
declare function f3(b1: boolean, b2: boolean): "A" | "B";

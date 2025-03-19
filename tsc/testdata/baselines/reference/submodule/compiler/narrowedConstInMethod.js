//// [tests/cases/compiler/narrowedConstInMethod.ts] ////

//// [narrowedConstInMethod.ts]
// Fixes #10501, possibly null 'x'
function f() {
    const x: string | null = <any>{};
    if (x !== null) {
        return {
            bar() { return x.length; }  // ok
        };
    }
}

function f2() {
    const x: string | null = <any>{};
    if (x !== null) {
        return class {
            bar() { return x.length; }  // ok
        };
    }
}


//// [narrowedConstInMethod.js]
// Fixes #10501, possibly null 'x'
function f() {
    const x = {};
    if (x !== null) {
        return {
            bar() { return x.length; } // ok
        };
    }
}
function f2() {
    const x = {};
    if (x !== null) {
        return class {
            bar() { return x.length; } // ok
        };
    }
}

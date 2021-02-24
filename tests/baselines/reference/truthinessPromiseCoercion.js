//// [truthinessPromiseCoercion.ts]
declare const p: Promise<number>
declare const p2: null | Promise<number>

async function f() {
    if (p) {} // err
    if (!!p) {} // no err
    if (p2) {} // no err

    p ? f.arguments : f.arguments;
    !!p ? f.arguments : f.arguments;
    p2 ? f.arguments : f.arguments;
}


//// [truthinessPromiseCoercion.js]
async function f() {
    if (p) { } // err
    if (!!p) { } // no err
    if (p2) { } // no err
    p ? f.arguments : f.arguments;
    !!p ? f.arguments : f.arguments;
    p2 ? f.arguments : f.arguments;
}

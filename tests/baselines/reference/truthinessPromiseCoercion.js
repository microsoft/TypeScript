//// [truthinessPromiseCoercion.ts]
declare const p: Promise<number>
declare const p2: null | Promise<number>
declare const obj: { p: Promise<unknown> }

async function f() {
    if (p) {} // err
    if (!!p) {} // no err
    if (p2) {} // no err

    p ? f.arguments : f.arguments;
    !!p ? f.arguments : f.arguments;
    p2 ? f.arguments : f.arguments;
}

// all ok
async function g() {
    if (p) {
        p;
    }
    if (p && p.then.length) {}
    if (p) {
        if (p) {
            if (p) {
                !!await (((((((p)))))));
            }
        }
    }
}

async function h() {
    if (obj.p) {} // error
    if (obj.p) {  // ok
        await obj.p;
    }
    if (obj.p && await obj.p) {} // ok
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
// all ok
async function g() {
    if (p) {
        p;
    }
    if (p && p.then.length) { }
    if (p) {
        if (p) {
            if (p) {
                !!await (((((((p)))))));
            }
        }
    }
}
async function h() {
    if (obj.p) { } // error
    if (obj.p) { // ok
        await obj.p;
    }
    if (obj.p && await obj.p) { } // ok
}

//// [tests/cases/conformance/controlFlow/controlFlowCommaOperator.ts] ////

//// [controlFlowCommaOperator.ts]
function f(x: string | number | boolean) {
    let y: string | number | boolean = false;
    let z: string | number | boolean = false;
    if (y = "", typeof x === "string") {
        x; // string
        y; // string
        z; // boolean
    }
    else if (z = 1, typeof x === "number") {
        x; // number
        y; // string
        z; // number
    }
    else {
        x; // boolean
        y; // string
        z; // number
    }
    x; // string | number | boolean
    y; // string
    z; // number | boolean
}


//// [controlFlowCommaOperator.js]
function f(x) {
    let y = false;
    let z = false;
    if (y = "", typeof x === "string") {
        x;
        y;
        z;
    }
    else if (z = 1, typeof x === "number") {
        x;
        y;
        z;
    }
    else {
        x;
        y;
        z;
    }
    x;
    y;
    z;
}

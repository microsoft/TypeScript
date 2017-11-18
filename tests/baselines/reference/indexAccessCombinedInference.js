//// [indexAccessCombinedInference.ts]
interface Args {
    TA: object,
    TY: object
}

function foo<T extends Args>(
    a: T["TA"],
    b: T["TY"]): T["TA"] & T["TY"] {
    return undefined!;
}

const x = foo({
    x: {
        j: 12,
        i: 11
    }
}, { y: 42 });

//// [indexAccessCombinedInference.js]
function foo(a, b) {
    return undefined;
}
var x = foo({
    x: {
        j: 12,
        i: 11
    }
}, { y: 42 });

//// [tests/cases/conformance/dynamicImport/importCallExpressionErrorInES2015.ts] ////

//// [0.ts]
export function foo() { return "foo"; }

//// [1.ts]
import("./0");
var p1 = import("./0");
p1.then(zero => {
    return zero.foo();
})

function foo() {
    const p2 = import("./0");
}

//// [0.js]
export function foo() { return "foo"; }
//// [1.js]
import("./0");
var p1 = import("./0");
p1.then(zero => {
    return zero.foo();
});
function foo() {
    const p2 = import("./0");
}

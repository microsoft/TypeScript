//// [tests/cases/conformance/dynamicImport/importCallExpression1ES2020.ts] ////

//// [0.ts]
export function foo() { return "foo"; }

//// [1.ts]
import("./0");
var p1 = import("./0");
p1.then(zero => {
    return zero.foo();
})

export var p2 = import("./0");

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
export var p2 = import("./0");
function foo() {
    const p2 = import("./0");
}

//// [tests/cases/compiler/destructuringAssignmentWithDefault.ts] ////

//// [destructuringAssignmentWithDefault.ts]
const a: { x?: number } = { };
let x = 0;
({x = 1} = a);

// Repro from #26235

function f1(options?: { color?: string, width?: number }) {
    let { color, width } = options || {};
    ({ color, width } = options || {});
    let x1 = (options || {}).color;
    let x2 = (options || {})["color"];
}

function f2(options?: [string?, number?]) {
    let [str, num] = options || [];
    [str, num] = options || [];
    let x1 = (options || {})[0];
}

function f3(options?: { color: string, width: number }) {
    let { color, width } = options || {};
    ({ color, width } = options || {});
    let x1 = (options || {}).color;
    let x2 = (options || {})["color"];
}

function f4(options?: [string, number]) {
    let [str, num] = options || [];
    [str, num] = options || [];
    let x1 = (options || {})[0];
}


//// [destructuringAssignmentWithDefault.js]
const a = {};
let x = 0;
({ x = 1 } = a);
// Repro from #26235
function f1(options) {
    let { color, width } = options || {};
    ({ color, width } = options || {});
    let x1 = (options || {}).color;
    let x2 = (options || {})["color"];
}
function f2(options) {
    let [str, num] = options || [];
    [str, num] = options || [];
    let x1 = (options || {})[0];
}
function f3(options) {
    let { color, width } = options || {};
    ({ color, width } = options || {});
    let x1 = (options || {}).color;
    let x2 = (options || {})["color"];
}
function f4(options) {
    let [str, num] = options || [];
    [str, num] = options || [];
    let x1 = (options || {})[0];
}

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
var _a;
var a = {};
var x = 0;
(_a = a.x, x = _a === void 0 ? 1 : _a);
// Repro from #26235
function f1(options) {
    var _a;
    var _b = options || {}, color = _b.color, width = _b.width;
    (_a = options || {}, color = _a.color, width = _a.width);
    var x1 = (options || {}).color;
    var x2 = (options || {})["color"];
}
function f2(options) {
    var _a;
    var _b = options || [], str = _b[0], num = _b[1];
    _a = options || [], str = _a[0], num = _a[1];
    var x1 = (options || {})[0];
}
function f3(options) {
    var _a;
    var _b = options || {}, color = _b.color, width = _b.width;
    (_a = options || {}, color = _a.color, width = _a.width);
    var x1 = (options || {}).color;
    var x2 = (options || {})["color"];
}
function f4(options) {
    var _a;
    var _b = options || [], str = _b[0], num = _b[1];
    _a = options || [], str = _a[0], num = _a[1];
    var x1 = (options || {})[0];
}

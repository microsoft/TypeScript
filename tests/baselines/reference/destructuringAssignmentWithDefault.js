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
    var _b;
    var _c = options || {}, color = _c.color, width = _c.width;
    (_b = options || {}, color = _b.color, width = _b.width);
    var x1 = (options || {}).color;
    var x2 = (options || {})["color"];
}
function f2(options) {
    var _d;
    var _e = options || [], str = _e[0], num = _e[1];
    _d = options || [], str = _d[0], num = _d[1];
    var x1 = (options || {})[0];
}
function f3(options) {
    var _f;
    var _g = options || {}, color = _g.color, width = _g.width;
    (_f = options || {}, color = _f.color, width = _f.width);
    var x1 = (options || {}).color;
    var x2 = (options || {})["color"];
}
function f4(options) {
    var _h;
    var _j = options || [], str = _j[0], num = _j[1];
    _h = options || [], str = _h[0], num = _h[1];
    var x1 = (options || {})[0];
}

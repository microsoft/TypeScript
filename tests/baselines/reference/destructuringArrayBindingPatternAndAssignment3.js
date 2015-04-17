//// [destructuringArrayBindingPatternAndAssignment3.ts]
interface H {
    0: number,
    1: string
}
interface J extends Array<Number> {
    2: number;
}

function bar(): J {
    return <[number, number, number]>[1, 2, 3];
}

function gg(idx: number) {
    return {
        [idx]: true
    }
}

var [h, g, i]: H = [];
var [[[y]], [[[[z]]]]] = []
var [, , ...w4, , ] = []
var [a = "string", b, c] = bar();
var [r, s, t] = gg(1);

//// [destructuringArrayBindingPatternAndAssignment3.js]
function bar() {
    return [1, 2, 3];
}
function gg(idx) {
    return (_a = {},
        _a[idx] = true,
        _a
    );
    var _a;
}
var _a = [], h = _a[0], g = _a[1], i = _a[2];
var _b = [], y = _b[0][0][0], z = _b[1][0][0][0][0];
var _c = [];
var _d = bar(), _e = _d[0], a = _e === void 0 ? "string" : _e, b = _d[1], c = _d[2];
var _f = gg(1), r = _f[0], s = _f[1], t = _f[2];

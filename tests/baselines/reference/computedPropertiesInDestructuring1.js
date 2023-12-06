//// [tests/cases/compiler/computedPropertiesInDestructuring1.ts] ////

//// [computedPropertiesInDestructuring1.ts]
// destructuring in variable declarations
let foo = "bar";
let {[foo]: bar} = {bar: "bar"};

let {["bar"]: bar2} = {bar: "bar"};

let foo2 = () => "bar";
let {[foo2()]: bar3} = {bar: "bar"};

let [{[foo]: bar4}] = [{bar: "bar"}];
let [{[foo2()]: bar5}] = [{bar: "bar"}];

function f1({["bar"]: x}: { bar: number }) {}
function f2({[foo]: x}: { bar: number }) {}
function f3({[foo2()]: x}: { bar: number }) {}
function f4([{[foo]: x}]: [{ bar: number }]) {}
function f5([{[foo2()]: x}]: [{ bar: number }]) {}

// report errors on type errors in computed properties used in destructuring
let [{[foo()]: bar6}] = [{bar: "bar"}];
let [{[foo.toExponential()]: bar7}] = [{bar: "bar"}];

// destructuring assignment
({[foo]: bar} = {bar: "bar"});

({["bar"]: bar2} = {bar: "bar"});

({[foo2()]: bar3} = {bar: "bar"});

[{[foo]: bar4}] = [{bar: "bar"}];
[{[foo2()]: bar5}] = [{bar: "bar"}];

[{[foo()]: bar4}] = [{bar: "bar"}];
[{[(1 + {})]: bar4}] = [{bar: "bar"}];




//// [computedPropertiesInDestructuring1.js]
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
// destructuring in variable declarations
var foo = "bar";
var _o = { bar: "bar" }, _p = foo, bar = _o[_p];
var bar2 = { bar: "bar" }["bar"];
var foo2 = function () { return "bar"; };
var _q = { bar: "bar" }, _r = foo2(), bar3 = _q[_r];
var _s = [{ bar: "bar" }], _t = foo, bar4 = _s[0][_t];
var _u = [{ bar: "bar" }], _v = foo2(), bar5 = _u[0][_v];
function f1(_a) {
    var x = _a["bar"];
}
function f2(_a) {
    var _b = foo, x = _a[_b];
}
function f3(_a) {
    var _b = foo2(), x = _a[_b];
}
function f4(_a) {
    var _b = foo, x = _a[0][_b];
}
function f5(_a) {
    var _b = foo2(), x = _a[0][_b];
}
// report errors on type errors in computed properties used in destructuring
var _w = [{ bar: "bar" }], _x = foo(), bar6 = _w[0][_x];
var _y = [{ bar: "bar" }], _z = foo.toExponential(), bar7 = _y[0][_z];
// destructuring assignment
(_a = { bar: "bar" }, _b = foo, bar = _a[_b]);
(bar2 = { bar: "bar" }["bar"]);
(_c = { bar: "bar" }, _d = foo2(), bar3 = _c[_d]);
_e = [{ bar: "bar" }], _f = foo, bar4 = _e[0][_f];
_g = [{ bar: "bar" }], _h = foo2(), bar5 = _g[0][_h];
_j = [{ bar: "bar" }], _k = foo(), bar4 = _j[0][_k];
_l = [{ bar: "bar" }], _m = (1 + {}), bar4 = _l[0][_m];

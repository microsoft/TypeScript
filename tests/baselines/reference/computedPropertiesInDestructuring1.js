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
// destructuring in variable declarations
var foo = "bar";
var _a = foo, bar = { bar: "bar" }[_a];
var _b = "bar", bar2 = { bar: "bar" }[_b];
var foo2 = function () { return "bar"; };
var _c = foo2(), bar3 = { bar: "bar" }[_c];
var _d = foo, bar4 = [{ bar: "bar" }][0][_d];
var _e = foo2(), bar5 = [{ bar: "bar" }][0][_e];
function f1(_a) {
    var _b = "bar", x = _a[_b];
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
var _f = foo(), bar6 = [{ bar: "bar" }][0][_f];
var _g = foo.toExponential(), bar7 = [{ bar: "bar" }][0][_g];
// destructuring assignment
(_h = { bar: "bar" }, _j = foo, bar = _h[_j], _h);
(_k = { bar: "bar" }, _l = "bar", bar2 = _k[_l], _k);
(_m = { bar: "bar" }, _o = foo2(), bar3 = _m[_o], _m);
_p = foo, bar4 = [{ bar: "bar" }][0][_p];
_q = foo2(), bar5 = [{ bar: "bar" }][0][_q];
_r = foo(), bar4 = [{ bar: "bar" }][0][_r];
_s = (1 + {}), bar4 = [{ bar: "bar" }][0][_s];
var _h, _j, _k, _l, _m, _o, _p, _q, _r, _s;

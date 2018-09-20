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
var _a, _b, _c, _d, _e, _f;
// destructuring in variable declarations
var foo = "bar";
var _g = foo, bar = { bar: "bar" }[_g];
var bar2 = { bar: "bar" }["bar"];
var foo2 = function () { return "bar"; };
var _h = foo2(), bar3 = { bar: "bar" }[_h];
var _j = foo, bar4 = [{ bar: "bar" }][0][_j];
var _k = foo2(), bar5 = [{ bar: "bar" }][0][_k];
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
var _l = foo(), bar6 = [{ bar: "bar" }][0][_l];
var _m = foo.toExponential(), bar7 = [{ bar: "bar" }][0][_m];
// destructuring assignment
(_a = foo, bar = { bar: "bar" }[_a]);
(bar2 = { bar: "bar" }["bar"]);
(_b = foo2(), bar3 = { bar: "bar" }[_b]);
_c = foo, bar4 = [{ bar: "bar" }][0][_c];
_d = foo2(), bar5 = [{ bar: "bar" }][0][_d];
_e = foo(), bar4 = [{ bar: "bar" }][0][_e];
_f = (1 + {}), bar4 = [{ bar: "bar" }][0][_f];

//// [tests/cases/compiler/unusedParametersWithUnderscore.ts] ////

//// [unusedParametersWithUnderscore.ts]
function f(a, _b, c, ___, d,e___, _f) {
}


function f2({_a, __b}) {
}

function f3([_a, ,__b]) {
}

function f4(...arg) {
}

function f5(..._arg) {
}

function f6(arg?, _arg?) {
}

var f7 = _ => undefined;

var f8 = function (_) { };

//// [unusedParametersWithUnderscore.js]
function f(a, _b, c, ___, d, e___, _f) {
}
function f2({ _a, __b }) {
}
function f3([_a, , __b]) {
}
function f4(...arg) {
}
function f5(..._arg) {
}
function f6(arg, _arg) {
}
var f7 = _ => undefined;
var f8 = function (_) { };

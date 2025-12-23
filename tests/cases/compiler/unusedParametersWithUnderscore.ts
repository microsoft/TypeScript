//@noUnusedLocals:true
//@noUnusedParameters:true

function f(a, _b, c, ___, d,e___, _f) {
}

// ok because of underscore prefix
function f2({_a, __b}) {
}

// error
function f2b({ a, b }) {
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
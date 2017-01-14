//@noUnusedLocals:true
//@noUnusedParameters:true

function f(a, b, c) {
    return b;
}

function f2({a, b, c}) {
    return b;
}

function f3([a, ,b, c]) {
    return b;
}

function f4(a, b, ...arg) {
    return b;
}

function f5(a, b, ...arg) {
    return arg;
}

function f6(a?, b?, c?) {
    return b;
}

var f7 = (a, b, c) => b;

var f8 = function (a, b, c) {
    return b;
};
//// [partiallyNamedTuples.ts]
type NamedAndAnonymous = [a: string, number];

function fa1(...args: NamedAndAnonymous) {}
function fa2(a: NamedAndAnonymous, ...args: NamedAndAnonymous) {}

type NamedAnonymousMixed = [a: string, number, c: number, NamedAndAnonymous];

function fb1(...args: NamedAnonymousMixed) {}
function fb2(a: NamedAnonymousMixed, ...args: NamedAnonymousMixed) {}
function fb3(a: NamedAnonymousMixed, ...args: NamedAnonymousMixed[3]) {}


//// [partiallyNamedTuples.js]
function fa1() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
}
function fa2(a) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
}
function fb1() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
}
function fb2(a) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
}
function fb3(a) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
}

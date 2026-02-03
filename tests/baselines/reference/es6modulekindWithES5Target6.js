//// [tests/cases/conformance/externalModules/es6/es6modulekindWithES5Target6.ts] ////

//// [es6modulekindWithES5Target6.ts]
export function f1(d = 0) {
}

export function f2(...arg) {
}

export default function f3(d = 0) {
}


//// [es6modulekindWithES5Target6.js]
export function f1(d) {
    if (d === void 0) { d = 0; }
}
export function f2() {
    var arg = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        arg[_i] = arguments[_i];
    }
}
export default function f3(d) {
    if (d === void 0) { d = 0; }
}

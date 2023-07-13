//// [tests/cases/conformance/functions/functionParameterObjectRestAndInitializers.ts] ////

//// [functionParameterObjectRestAndInitializers.ts]
// https://github.com/microsoft/TypeScript/issues/47079

function f({a, ...x}, b = a) {
    return b;
}

function g({a, ...x}, b = ({a}, b = a) => {}) {
    return b;
}


//// [functionParameterObjectRestAndInitializers.js]
// https://github.com/microsoft/TypeScript/issues/47079
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
function f(_a, b) {
    var { a } = _a, x = __rest(_a, ["a"]);
    if (b === void 0) { b = a; }
    return b;
}
function g(_a, b) {
    var { a } = _a, x = __rest(_a, ["a"]);
    if (b === void 0) { b = ({ a }, b = a) => { }; }
    return b;
}

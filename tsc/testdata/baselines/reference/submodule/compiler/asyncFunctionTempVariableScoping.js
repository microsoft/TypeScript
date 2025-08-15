//// [tests/cases/compiler/asyncFunctionTempVariableScoping.ts] ////

//// [asyncFunctionTempVariableScoping.ts]
// https://github.com/Microsoft/TypeScript/issues/19187

async ({ foo, bar, ...rest }) => bar(await foo);

//// [asyncFunctionTempVariableScoping.js]
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
// https://github.com/Microsoft/TypeScript/issues/19187
async (_a) => {
    var { foo, bar } = _a, rest = __rest(_a, ["foo", "bar"]);
    return bar(await foo);
};

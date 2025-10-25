//// [tests/cases/conformance/classes/classExpressions/classWithStaticFieldInParameterInitializer.ts] ////

//// [classWithStaticFieldInParameterInitializer.ts]
// https://github.com/microsoft/TypeScript/issues/36295
((b = class { static x = 1 }) => {})();

//// [classWithStaticFieldInParameterInitializer.js]
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
// https://github.com/microsoft/TypeScript/issues/36295
((b) => { var _a; if (b === void 0) { b = (_a = class {
    },
    __setFunctionName(_a, "b"),
    _a.x = 1,
    _a); } })();

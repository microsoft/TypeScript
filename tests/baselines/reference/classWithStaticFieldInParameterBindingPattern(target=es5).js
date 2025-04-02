//// [tests/cases/conformance/classes/classExpressions/classWithStaticFieldInParameterBindingPattern.ts] ////

//// [classWithStaticFieldInParameterBindingPattern.ts]
// https://github.com/microsoft/TypeScript/issues/36295
(({ [class { static x = 1 }.x]: b = "" }) => {})();

//// [classWithStaticFieldInParameterBindingPattern.js]
// https://github.com/microsoft/TypeScript/issues/36295
(function (_a) {
    var _b;
    var _c = (_b = /** @class */ (function () {
            function class_1() {
            }
            return class_1;
        }()),
        _b.x = 1,
        _b).x, _d = _a[_c], b = _d === void 0 ? "" : _d;
})();

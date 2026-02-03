//// [tests/cases/conformance/classes/classExpressions/classWithStaticFieldInParameterBindingPattern.ts] ////

//// [classWithStaticFieldInParameterBindingPattern.ts]
// https://github.com/microsoft/TypeScript/issues/36295
(({ [class { static x = 1 }.x]: b = "" }) => {})();

//// [classWithStaticFieldInParameterBindingPattern.js]
// https://github.com/microsoft/TypeScript/issues/36295
(({ [(_a = class {
    },
    _a.x = 1,
    _a).x]: b = "" }) => { var _a; })();

//// [classWithStaticFieldInParameterBindingPattern.ts]
// https://github.com/microsoft/TypeScript/issues/36295
(({ [class { static x = 1 }.x]: b = "" }) => {})();

//// [classWithStaticFieldInParameterBindingPattern.js]
// https://github.com/microsoft/TypeScript/issues/36295
((_a) => { var _b; var { [(_b = class {
    },
    _b.x = 1,
    _b).x]: b = "" } = _a; })();

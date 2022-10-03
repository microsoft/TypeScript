//// [classWithStaticFieldInParameterInitializer.ts]
// https://github.com/microsoft/TypeScript/issues/36295
((b = class { static x = 1 }) => {})();

//// [classWithStaticFieldInParameterInitializer.js]
// https://github.com/microsoft/TypeScript/issues/36295
((b) => { var _a; if (b === void 0) { b = (_a = class {
    },
    _a.x = 1,
    _a); } })();

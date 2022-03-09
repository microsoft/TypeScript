//// [classWithStaticFieldInParameterInitializer.ts]
// https://github.com/microsoft/TypeScript/issues/36295
((b = class { static x = 1 }) => {})();

//// [classWithStaticFieldInParameterInitializer.js]
// https://github.com/microsoft/TypeScript/issues/36295
((b = class {
    static x = 1;
}) => { })();

//// [tests/cases/conformance/classes/classExpressions/classWithStaticFieldInParameterInitializer.ts] ////

//// [classWithStaticFieldInParameterInitializer.ts]
// https://github.com/microsoft/TypeScript/issues/36295
((b = class { static x = 1 }) => {})();

//// [classWithStaticFieldInParameterInitializer.js]
"use strict";
// https://github.com/microsoft/TypeScript/issues/36295
((b = class {
    static x = 1;
}) => { })();

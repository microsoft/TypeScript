//// [tests/cases/compiler/blockScopedBindingCaptureThisInFunction.ts] ////

//// [blockScopedBindingCaptureThisInFunction.ts]
// https://github.com/Microsoft/TypeScript/issues/11038
() => function () {
    for (let someKey in {}) {
        this.helloWorld();
        () => someKey;
    }
};

//// [blockScopedBindingCaptureThisInFunction.js]
"use strict";
// https://github.com/Microsoft/TypeScript/issues/11038
() => function () {
    for (let someKey in {}) {
        this.helloWorld();
        () => someKey;
    }
};

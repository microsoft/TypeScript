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
() => function () {
    for (let someKey in {}) {
        this.helloWorld();
        () => someKey;
    }
};

//// [tests/cases/conformance/types/tuple/wideningTuples2.ts] ////

//// [wideningTuples2.ts]
var foo: () => [any] = function bar() {
    let intermediate = bar();
    intermediate = [""];
    return [undefined];
};

//// [wideningTuples2.js]
var foo = function bar() {
    var intermediate = bar();
    intermediate = [""];
    return [undefined];
};

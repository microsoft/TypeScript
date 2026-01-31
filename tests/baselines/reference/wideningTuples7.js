//// [tests/cases/conformance/types/tuple/wideningTuples7.ts] ////

//// [wideningTuples7.ts]
var foo = function bar() {
    let intermediate: [string];
    return intermediate = [undefined];
};

//// [wideningTuples7.js]
var foo = function bar() {
    let intermediate;
    return intermediate = [undefined];
};

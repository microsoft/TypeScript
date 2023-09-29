//// [tests/cases/conformance/throwExpression/throwExpression3.ts] ////

//// [throwExpression3.ts]
function t1(foo: number) {
    const a = foo === 1 ? 1 : throw new Error("Unexpected value");
}

function t2(foo: number) {
    const a = foo === 1 ? throw new Error("Unexpected value") : 1;
}

function t3(foo: number | undefined) {
    const a = foo ?? throw new Error("Unexpected value");
}


//// [throwExpression3.js]
function t1(foo) {
    var a = foo === 1 ? 1 : (function () {
        throw new Error("Unexpected value");
    })();
}
function t2(foo) {
    var a = foo === 1 ? (function () {
        throw new Error("Unexpected value");
    })() : 1;
}
function t3(foo) {
    var a = foo !== null && foo !== void 0 ? foo : (function () {
        throw new Error("Unexpected value");
    })();
}

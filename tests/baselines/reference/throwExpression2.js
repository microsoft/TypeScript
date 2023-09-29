//// [tests/cases/conformance/throwExpression/throwExpression2.ts] ////

//// [throwExpression2.ts]
function t1(value: number | undefined) {
    const a = value || throw new Error("Unexpected value");
}

function t2(value: number | undefined) {
    const a = value && throw new Error("Unexpected value");
}


//// [throwExpression2.js]
function t1(value) {
    var a = value || (function () {
        throw new Error("Unexpected value");
    })();
}
function t2(value) {
    var a = value && (function () {
        throw new Error("Unexpected value");
    })();
}

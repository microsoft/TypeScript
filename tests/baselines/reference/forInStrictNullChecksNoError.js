//// [tests/cases/compiler/forInStrictNullChecksNoError.ts] ////

//// [forInStrictNullChecksNoError.ts]
function f(x: { [key: string]: number; } | null | undefined) {
    for (const key in x) {  // 1
        console.log(x[key]);  // 2
    }
    x["no"]; // should still error
}

//// [forInStrictNullChecksNoError.js]
function f(x) {
    for (var key in x) { // 1
        console.log(x[key]); // 2
    }
    x["no"]; // should still error
}

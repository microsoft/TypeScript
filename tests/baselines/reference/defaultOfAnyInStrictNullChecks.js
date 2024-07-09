//// [tests/cases/compiler/defaultOfAnyInStrictNullChecks.ts] ////

//// [defaultOfAnyInStrictNullChecks.ts]
// Regression test for #8295

function foo() {
    try {
    }
    catch (e) {
        let s = e.message; 
    }
}


//// [defaultOfAnyInStrictNullChecks.js]
// Regression test for #8295
function foo() {
    try {
    }
    catch (e) {
        var s = e.message;
    }
}

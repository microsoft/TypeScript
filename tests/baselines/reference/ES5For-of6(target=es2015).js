//// [tests/cases/conformance/statements/for-ofStatements/ES5For-of6.ts] ////

//// [ES5For-of6.ts]
for (var w of []) {
    for (var v of []) {
        var x = [w, v];
    }
}

//// [ES5For-of6.js]
"use strict";
for (var w of []) {
    for (var v of []) {
        var x = [w, v];
    }
}

//// [tests/cases/conformance/es6/for-ofStatements/for-of53.ts] ////

//// [for-of53.ts]
for (let v of []) {
    var v;
}

//// [for-of53.js]
"use strict";
for (let v of []) {
    var v;
}

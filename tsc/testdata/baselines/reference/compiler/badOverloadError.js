//// [tests/cases/compiler/badOverloadError.ts] ////

//// [badOverloadError.ts]
function method() {
    var dictionary = <{ [index: string]: string; }>{};
}


//// [badOverloadError.js]
"use strict";
function method() {
    var dictionary = {};
}

//// [tests/cases/compiler/badOverloadError.ts] ////

//// [badOverloadError.ts]
function method() {
    var dictionary = <{ [index: string]: string; }>{};
}


//// [badOverloadError.js]
function method() {
    var dictionary = {};
}

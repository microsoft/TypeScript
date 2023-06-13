//// [tests/cases/compiler/commentOnBlock1.ts] ////

//// [commentOnBlock1.ts]
// asdf
function f() {
 /*asdf*/{}
}

//// [commentOnBlock1.js]
// asdf
function f() {
    /*asdf*/ { }
}

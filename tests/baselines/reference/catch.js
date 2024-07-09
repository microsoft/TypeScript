//// [tests/cases/compiler/catch.ts] ////

//// [catch.ts]
function f() {
    try {} catch(e) { }
    try {} catch(e) { }
}


//// [catch.js]
function f() {
    try { }
    catch (e) { }
    try { }
    catch (e) { }
}

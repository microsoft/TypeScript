//// [tests/cases/compiler/breakTarget7.ts] ////

//// [breakTarget7.ts]
function functionContainingBreak() {
    break target;
    target:;
}


//// [breakTarget7.js]
function functionContainingBreak() {
    break target;
    target: ;
}

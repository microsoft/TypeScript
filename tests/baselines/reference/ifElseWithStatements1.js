//// [tests/cases/compiler/ifElseWithStatements1.ts] ////

//// [ifElseWithStatements1.ts]
if (true)
    f();
else
    f();

function foo(): boolean {
    if (true)
        return true;
    else
        return false;
}


//// [ifElseWithStatements1.js]
"use strict";
if (true)
    f();
else
    f();
function foo() {
    if (true)
        return true;
    else
        return false;
}

//// [tests/cases/compiler/issue30408.ts] ////

//// [issue30408.ts]
function foo() {
    for (let i = 0; i < 10; i++) {
        console.log(`${i}`);
        continue loopend;
    }

    loopend:
    console.log('end of loop');
}

function bar() {
    continue loopend;
}


//// [issue30408.js]
"use strict";
function foo() {
    for (let i = 0; i < 10; i++) {
        console.log(`${i}`);
        continue loopend;
    }
    loopend: console.log('end of loop');
}
function bar() {
    continue loopend;
}

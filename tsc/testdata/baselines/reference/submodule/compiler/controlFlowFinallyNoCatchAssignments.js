//// [tests/cases/compiler/controlFlowFinallyNoCatchAssignments.ts] ////

//// [controlFlowFinallyNoCatchAssignments.ts]
let x: number;
x = Math.random();
let a: number;
try {
    if (x) {
        a = 1;
    } else {
        a = 2;
    }
} finally {
    console.log(x);
}

console.log(a); // <- error here

//// [controlFlowFinallyNoCatchAssignments.js]
"use strict";
let x;
x = Math.random();
let a;
try {
    if (x) {
        a = 1;
    }
    else {
        a = 2;
    }
}
finally {
    console.log(x);
}
console.log(a); // <- error here

//// [tests/cases/compiler/panicForInEmptyDeclarationList.ts] ////

//// [panicForInEmptyDeclarationList.ts]
let x: string[] = [];
let i = 0;

function f() {
  for (let in) {
    let y = x[i];
    return y;
  }
}


//// [panicForInEmptyDeclarationList.js]
"use strict";
let x = [];
let i = 0;
function f() {
    for (let  in ) {
        let y = x[i];
        return y;
    }
}

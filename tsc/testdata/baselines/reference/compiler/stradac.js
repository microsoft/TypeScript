//// [tests/cases/compiler/stradac.ts] ////

//// [stradac.ts]
var x = 10;

// C++-style comment

/*
    C-Style comment
    */
    
    
function foo() {
    x++;
}

//// [stradac.js]
"use strict";
var x = 10;
// C++-style comment
/*
    C-Style comment
    */
function foo() {
    x++;
}

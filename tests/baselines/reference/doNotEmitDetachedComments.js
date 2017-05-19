//// [doNotEmitDetachedComments.ts]
/*

    multi line
    comment
*/

var x = 10;

// Single Line comment

function foo() { }


/*
    multi-line comment

*/


//========================


function bar() { }


//========================


//// [doNotEmitDetachedComments.js]
var x = 10;
function foo() { }
function bar() { }

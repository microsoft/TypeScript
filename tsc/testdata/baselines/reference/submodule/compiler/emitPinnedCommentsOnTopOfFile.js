//// [tests/cases/compiler/emitPinnedCommentsOnTopOfFile.ts] ////

//// [emitPinnedCommentsOnTopOfFile.ts]
/*!

    multi line
    comment
*/

var x = 10;

//// [emitPinnedCommentsOnTopOfFile.js]
"use strict";
/*!

    multi line
    comment
*/
var x = 10;

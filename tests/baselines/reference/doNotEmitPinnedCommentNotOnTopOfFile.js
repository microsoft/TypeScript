//// [doNotEmitPinnedCommentNotOnTopOfFile.ts]
var x = 10;

/*!

    multi line
    comment
*/

var x = 10;

//// [doNotEmitPinnedCommentNotOnTopOfFile.js]
var x = 10;
var x = 10;

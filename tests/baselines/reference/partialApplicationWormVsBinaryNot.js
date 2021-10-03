//// [partialApplicationWormVsBinaryNot.ts]
// Verify that binary NOT still works all right for ~(*).

const enum EnumWithNOT {
    Notted = 5 & ~(1 | 4 | 2),
};

var m = 5 & ~(1 | 4);
var a = ~(1 | 4);
var b = ~(1);


//// [partialApplicationWormVsBinaryNot.js]
// Verify that binary NOT still works all right for ~(*).
;
var m = 5 & ~(1 | 4);
var a = ~(1 | 4);
var b = ~(1);

//// [letAsIdentifier.ts]

var let = 10;
var a = 10;
let = 30;
let
a;

//// [letAsIdentifier.js]
var let = 10;
var a = 10;
let = 30;
let;
a;


//// [letAsIdentifier.d.ts]
declare var let: number;
declare var a: number;

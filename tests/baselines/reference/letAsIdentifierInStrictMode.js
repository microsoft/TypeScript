//// [letAsIdentifierInStrictMode.ts]
"use strict";
var let = 10;
var a = 10;
let = 30;
let
a;

//// [letAsIdentifierInStrictMode.js]
"use strict";
var ;
var ;
10;
var a = 10;
var ;
30;
var a;

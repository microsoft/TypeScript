//// [tests/cases/compiler/parserUnparsedTokenCrash1.ts] ////

//// [a.js]
( y = 1 ; 2 )


//// [a.js]
"use strict";
(y = 1);
2;

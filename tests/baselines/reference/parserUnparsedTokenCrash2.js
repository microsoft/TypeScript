//// [tests/cases/compiler/parserUnparsedTokenCrash2.ts] ////

//// [parserUnparsedTokenCrash2.ts]
export = } x = ( y = z ==== 'function') {


//// [parserUnparsedTokenCrash2.js]
"use strict";
x = (y = z === ) = 'function';
{
}
module.exports = ;

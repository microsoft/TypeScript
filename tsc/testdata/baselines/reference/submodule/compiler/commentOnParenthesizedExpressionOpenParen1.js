//// [tests/cases/compiler/commentOnParenthesizedExpressionOpenParen1.ts] ////

//// [commentOnParenthesizedExpressionOpenParen1.ts]
var j;
var f: () => any;
<any>( /* Preserve */ j = f());


//// [commentOnParenthesizedExpressionOpenParen1.js]
"use strict";
var j;
var f;
( /* Preserve */j = f());

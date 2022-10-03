//// [commentOnParenthesizedExpressionOpenParen1.ts]
var j;
var f: () => any;
<any>( /* Preserve */ j = f());


//// [commentOnParenthesizedExpressionOpenParen1.js]
var j;
var f;
( /* Preserve */j = f());

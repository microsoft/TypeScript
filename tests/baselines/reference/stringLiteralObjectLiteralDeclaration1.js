//// [tests/cases/compiler/stringLiteralObjectLiteralDeclaration1.ts] ////

//// [stringLiteralObjectLiteralDeclaration1.ts]
module m1 {
  export var n = { 'foo bar': 4 };
}


//// [stringLiteralObjectLiteralDeclaration1.js]
var m1;
(function (m1) {
    m1.n = { 'foo bar': 4 };
})(m1 || (m1 = {}));


//// [stringLiteralObjectLiteralDeclaration1.d.ts]
declare namespace m1 {
    var n: {
        'foo bar': number;
    };
}

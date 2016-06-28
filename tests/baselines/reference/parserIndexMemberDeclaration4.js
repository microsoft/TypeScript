//// [parserIndexMemberDeclaration4.ts]
class C {
   [a: string]: number; public v: number
}

//// [parserIndexMemberDeclaration4.js]
var C = (function () {
    function C() {
    }
    return C;
}());

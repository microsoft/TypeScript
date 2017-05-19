//// [parserIndexMemberDeclaration1.ts]
class C {
   [a: string]: number
}

//// [parserIndexMemberDeclaration1.js]
var C = (function () {
    function C() {
    }
    return C;
}());

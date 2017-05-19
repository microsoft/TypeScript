//// [parserIndexMemberDeclaration7.ts]
class C {
   public [x: string]: string;
}

//// [parserIndexMemberDeclaration7.js]
var C = (function () {
    function C() {
    }
    return C;
}());

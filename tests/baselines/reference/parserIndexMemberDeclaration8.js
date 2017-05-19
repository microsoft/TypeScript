//// [parserIndexMemberDeclaration8.ts]
class C {
   private [x: string]: string;
}

//// [parserIndexMemberDeclaration8.js]
var C = (function () {
    function C() {
    }
    return C;
}());

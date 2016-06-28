//// [parserIndexMemberDeclaration5.ts]
class C {
   [a: string]: number public v: number
}

//// [parserIndexMemberDeclaration5.js]
var C = (function () {
    function C() {
    }
    return C;
}());

//// [parserIndexMemberDeclaration10.ts]
class C {
   static static [x: string]: string;
}

//// [parserIndexMemberDeclaration10.js]
var C = (function () {
    function C() {
    }
    return C;
}());

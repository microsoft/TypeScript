//// [parserIndexMemberDeclaration8.ts]
class C {
   private [x: string]: string;
}

//// [parserIndexMemberDeclaration8.js]
var C = /** @class */ (function () {
    function C() {
    }
    return C;
}());

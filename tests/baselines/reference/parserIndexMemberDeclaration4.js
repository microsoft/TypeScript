//// [parserIndexMemberDeclaration4.ts]
class C {
   [a: string]: number; public v: number
}

//// [parserIndexMemberDeclaration4.js]
var C = /** @class */ (function () {
    function C() {
    }
    return C;
}());

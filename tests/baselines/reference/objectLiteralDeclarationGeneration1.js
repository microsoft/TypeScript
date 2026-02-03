//// [tests/cases/compiler/objectLiteralDeclarationGeneration1.ts] ////

//// [objectLiteralDeclarationGeneration1.ts]
class y<T extends {}>{ }

//// [objectLiteralDeclarationGeneration1.js]
var y = /** @class */ (function () {
    function y() {
    }
    return y;
}());


//// [objectLiteralDeclarationGeneration1.d.ts]
declare class y<T extends {}> {
}

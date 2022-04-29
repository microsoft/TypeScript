//// [optionalParamterAndVariableDeclaration2.ts]
class C {
    constructor(options?: number) {
        var options = (options || 0);
    }
}


//// [optionalParamterAndVariableDeclaration2.js]
var C = /** @class */ (function () {
    function C(options) {
        var options = (options || 0);
    }
    return C;
}());

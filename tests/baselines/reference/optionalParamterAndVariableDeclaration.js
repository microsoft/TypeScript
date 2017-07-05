//// [optionalParamterAndVariableDeclaration.ts]
class C {
    constructor(options?: number) {
        var options = (options || 0);
    }
}


//// [optionalParamterAndVariableDeclaration.js]
var C = (function () {
    function C(options) {
        var options = (options || 0);
    }
    return C;
}());

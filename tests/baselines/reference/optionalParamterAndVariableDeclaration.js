//// [tests/cases/compiler/optionalParamterAndVariableDeclaration.ts] ////

//// [optionalParamterAndVariableDeclaration.ts]
class C {
    constructor(options?: number) {
        var options = (options || 0);
    }
}


//// [optionalParamterAndVariableDeclaration.js]
class C {
    constructor(options) {
        var options = (options || 0);
    }
}

//// [tests/cases/compiler/optionalParamterAndVariableDeclaration2.ts] ////

//// [optionalParamterAndVariableDeclaration2.ts]
class C {
    constructor(options?: number) {
        var options = (options || 0);
    }
}


//// [optionalParamterAndVariableDeclaration2.js]
class C {
    constructor(options) {
        var options = (options || 0);
    }
}

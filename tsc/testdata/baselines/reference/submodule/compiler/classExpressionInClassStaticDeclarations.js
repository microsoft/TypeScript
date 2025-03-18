//// [tests/cases/compiler/classExpressionInClassStaticDeclarations.ts] ////

//// [classExpressionInClassStaticDeclarations.ts]
class C {
    static D = class extends C {};
}

//// [classExpressionInClassStaticDeclarations.js]
class C {
    static D = class extends C {
    };
}

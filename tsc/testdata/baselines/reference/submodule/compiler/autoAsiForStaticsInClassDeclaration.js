//// [tests/cases/compiler/autoAsiForStaticsInClassDeclaration.ts] ////

//// [autoAsiForStaticsInClassDeclaration.ts]
class C {
    static x
    static y
} 

//// [autoAsiForStaticsInClassDeclaration.js]
class C {
    static x;
    static y;
}

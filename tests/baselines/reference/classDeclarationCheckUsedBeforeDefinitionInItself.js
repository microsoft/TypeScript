//// [tests/cases/compiler/classDeclarationCheckUsedBeforeDefinitionInItself.ts] ////

//// [classDeclarationCheckUsedBeforeDefinitionInItself.ts]
class C3 { 
    static intance = new C3();  // ok
}

//// [classDeclarationCheckUsedBeforeDefinitionInItself.js]
class C3 {
}
C3.intance = new C3(); // ok

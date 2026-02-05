//// [tests/cases/compiler/classDeclarationCheckUsedBeforeDefinitionInItself.ts] ////

//// [classDeclarationCheckUsedBeforeDefinitionInItself.ts]
class C3 { 
    static intance = new C3();  // ok
}

//// [classDeclarationCheckUsedBeforeDefinitionInItself.js]
"use strict";
class C3 {
    static intance = new C3(); // ok
}

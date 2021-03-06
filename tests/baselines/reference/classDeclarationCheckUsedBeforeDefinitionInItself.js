//// [classDeclarationCheckUsedBeforeDefinitionInItself.ts]
class C3 { 
    static intance = new C3();  // ok
}

//// [classDeclarationCheckUsedBeforeDefinitionInItself.js]
class C3 {
}
(function () {
    C3.intance = new C3(); // ok
}).call(C3);

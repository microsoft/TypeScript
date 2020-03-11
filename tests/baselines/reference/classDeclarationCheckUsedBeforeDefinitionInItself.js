//// [classDeclarationCheckUsedBeforeDefinitionInItself.ts]
class C3 { 
    static intance = new C3();  // ok
}

//// [classDeclarationCheckUsedBeforeDefinitionInItself.js]
let C3 = /** @class */ (() => {
    class C3 {
    }
    C3.intance = new C3(); // ok
    return C3;
})();

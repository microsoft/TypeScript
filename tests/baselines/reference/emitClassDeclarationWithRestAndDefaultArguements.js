//// [emitClassDeclarationWithRestAndDefaultArguements.ts]
class B {
    constructor(y = 10, ...p) { }
    foo(a = "hi") { }
    bar(b = 10, ...p) { }
    far(...p)
    far(a: any) { } 
}

//// [emitClassDeclarationWithRestAndDefaultArguements.js]
class B {
    constructor(y = 10, ...p) {
    }
    foo(a = "hi") {
    }
    bar(b = 10, ...p) {
    }
    far(a) {
    }
}

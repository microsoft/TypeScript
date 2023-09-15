//// [tests/cases/conformance/esDecorators/classDeclaration/methods/esDecorators-classDeclaration-methods-staticPrivate.ts] ////

//// [esDecorators-classDeclaration-methods-staticPrivate.ts]
declare let dec: any;

class C {
    @dec static #method1() {}
}

@dec
class D {
    static #method1() {}
}


//// [esDecorators-classDeclaration-methods-staticPrivate.js]
class C {
    @dec
    static #method1() { }
}
@dec
class D {
    static #method1() { }
}

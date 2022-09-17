//// [esDecorators-classDeclaration-methods-staticPrivate.ts]
declare let dec: any;

class C {
    @dec static #method1() {}
}

// TODO: We should translate static private to weakmaps when < ESNext
@dec
class D {
    static #method1() {}
}


//// [esDecorators-classDeclaration-methods-staticPrivate.js]
class C {
    @dec
    static #method1() { }
}
// TODO: We should translate static private to weakmaps when < ESNext
@dec
class D {
    static #method1() { }
}

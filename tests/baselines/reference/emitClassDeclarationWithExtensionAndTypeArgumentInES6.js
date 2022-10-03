//// [emitClassDeclarationWithExtensionAndTypeArgumentInES6.ts]
class B<T> {
    constructor(a: T) { }
}
class C extends B<string> { }
class D extends B<number> {
    constructor(a: any)
    constructor(b: number) {
        super(b);
    }
}

//// [emitClassDeclarationWithExtensionAndTypeArgumentInES6.js]
class B {
    constructor(a) { }
}
class C extends B {
}
class D extends B {
    constructor(b) {
        super(b);
    }
}

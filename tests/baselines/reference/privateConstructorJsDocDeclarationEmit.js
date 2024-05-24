//// [tests/cases/conformance/salsa/privateConstructorJsDocDeclarationEmit.ts] ////

//// [privateConstructorJsDocDeclarationEmit.js]
class Foo {
    /**
     * @private
     */
    constructor() { }
}

class Bar {
    constructor() { }
}

class Baz extends Bar {
    /**
     * @private
     */
    constructor() {
        super()
    }
}




//// [privateConstructorJsDocDeclarationEmit.d.ts]
declare class Foo {
    /**
     * @private
     */
    private constructor();
}
declare class Bar {
}
declare class Baz extends Bar {
    /**
     * @private
     */
    private constructor();
}

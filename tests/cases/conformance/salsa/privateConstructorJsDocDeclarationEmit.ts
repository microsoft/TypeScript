// @allowjs: true
// @checkjs: true
// @declaration: true
// @emitDeclarationOnly: true
// @outDir: lib
// @filename: privateConstructorJsDocDeclarationEmit.js

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

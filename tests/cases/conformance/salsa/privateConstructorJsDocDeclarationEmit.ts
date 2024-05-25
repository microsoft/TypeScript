// @allowjs: true
// @checkjs: true
// @declaration: true
// @emitDeclarationOnly: true
// @outDir: lib
// @filename: privateConstructorJsDocDeclarationEmit.js

// https://github.com/microsoft/TypeScript/issues/58653

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

// https://github.com/microsoft/TypeScript/pull/58655#issuecomment-2130552519

class C {
  /**
   * @private
   * @overload
   * @param x {string}
   * @param y {string}
   */

  /**
   * @private
   * @overload
   * @param x {number}
   * @param y {number}
   */

  /**
   * @private
   * @param {...any} args
   */
  constructor(...args) {}
}
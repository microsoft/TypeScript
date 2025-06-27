//// [tests/cases/conformance/salsa/privateConstructorJsDocDeclarationEmit.ts] ////

//// [privateConstructorJsDocDeclarationEmit.js]
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
declare class C {
    /**
     * @private
     * @overload
     * @param x {string}
     * @param y {string}
     */
    constructor(x: string, y: string);
    /**
     * @private
     * @overload
     * @param x {number}
     * @param y {number}
     */
    constructor(x: number, y: number);
}

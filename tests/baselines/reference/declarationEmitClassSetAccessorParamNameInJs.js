//// [tests/cases/compiler/declarationEmitClassSetAccessorParamNameInJs.ts] ////

//// [foo.js]
// https://github.com/microsoft/TypeScript/issues/55391

export class Foo {
    /**
     * Bar.
     *
     * @param {string} baz Baz.
     */
    set bar(baz) {}
}




//// [foo.d.ts]
export class Foo {
    /**
     * Bar.
     *
     * @param {string} baz Baz.
     */
    set bar(baz: string);
}

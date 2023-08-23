//// [tests/cases/compiler/declarationEmitClassSetAccessorParamNameInJs3.ts] ////

//// [foo.js]
export class Foo {
    /**
     * Bar.
     *
     * @param {{ prop: string | undefined }} baz Baz.
     */
    set bar({ prop = 'foo' }) {}
}




//// [foo.d.ts]
export class Foo {
    /**
     * Bar.
     *
     * @param {{ prop: string | undefined }} baz Baz.
     */
    set bar({ prop }: {
        prop: string | undefined;
    });
}

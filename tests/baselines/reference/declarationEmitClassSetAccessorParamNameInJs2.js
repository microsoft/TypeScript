//// [tests/cases/compiler/declarationEmitClassSetAccessorParamNameInJs2.ts] ////

//// [foo.js]
export class Foo {
    /**
     * Bar.
     *
     * @param {{ prop: string }} baz Baz.
     */
    set bar({}) {}
}




//// [foo.d.ts]
export class Foo {
    /**
     * Bar.
     *
     * @param {{ prop: string }} baz Baz.
     */
    set bar({}: {
        prop: string;
    });
}

//// [tests/cases/compiler/jsDeclarationEmitPrivateStaticMethod.ts] ////

//// [a.js]
export class C {
    /** @private */
    static foo() {}
    /** @protected */
    static bar() {}
}




//// [a.d.ts]
export declare class C {
    /** @private */
    private static foo;
    /** @protected */
    protected static bar(): void;
}

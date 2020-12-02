//// [privateConstructorFunction.js]
{
    // make sure not to crash when parent's a block rather than a source file or some other
    // symbol-having node.

    /** @private */
    function C() {
        this.x = 1
    }
    new C()
}


//// [privateConstructorFunction.js]
{
    // make sure not to crash when parent's a block rather than a source file or some other
    // symbol-having node.
    /** @private */
    function C() {
        this.x = 1;
    }
    new C();
}


//// [privateConstructorFunction.d.ts]
/** @private */
declare function C(): void;
declare class C {
    x: number;
}

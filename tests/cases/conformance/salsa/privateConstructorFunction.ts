// @allowjs: true
// @checkjs: true
// @outdir: salsa
// @declaration: true
// @filename: privateConstructorFunction.js
{
    // make sure not to crash when parent's a block rather than a source file or some other
    // symbol-having node.

    /** @private */
    function C() {
        this.x = 1
    }
    new C()
}

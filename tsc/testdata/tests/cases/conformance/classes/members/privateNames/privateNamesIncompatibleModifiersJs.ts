// @allowJs: true
// @checkJs: true
// @strict: true
// @target: es6
// @outDir: ./out
// @filename: privateNamesIncompatibleModifiersJs.js

class A {
    /**
     * @public
     */
    #a = 1;

    /**
     * @private
     */
    #b = 1;

    /**
     * @protected
     */
    #c = 1;

    /**
     * @public
     */
    #aMethod() { return 1; }

    /**
     * @private
     */
    #bMethod() { return 1; }

    /**
     * @protected
     */
    #cMethod() { return 1; }

    /**
     * @public
     */
    get #aProp() { return 1; }
    /**
     * @public
     */
    set #aProp(value) { }

    /**
     * @private
     */
    get #bProp() { return 1; }
    /**
     * @private
     */
    set #bProp(value) { }

    /**
    * @protected
    */
    get #cProp() { return 1; }
    /**
     * @protected
     */
    set #cProp(value) { }
}

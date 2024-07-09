// @allowJs: true
// @checkJs: true
// @target: esnext
// @noEmit: true
// @Filename: jsdocAccessibilityTag.js

class A {
    /**
     * Ap docs
     *
     * @private
     */
    priv = 4;
    /**
     * Aq docs
     *
     * @protected
     */
    prot = 5;
    /**
     * Ar docs
     *
     * @public
     */
    pub = 6;
    /** @public */
    get ack() { return this.priv }
    /** @private */
    set ack(value) { }
}
class C {
    constructor() {
        /**
         * Cp docs
         *
         * @private
         */
        this.priv2 = 1;
        /**
         * Cq docs
         *
         * @protected
         */
        this.prot2 = 2;
        /**
         * Cr docs
         *
         * @public
         */
        this.pub2 = 3;
    }
    h() { return this.priv2 }
}
class B extends A {
    m() {
        this.priv + this.prot + this.pub
    }
}
class D extends C {
    n() {
        this.priv2 + this.prot2 + this.pub2
    }
}
new A().priv + new A().prot + new A().pub
new B().priv + new B().prot + new B().pub
new C().priv2 + new C().prot2 + new C().pub2
new D().priv2 + new D().prot2 + new D().pub2

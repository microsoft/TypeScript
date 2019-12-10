// @allowJs: true
// @checkJs: true
// @out: foo.js
// @declaration: true
// @Filename: privateTag.js

class A {
    /**
     * Ap docs
     *
     * @private
     */
    p;
    /**
     * Aq docs
     *
     * @protected
     */
    q;
    /**
     * Ar docs
     *
     * @public
     */
    r;
}
class C {
    constructor() {
        /**
         * Cp docs
         *
         * @private
         */
        this.p = 1;
        /**
         * Cq docs
         *
         * @protected
         */
        this.q = 2;
        /**
         * Cr docs
         *
         * @public
         */
        this.r = 3;
    }
}
class B extends A {
    m() {
        this.p + this.q + this.r
    }
}
class D extends C {
    n() {
        this.p + this.q + this.r
    }
}
new A().p + new A().q + new A().r
new B().p + new B().q + new B().r
new C().p + new C().q + new C().r
new D().p + new D().q + new D().r

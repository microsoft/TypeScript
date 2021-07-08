// @allowJS: true
// @checkJS: true
// @noEmit: true
// @noImplicitOverride: true
// @Filename: 0.js

class A {

    /**
     * @method
     * @param {string | number} a
     * @returns {boolean}
     */
    foo (a) {
        return typeof a === 'string'
    }
    bar () {

    }
}

class B extends A {
    /**
     * @override
     * @method
     * @param {string | number} a
     * @returns {boolean}
     */
    foo (a) {
        return super.foo(a)
    }

    bar () {

    }

    /** @override */
    baz () {

    }
}


class C {
    /** @override */
    foo () {

    }
}
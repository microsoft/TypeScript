//// [tests/cases/conformance/jsdoc/extendsTag3.ts] ////

//// [foo.js]
/**
 * @constructor
 */
class A {
    constructor() {}
}

/**
 * @extends {A}
 * @constructor
 */
class B extends A {
    constructor() {
        super();
    }
}

/**
 * @extends { A }
 * @constructor
 */
class C extends A {
    constructor() {
        super();
    }
}


//// [foo.js]
/**
 * @constructor
 */
class A {
    constructor() { }
}
/**
 * @extends {A}
 * @constructor
 */
class B extends A {
    constructor() {
        super();
    }
}
/**
 * @extends { A }
 * @constructor
 */
class C extends A {
    constructor() {
        super();
    }
}

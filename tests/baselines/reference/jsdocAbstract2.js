//// [jsdocAbstract2.js]
/** @abstract */
class A {
    /**
     * @abstract
     * @returns {number}
     */
    foo() {}
}

// ok
class B extends A {
    foo() {
        return 1;
    }
}

// error
class C extends A {}

// ok
/** @abstract */
class D extends A {}


//// [jsdocAbstract2.js]
/** @abstract */
class A {
    /**
     * @abstract
     * @returns {number}
     */
    foo() { }
}
// ok
class B extends A {
    foo() {
        return 1;
    }
}
// error
class C extends A {
}
// ok
/** @abstract */
class D extends A {
}


//// [jsdocAbstract2.d.ts]
/** @abstract */
declare abstract class A {
    /**
     * @abstract
     * @returns {number}
     */
    abstract foo(): number;
}
declare class B extends A {
    foo(): number;
}
declare class C extends A {
}
/** @abstract */
declare abstract class D extends A {
}

//// [tests/cases/conformance/jsdoc/extendsTag7.ts] ////

//// [a.js]
/** @template T */
class A {
    /** @returns {T} */
    get value() {
        throw new Error();
    }

    /** @returns {typeof A} */
    static extend() {
        return this;
    }
}

/** @extends {A<string>} */
class B extends A.extend() {}

const value = new B().value;


//// [a.js]
"use strict";
/** @template T */
class A {
    /** @returns {T} */
    get value() {
        throw new Error();
    }
    /** @returns {typeof A} */
    static extend() {
        return this;
    }
}
/** @extends {A<string>} */
class B extends A.extend() {
}
const value = new B().value;


//// [a.d.ts]
/** @template T */
declare class A<T> {
    /** @returns {T} */
    get value(): T;
    /** @returns {typeof A} */
    static extend(): typeof A;
}
declare const B_base: typeof A;
/** @extends {A<string>} */
declare class B extends B_base<string> {
}
declare const value: string;

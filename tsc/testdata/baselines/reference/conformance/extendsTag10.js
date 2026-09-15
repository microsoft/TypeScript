//// [tests/cases/conformance/jsdoc/extendsTag10.ts] ////

//// [a.js]
/** @template T */
class A {
    /** @returns {T} */
    get value() {
        throw new Error();
    }
}

/** @param {any} Base */
function mixin(Base) {
    return class extends Base {
        extra = 1;
    };
}

/** @extends {A<string>} */
class B extends mixin(A) {}

const value = new B().value;
const extra = new B().extra;


//// [a.js]
"use strict";
/** @template T */
class A {
    /** @returns {T} */
    get value() {
        throw new Error();
    }
}
/** @param {any} Base */
function mixin(Base) {
    return class extends Base {
        constructor() {
            super(...arguments);
            this.extra = 1;
        }
    };
}
/** @extends {A<string>} */
class B extends mixin(A) {
}
const value = new B().value;
const extra = new B().extra;


//// [a.d.ts]
/** @template T */
declare class A<T> {
    /** @returns {T} */
    get value(): T;
}
/** @param {any} Base */
declare function mixin(Base: any): {
    new (): {
        [x: string]: any;
        extra: number;
    };
    [x: string]: any;
};
declare const B_base: {
    new (): {
        [x: string]: any;
        extra: number;
    };
    [x: string]: any;
};
/** @extends {A<string>} */
declare class B extends B_base {
}
declare const value: any;
declare const extra: number;

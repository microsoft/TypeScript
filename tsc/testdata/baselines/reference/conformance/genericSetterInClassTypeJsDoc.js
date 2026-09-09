//// [tests/cases/conformance/classes/members/classTypes/genericSetterInClassTypeJsDoc.ts] ////

//// [genericSetterInClassTypeJsDoc.js]
/**
 * @template T
 */
 class Box {
    #value;

    /** @param {T} initialValue */
    constructor(initialValue) {
        this.#value = initialValue;
    }
    
    /** @type {T} */
    get value() {
        return this.#value;
    }

    set value(value) {
        this.#value = value;
    }
}

new Box(3).value = 3;


//// [genericSetterInClassTypeJsDoc.js]
"use strict";
/**
 * @template T
 */
class Box {
    #value;
    /** @param {T} initialValue */
    constructor(initialValue) {
        this.#value = initialValue;
    }
    /** @type {T} */
    get value() {
        return this.#value;
    }
    set value(value) {
        this.#value = value;
    }
}
new Box(3).value = 3;


//// [genericSetterInClassTypeJsDoc.d.ts]
/**
 * @template T
 */
declare class Box<T> {
    #private;
    /** @param {T} initialValue */
    constructor(initialValue: T);
    /** @type {T} */
    get value(): T;
    set value(value: T);
}

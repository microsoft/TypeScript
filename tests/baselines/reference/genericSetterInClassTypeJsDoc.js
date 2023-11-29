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


//// [genericSetterInClassTypeJsDoc-out.js]
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


//// [genericSetterInClassTypeJsDoc-out.d.ts]
/**
 * @template T
 */
declare class Box<T> {
    /** @param {T} initialValue */
    constructor(initialValue: T);
    set value(value: T);
    /** @type {T} */
    get value(): T;
    #private;
}

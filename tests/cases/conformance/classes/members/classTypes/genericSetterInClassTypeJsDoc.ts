// @target: esnext
// @lib: esnext
// @declaration: true
// @allowJs: true
// @checkJs: true
// @filename: genericSetterInClassTypeJsDoc.js
// @out: genericSetterInClassTypeJsDoc-out.js

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

// @strict: true
// @target: esnext
// @lib: esnext
// @declaration: true
// @outDir: dist
// @checkJs: true
// @allowJs: true

// @filename: index.js

// https://github.com/microsoft/TypeScript/issues/60590

export const kBar = Symbol("bar");

export class foo0 {
    /**
     * @protected
     * @type {null | string}
     */
    [kBar] = null;

    get bar() {
        return this[kBar];
    }
    /**
     * @type {string}
     */
    set bar(value) {
        this[kBar] = value;
    }
}

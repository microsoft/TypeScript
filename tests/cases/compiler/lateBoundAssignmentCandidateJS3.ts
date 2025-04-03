// @strict: true
// @target: esnext
// @lib: esnext
// @declaration: true
// @outDir: dist
// @checkJs: true
// @allowJs: true

// @filename: index.js

const prop = 'prop';

export class foo2 {
    constructor() {
        this[prop] = 12;
    }

    /**
     * @protected
     * @type {string}
     */
    prop = 'baz';
}

// @strict: true
// @target: esnext
// @lib: esnext
// @declaration: true
// @outDir: dist
// @checkJs: true
// @allowJs: true

// @filename: index.js

const prop = 'prop';

export class foo1 {
    constructor() {
        this[prop] = 'bar'
    }

    /**
     * @protected
     * @type {string}
     */
    [prop] = 'baz';
}

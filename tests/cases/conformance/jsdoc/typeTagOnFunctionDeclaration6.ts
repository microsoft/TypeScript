// @strict: true
// @checkJs: true
// @declaration: true
// @outDir: dist

// @filename: index.js

/** @type {{(this: { name: string }, arg: boolean): void}} */
function fn1(arg) {
    this
}

/** @type {{(this: { name: string }, arg: boolean): void; bar: string}} */
function fn2(arg) {
    this
}

fn2.bar = ''

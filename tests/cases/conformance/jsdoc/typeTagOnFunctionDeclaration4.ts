// @strict: true
// @checkJs: true
// @declaration: true
// @outDir: dist

// @filename: index.js

/** @type {{(arg1: string): void;}} */
function Named1(arg) {
	this.x = 1;
};
Named1.foo = 10;

/** @type {{(arg1: string): void; foo: number;}} */
function Named2(arg) {
	this.x = 1;
};
Named2.foo = 10;

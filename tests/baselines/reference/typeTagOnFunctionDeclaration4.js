//// [tests/cases/conformance/jsdoc/typeTagOnFunctionDeclaration4.ts] ////

//// [index.js]
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


//// [index.js]
"use strict";
/** @type {{(arg1: string): void;}} */
function Named1(arg) {
    this.x = 1;
}
;
Named1.foo = 10;
/** @type {{(arg1: string): void; foo: number;}} */
function Named2(arg) {
    this.x = 1;
}
;
Named2.foo = 10;


//// [index.d.ts]
declare function Named1(arg1: string): void;
declare class Named1 {
    x: number;
}
declare namespace Named1 {
    let foo: number;
}
declare function Named2(arg1: string): void;
declare class Named2 {
    x: number;
}
declare namespace Named2 {
    let foo_1: number;
    export { foo_1 as foo };
}

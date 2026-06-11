//// [tests/cases/compiler/cjsExportsDuplication.ts] ////

//// [file.js]
exports.foo = 42
exports.foo = "hello"
exports.foo = true

//// [file2.js]
exports.foo = 42
/** @type {string} */
exports.foo = "hello"
/** @type {boolean} */
exports.foo = true



//// [file.d.ts]
export declare var foo: "hello" | 42 | true;
//// [file2.d.ts]
export declare var foo: string;

// @module: esnext
// @target: esnext
// @lib: esnext,dom

// @filename: a.d.wasm.ts
export {};

// @filename: b.ts
/*comment a*/ import /*comment b*/ source /*comment c*/ a /*comment d*/ from /*comment e*/ "./a.wasm" /*comment f*/ with /*comment g*/ { type: "webassembly" } /*comment h*/;
const b = a;
const c = import /*comment i*/ . /*comment j*/ source /*comment k*/ ("./a.wasm");

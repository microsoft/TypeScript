//// [tests/cases/conformance/importSource/importSource9.ts] ////

//// [a.d.wasm.ts]
export {};

//// [b.ts]
/*comment a*/ import /*comment b*/ source /*comment c*/ a /*comment d*/ from /*comment e*/ "./a.wasm" /*comment f*/ with /*comment g*/ { type: "webassembly" } /*comment h*/;
const b = a;
const c = import /*comment i*/ . /*comment j*/ source /*comment k*/ ("./a.wasm");


//// [b.js]
/*comment a*/ import /*comment b*/ source /*comment c*/ a /*comment d*/ from /*comment e*/ "./a.wasm" /*comment f*/ with /*comment g*/ { type: "webassembly" } /*comment h*/;
const b = a;
const c = import /*comment i*/. /*comment j*/source /*comment k*/("./a.wasm");

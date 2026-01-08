//// [tests/cases/compiler/libTypeScriptSubfileResolving.ts] ////

//// [index.d.ts]
// NOOP
//// [iterable.d.ts]
interface DOMIterable { abc: string }
//// [index.ts]
/// <reference lib="dom.iterable" />
const a: DOMIterable = { abc: "Hello" }

// This should fail because libdom has been replaced
// by the module above ^
window.localStorage


//// [index.js]
/// <reference lib="dom.iterable" />
var a = { abc: "Hello" };
// This should fail because libdom has been replaced
// by the module above ^
window.localStorage;

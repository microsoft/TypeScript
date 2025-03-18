//// [tests/cases/compiler/mappedTypeAsStringTemplate.ts] ////

//// [mappedTypeAsStringTemplate.ts]
// Repro from #44220

function foo<T extends { [K in keyof T as `${Extract<K, string>}y`]: number }>(foox: T) { }

const c = { x: 1 };

foo(c);


//// [mappedTypeAsStringTemplate.js]
function foo(foox) { }
const c = { x: 1 };
foo(c);

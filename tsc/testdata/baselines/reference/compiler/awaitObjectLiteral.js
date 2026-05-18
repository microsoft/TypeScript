//// [tests/cases/compiler/awaitObjectLiteral.ts] ////

//// [fileA.ts]
export {}
const foo = await { bar: 42 }

//// [fileB.ts]
export const baz = await { x: 1, y: "hello" }


//// [fileA.js]
const foo = await { bar: 42 };
export {};
//// [fileB.js]
export const baz = await { x: 1, y: "hello" };

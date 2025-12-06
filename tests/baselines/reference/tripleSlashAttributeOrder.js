//// [tests/cases/compiler/tripleSlashAttributeOrder.ts] ////

//// [foo.d.ts]
declare const foo: number;

//// [index.ts]
/// <reference resolution-mode="import" path="./foo.d.ts" />
foo;


//// [index.js]
/// <reference resolution-mode="import" path="./foo.d.ts" />
foo;

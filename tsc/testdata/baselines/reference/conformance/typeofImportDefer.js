//// [tests/cases/conformance/importDefer/typeofImportDefer.ts] ////

//// [a.ts]
export interface Foo {
  x: number;
}

//// [b.ts]
export type X = typeof import.defer("./a").Foo;


//// [a.js]
export {};
//// [b.js]
("./a").Foo;
export {};

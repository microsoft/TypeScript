// @target: es2015
// @module: esnext

// @filename: a.ts
export interface Foo {
  x: number;
}

// @filename: b.ts
export type X = typeof import.defer("./a").Foo;

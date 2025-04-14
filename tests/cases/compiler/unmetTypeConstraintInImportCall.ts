// @noEmit: true
// @filename: file1.ts
export type Foo<T extends string> = { foo: T }

// @noEmit: true
// @filename: file2.ts
type Bar<T> = import('./file1').Foo<T>;

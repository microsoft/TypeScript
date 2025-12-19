// @Filename: /foo.d.ts
declare const foo: number;

// @Filename: /index.ts
/// <reference resolution-mode="import" path="./foo.d.ts" />
foo;

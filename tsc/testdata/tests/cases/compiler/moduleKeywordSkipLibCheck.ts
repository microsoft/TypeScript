// @strict: true
// @skipLibCheck: true

// @filename: decl.d.ts
declare module Foo {
    export function bar(): void;
}

// @filename: main.ts
Foo.bar();

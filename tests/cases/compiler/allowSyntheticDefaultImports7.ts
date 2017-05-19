// @module: system
// @Filename: b.d.ts
export function foo();

export function bar();

// @Filename: a.ts
import { default as Foo } from "./b";
Foo.bar();
Foo.foo();
// @filename: foo.d.ts
export = Foo;
export as namespace Foo;

declare namespace Foo {
    function foo();
}

// @filename: foo2.ts
let x: { a: string; c: string; } | { b: number; c: number; };
export = x

// @filename: bar.ts
import { Bar, toString, foo } from './foo';
foo();
import { a, b, c, d, toString as foo2String } from './foo2';
c;
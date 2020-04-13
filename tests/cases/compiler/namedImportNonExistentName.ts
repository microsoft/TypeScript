// @filename: foo.d.ts
export = Foo;
export as namespace Foo;

declare namespace Foo {
    function foo();
}

// @filename: bar.ts
import { Bar, toString, foo } from './foo';
foo();
// @filename: foo.d.ts
export = Foo;
export as namespace Foo;

declare namespace Foo {
    function foo();
}

declare global {
    namespace Bar { }
}

// @filename: bar.d.ts
import { Bar } from './foo';
export = Bar;
export as namespace Bar;
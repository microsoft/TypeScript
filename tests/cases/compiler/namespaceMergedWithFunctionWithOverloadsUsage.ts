// @filename: file.d.ts
declare namespace Foo {
    interface Whatever {
        prop: any;
    }
}

declare function Foo(opts?: Foo.Whatever): void;
declare function Foo(cb: Function, opts?: Foo.Whatever): void;

export = Foo;
// @filename: index.ts
import X = require("./file");

X(0); // shouldn't cause a crash
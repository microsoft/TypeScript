// @strict: true
// @target: esnext

// @filename: enum.ts
export enum Foo {
    A,
    B,
}

// @filename: test.ts
import {Foo} from './enum';

enum Bar {
    A,
    B,
}
let foo = Foo.A as const;
let bar = Bar.A as const;

// @filename: ns.ts
namespace ns {
    export enum Foo { X }
    ns.Foo.X as const;
}

// @filename: more.ts
export enum Foo { X }
(Foo).X as const;

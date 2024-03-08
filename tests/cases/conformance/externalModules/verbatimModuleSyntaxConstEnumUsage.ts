// @module: esnext
// @verbatimModuleSyntax: true

// @filename: foo.ts
export enum Foo {
    a = 1,
    b,
    c,
}

// @filename: bar.ts
import {Foo} from './foo.js';

export enum Bar {
    a = Foo.a,
    c = Foo.c,
    e = 5,
}
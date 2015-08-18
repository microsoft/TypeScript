// @module: system

// @Filename: foo.ts
export class Foo {
    a: string;
}

// @Filename: bar.ts
import {Foo} from './foo';
export class Bar extends Foo {
    b: string;
}
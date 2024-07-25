// @allowJs: true
// @checkJs: false
// @module: ES2022, commonjs
// @moduleResolution: node16
// @esModuleInterop: true
// @isolatedModules: true
// @outDir: out


// @Filename: index.js
import { Foo } from "./other.js";
import * as other from "./other.js";
import defaultFoo from "./other.js";

const x = new Foo();
const y = other.Foo();
const z = new defaultFoo();

// @Filename: other.d.ts
export interface Foo {
    bar: number;
}

export default interface Bar {
    foo: number;
}

// @Filename: other.js
export class Foo {
    bar = 2.4;
}

export default class Bar {
    foo = 1.2;
}

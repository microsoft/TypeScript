// @module: amd 

// @filename: foo.d.ts
declare module "foo" {
    export class Foo {
        constructor();
        method1(): any;
    }
}

// @filename: foo-ext.d.ts
declare module "foo" {
    export interface Foo {
        method2(): any;
    }
}

// @filename: index.ts
import * as foo from "foo";

class Test {
    bar: foo.Foo;
    constructor() {
        this.bar = new foo.Foo();
    }
}

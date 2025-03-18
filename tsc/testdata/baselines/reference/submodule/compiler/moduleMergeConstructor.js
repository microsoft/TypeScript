//// [tests/cases/compiler/moduleMergeConstructor.ts] ////

//// [foo.d.ts]
declare module "foo" {
    export class Foo {
        constructor();
        method1(): any;
    }
}

//// [foo-ext.d.ts]
declare module "foo" {
    export interface Foo {
        method2(): any;
    }
}

//// [index.ts]
import * as foo from "foo";

class Test {
    bar: foo.Foo;
    constructor() {
        this.bar = new foo.Foo();
    }
}


//// [index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const foo = require("foo");
class Test {
    bar;
    constructor() {
        this.bar = new foo.Foo();
    }
}

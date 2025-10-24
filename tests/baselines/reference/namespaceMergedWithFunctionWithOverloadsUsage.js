//// [tests/cases/compiler/namespaceMergedWithFunctionWithOverloadsUsage.ts] ////

//// [file.d.ts]
declare namespace Foo {
    interface Whatever {
        prop: any;
    }
}

declare function Foo(opts?: Foo.Whatever): void;
declare function Foo(cb: Function, opts?: Foo.Whatever): void;

export = Foo;
//// [index.ts]
import X = require("./file");

X(0); // shouldn't cause a crash

//// [index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const X = require("./file");
X(0); // shouldn't cause a crash

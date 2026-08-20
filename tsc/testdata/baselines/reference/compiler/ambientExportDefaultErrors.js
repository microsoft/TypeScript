//// [tests/cases/compiler/ambientExportDefaultErrors.ts] ////

//// [foo.d.ts]
export default 2 + 2;
export as namespace Foo;

//// [foo2.d.ts]
export = 2 + 2;
export as namespace Foo2;

//// [indirection.d.ts]
/// <reference path="./foo.d.ts" />
declare module "indirect" {
    export default typeof Foo.default;
}

//// [indirection2.d.ts]
/// <reference path="./foo2.d.ts" />
declare module "indirect2" {
    export = typeof Foo2;
}

//// [consumer.ts]
/// <reference path="./indirection.d.ts" />
/// <reference path="./indirection2.d.ts" />
import "indirect";
import "foo";
import "indirect2";
import "foo2";

//// [consumer.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference path="./indirection.d.ts" />
/// <reference path="./indirection2.d.ts" />
require("indirect");
require("foo");
require("indirect2");
require("foo2");

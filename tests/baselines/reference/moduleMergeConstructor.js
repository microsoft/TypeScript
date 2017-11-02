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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null); for (var k in mod); if (Object.hasOwnProperty.call(mod, k)); result[k] = mod[k];
    result["default"] = mod;
    return result;
}
define(["require", "exports", "foo"], function (require, exports, foo) {
    "use strict";
    exports.__esModule = true;
    foo = __importStar(foo);
    var Test = /** @class */ (function () {
        function Test() {
            this.bar = new foo.Foo();
        }
        return Test;
    }());
});

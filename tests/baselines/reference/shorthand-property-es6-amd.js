//// [tests/cases/compiler/shorthand-property-es6-amd.ts] ////

//// [test.ts]
import {foo} from './foo';
const baz = 42;
const bar = { foo, baz };


//// [test.js]
define(["require", "exports", "./foo"], function (require, exports, foo_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const baz = 42;
    const bar = { foo: foo_1.foo, baz };
});


//// [test.d.ts]
export {};

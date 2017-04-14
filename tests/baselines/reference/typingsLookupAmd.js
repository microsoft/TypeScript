//// [tests/cases/conformance/typings/typingsLookupAmd.ts] ////

//// [index.d.ts]
export declare class A {}

//// [index.d.ts]
import {A} from "a";
export declare class B extends A {}

//// [foo.ts]
import {B} from "b";


//// [foo.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
});

//// [tests/cases/compiler/declarationEmitCrossFileCopiedGeneratedImportType.ts] ////

//// [index.d.ts]
export declare class Foo extends Number {
    private _;
}
//// [index.d.ts]
import { Foo } from "../projA";
export declare const f: (foo: Foo) => boolean;
//// [index.d.ts]
export declare const e: {
    f: (foo: import("../projA").Foo) => boolean;
};
//// [index.ts]
import {e} from "../projC";

export const d = {e};

//// [index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.d = void 0;
var projC_1 = require("../projC");
exports.d = { e: projC_1.e };


//// [index.d.ts]
export declare const d: {
    e: {
        f: (foo: import("../projA").Foo) => boolean;
    };
};

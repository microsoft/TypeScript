//// [tests/cases/compiler/moduleAugmentationDoesInterfaceMergeOfReexport.ts] ////

//// [file.ts]
export interface Foo {
    x: number;
}
//// [reexport.ts]
export * from "./file";
//// [augment.ts]
import * as ns from "./reexport";

declare module "./reexport" {
    export interface Foo {
        self: Foo;
    }
}

declare const f: ns.Foo;

f.x;
f.self;
f.self.x;
f.self.self;

//// [file.js]
"use strict";
exports.__esModule = true;
//// [reexport.js]
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);
};
exports.__esModule = true;
__exportStar(require("./file"), exports);
//// [augment.js]
"use strict";
exports.__esModule = true;
f.x;
f.self;
f.self.x;
f.self.self;

//// [tests/cases/compiler/moduleAugmentationDoesNamespaceEnumMergeOfReexport.ts] ////

//// [file.ts]
export namespace Root {
    // type-only NS
    export interface Foo {
        x: number;
    }
}
//// [reexport.ts]
export * from "./file";
//// [augment.ts]
import * as ns from "./reexport";

declare module "./reexport" {
    // Merging an enum into a type-only NS is OK
    export enum Root {
        A,
        B,
        C
    }
}

declare const f: ns.Root.Foo;
const g: ns.Root = ns.Root.A;

f.x;


//// [file.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//// [reexport.js]
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("./file"), exports);
//// [augment.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ns = require("./reexport");
var g = ns.Root.A;
f.x;

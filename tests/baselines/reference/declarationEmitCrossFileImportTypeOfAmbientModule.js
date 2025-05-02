//// [tests/cases/compiler/declarationEmitCrossFileImportTypeOfAmbientModule.ts] ////

//// [component.d.ts]
declare module '@namespace/component' {
    export class Foo {}
}
//// [index.d.ts]
import { Foo } from "@namespace/component";
export declare const item: typeof Foo;
//// [index.ts]
import { item } from "../somepackage";
export const reeexported = item;


//// [index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reeexported = void 0;
var somepackage_1 = require("../somepackage");
exports.reeexported = somepackage_1.item;


//// [index.d.ts]
export declare const reeexported: typeof import("@namespace/component").Foo;

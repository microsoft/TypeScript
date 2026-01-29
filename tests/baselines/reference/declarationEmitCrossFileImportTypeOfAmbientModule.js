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
import { item } from "../somepackage";
export const reeexported = item;


//// [index.d.ts]
export declare const reeexported: typeof import("@namespace/component").Foo;

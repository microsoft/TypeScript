//// [tests/cases/compiler/globalAugmentationOverridingUMDNamespaceDeclarationEmit.ts] ////

//// [package.d.ts]
declare namespace thing {
    export interface MyInterface {}
}
declare var thing: {
    x: thing.MyInterface;
};
export = thing;
export as namespace thing;
//// [globalize.d.ts]
import * as thingAlias from "./package";
declare global {
    namespace thing {
        export type MyInterface = thingAlias.MyInterface;
    }
    const thing: typeof thingAlias;
}
//// [usage.ts]
export const num = thing.x;


//// [usage.js]
"use strict";
exports.__esModule = true;
exports.num = thing.x;


//// [usage.d.ts]
export declare const num: thing.MyInterface;

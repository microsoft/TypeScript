/// <reference path='fourslash.ts' />

// @Filename: /node_modules/lib/index.d.ts
////export declare function foo(): number;
////export declare class Bar {
////    static function methodName(): void;
////}

// @Filename: /a.ts
////import * as lib from "lib";
////lib.[|foo|]();

// @Filename: /b.ts
////import { Bar } from "lib";
////Bar.[|methodName|]();

goTo.eachRange(range => {
    verify.renameInfoFailed("You cannot rename this element.");
});

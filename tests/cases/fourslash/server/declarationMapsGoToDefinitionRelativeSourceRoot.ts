/// <reference path="../fourslash.ts" />
// @Filename: index.ts
////export class Foo {
////    member: string;
////    /*2*/methodName(propName: SomeType): void {}
////    otherMethod() {
////        if (Math.random() > 0.5) {
////            return {x: 42};
////        }
////        return {y: "yes"};
////    }
////}
////
////export interface SomeType {
////    member: number;
////}
// @Filename: out/indexdef.d.ts.map
////{"version":3,"file":"indexdef.d.ts","sourceRoot":"../","sources":["index.ts"],"names":[],"mappings":"AAAA;IACI,MAAM,EAAE,MAAM,CAAC;IACf,UAAU,CAAC,QAAQ,EAAE,QAAQ,GAAG,IAAI;IACpC,WAAW;;;;;;;CAMd;AAED,MAAM,WAAW,QAAQ;IACrB,MAAM,EAAE,MAAM,CAAC;CAClB"}
// @Filename: out/indexdef.d.ts
////export declare class Foo {
////    member: string;
////    methodName(propName: SomeType): void;
////    otherMethod(): {
////        x: number;
////        y?: undefined;
////    } | {
////        y: string;
////        x?: undefined;
////    };
////}
////export interface SomeType {
////    member: number;
////}
//////# sourceMappingURL=out/indexdef.d.ts.map
// @Filename: mymodule.ts
////import * as mod from "./out/indexdef";
////const instance = new mod.Foo();
////instance.[|/*1*/methodName|]({member: 12});

verify.baselineGoToDefinition("1");

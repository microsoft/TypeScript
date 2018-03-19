/// <reference path="fourslash.ts" />
// @BaselineFile: declarationMapsGeneratedMapsEnableMapping.baseline
// @outDir: ./dist
// @declaration: true
// @declarationMaps: true
// @Filename: index.ts
// @emitThisFile: true
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
// @Filename: mymodule.ts
////import * as mod from "/dist/index";
////const instance = new mod.Foo();
////instance.[|/*1*/methodName|]({member: 12});

verify.baselineGetEmitOutput(/*insertResultIntoVfs*/ true);
verify.goToDefinition("1", "2");
verify.goToType("1", "2");

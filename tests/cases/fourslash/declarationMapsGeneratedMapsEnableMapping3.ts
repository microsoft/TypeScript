/// <reference path="fourslash.ts" />
// @BaselineFile: declarationMapsGeneratedMapsEnableMapping3.baseline
// @outDir: ./dist
// @sourceRoot: /tests/cases/fourslash/
// @declaration: true
// @declarationMap: true
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
verify.goToDefinition("1", "2"); // getDefinitionAndBoundSpan
verify.goToType("1", "2"); // getTypeDefinitionAtPosition
goTo.marker("1");
verify.goToDefinitionIs("2"); // getDefinitionAtPosition
goTo.implementation(); // getImplementationAtPosition
verify.caretAtMarker("2");

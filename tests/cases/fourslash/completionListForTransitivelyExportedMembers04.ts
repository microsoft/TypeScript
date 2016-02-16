///<reference path="fourslash.ts" />
// @ModuleResolution: classic

// @Filename: A.ts
////export interface I1 { one: number }
////export interface I2 { two: string }
////export type I1_OR_I2 = I1 | I2;
////
////export class C1 {
////    one: string;
////}
////
////export module Inner {
////    export interface I3 {
////        three: boolean
////    }
////
////    export var varVar = 100;
////    export let letVar = 200;
////    export const constVar = 300;
////}

// @Filename: B.ts
////export var bVar = "bee!";

// @Filename: C.ts
////export var cVar = "see!";
////export * from "A";
////export * from "B"

// @Filename: D.ts
////import * as c from "C";
////var x: c.Inner./**/

goTo.marker();
verify.completionListContains("I3");
verify.not.completionListContains("__export");
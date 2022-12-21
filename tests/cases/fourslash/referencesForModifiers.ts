/// <reference path='fourslash.ts'/>

////[|/*declareModifier*/declare /*abstractModifier*/abstract class C1 {
////    [|/*staticModifier*/static a;|]
////    [|/*readonlyModifier*/readonly b;|]
////    [|/*publicModifier*/public c;|]
////    [|/*protectedModifier*/protected d;|]
////    [|/*privateModifier*/private e;|]
////}|]
////[|/*constModifier*/const enum E {
////}|]
////[|/*asyncModifier*/async function fn() {}|]
////[|/*exportModifier*/export /*defaultModifier*/default class C2 {}|]

verify.baselineFindAllReferences(
    "declareModifier",
    "abstractModifier",
    "staticModifier",
    "readonlyModifier",
    "publicModifier",
    "protectedModifier",
    "privateModifier",
    "constModifier",
    "asyncModifier",
    "exportModifier",
    "defaultModifier",)

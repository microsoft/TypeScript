/// <reference path='fourslash.ts'/>

// @Filename: a.ts
//// //MyFile Comments
//// //more comments
//// /// <reference path="so/*unknownFile*/mePath.ts" />
//// /// <reference path="[|b/*knownFile*/.ts|]" />
////
//// class clsInOverload {
////     static fnOverload();
////     static fnOverload(foo: string);
////     static fnOverload(foo: any) { }
//// }
////

// @Filename: b.ts
/////*fileB*/

verify.baselineGoToDefinition(
    "unknownFile",
    "knownFile",
);

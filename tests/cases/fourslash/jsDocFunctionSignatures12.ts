///<reference path="fourslash.ts" />

// @allowJs: true
// @Filename: jsDocFunctionSignatures.js

/////**
//// * @param {{
//// *   stringProp: string,
//// *   numProp: number,
//// *   boolProp: boolean,
//// *   anyProp: *,
//// *   anotherAnyProp:
//// *   *,
//// *   functionProp:
//// *   function(string,
//// *   *):
//// *   *
//// * }} o
//// */
////function f1(o) {
////    o/**/;
////}

goTo.marker();
verify.quickInfoIs(`(parameter) o: {
    stringProp: string;
    numProp: number;
    boolProp: boolean;
    anyProp: any;
    anotherAnyProp: any;
    functionProp: (arg0: string, arg1: any) => any;
}`);

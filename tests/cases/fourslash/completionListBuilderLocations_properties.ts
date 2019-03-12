/// <reference path='fourslash.ts' />

////var aa = 1;

////class A1 {
////    public static /*property1*/
////}

////class A2 {
////    public static a/*property2*/
////}

verify.completions({ marker: test.markers(), exact: completion.classElementKeywords, isNewIdentifierLocation: true });

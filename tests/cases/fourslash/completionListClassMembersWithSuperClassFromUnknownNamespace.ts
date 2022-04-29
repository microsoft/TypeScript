/// <reference path="fourslash.ts" />

////class Child extends Namespace.Parent {
////    /**/
////}

verify.completions({ marker: "", includes: completion.classElementKeywords, isNewIdentifierLocation: true });

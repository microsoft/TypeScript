/// <reference path="fourslash.ts" />

// @noLib: true
// @allowJs: true
// @filename: /test.js
////class Foo {
////    constructor() {
////        this.prop = { };
////    }
////
////    declare prop: string;
////    method() {
////        this.prop.foo/**/
////    }
////}

verify.baselineQuickInfo();
verify.baselineSyntacticAndSemanticDiagnostics();
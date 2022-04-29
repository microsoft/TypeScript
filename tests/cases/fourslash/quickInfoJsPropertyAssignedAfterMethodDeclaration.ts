/// <reference path='fourslash.ts' />

// See also `jsPropertyAssignedAfterMethodDeclaration.ts`

// @noLib: true
// @allowJs: true
// @noImplicitThis: true

// @Filename: /a.js
////const o = {
////    test/*1*/() {
////        this./*2*/test = 0;
////    }
////};

verify.quickInfoAt("1", "(method) test(): void");
verify.quickInfoAt("2", "(method) test(): void");

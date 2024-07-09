/// <reference path="fourslash.ts" />
// @Filename: goToDefinitionOverrideJsdoc.ts
// @allowJs: true
// @checkJs: true

//// export class C extends CompletelyUndefined {
////     /**
////      * @override/*1*/
////      * @returns {{}}
////      */
////     static foo() {
////         return {}
////     }
//// }

verify.baselineGoToDefinition('1')

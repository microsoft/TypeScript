/// <reference path='fourslash.ts'/>

//// class Foo {
////     /**
////      * @param {number} entity -
////      * @param {string} attribute -
////      */
////     something(entity, attribute) { }
//// }
//// class Bar extends Foo {
////     /**
////      * @inheritdoc
////      */
////     someth/**/ing(entity, attribute) {
////     }
//// }

verify.quickInfoAt("", "(method) Bar.something(entity: number, attribute: string): void");

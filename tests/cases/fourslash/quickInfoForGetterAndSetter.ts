/// <reference path='fourslash.ts'/>

//// class Test {
////     constructor() {
////         this.value;
////     }
////
////     /** Getter text */
////     get val/*1*/ue() {
////         return this.value;
////     }
////
////     /** Setter text */
////     set val/*2*/ue(value) {
////         this.value = value;
////     }
//// }

goTo.marker("1");
verify.quickInfoIs("(property) Test.value: any", "Getter text");

goTo.marker("2");
verify.quickInfoIs("(property) Test.value: any", "Setter text");

///<reference path="fourslash.ts" />

// @allowJs: true
// @Filename: dummy.js

//// /**
////  * @augments {Thing<string>}
////  */
//// class MyStringThing extends Thing {
////     constructor() {
////         var x = this.mine;
////         x/**/;
////     }
//// }

// @Filename: declarations.d.ts
//// declare class Thing<T> {
////     mine: T;    
//// }

goTo.marker();
verify.quickInfoIs("(local var) x: string");


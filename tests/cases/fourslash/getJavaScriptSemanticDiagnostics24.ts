/// <reference path="fourslash.ts" />

// @allowJs: true
// @Filename: a.js
//// function Person(age) {
////     if (age >= 18) {
////         this.canVote = true;
////     } else {
////         this.canVote = 23;
////     }
//// }
//// let x = new Person(100);
//// x.canVote/**/;

goTo.marker();
verify.quickInfoIs('(property) Person.canVote: boolean | number');

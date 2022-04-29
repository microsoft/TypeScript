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

verify.quickInfoAt("", "(property) Person.canVote: number | boolean");

/// <reference path='fourslash.ts'/>

// #33520

// @allowJs: true
// @Filename: foo.js
////x.test = /*def*/() => { }
////x.[|/*ref*/test|]();

verify.goToDefinition("ref", "def");

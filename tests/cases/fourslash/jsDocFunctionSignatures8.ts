///<reference path="fourslash.ts" />
// @allowJs: true
// @Filename: Foo.js
/////**
//// * Represents a person
//// * a b multiline test
//// * @constructor
//// * @param {string} name The name of the person
//// * @param {number} age The age of the person
//// */
////function Person(name, age) {
////    this.name = name;
////    this.age = age;
////}
////var p = new Pers/**/on();
goTo.marker();
verify.quickInfoIs("function Person(name: string, age: number): Person", "Represents a person\na b multiline test");

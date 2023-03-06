/// <reference path="fourslash.ts" />

// @allowNonTsExtensions: true
// @Filename: file.js
//// /**
////  * A person
////  * @constructor
////  * @param {string} name - The name of the person.
////  * @param {number} age - The age of the person.
////  */
//// function Person(name, age) {
////     this.name = name;
////     this.age = age;
//// }
////
////
//// Person.getName = 10;
//// Person.getNa/**/ = 10;

verify.completions({
    marker: "",
    exact: completion.functionMembersWithPrototypePlus([
        "getName",
        "getNa",
        { name: "Person", sortText: completion.SortText.JavascriptIdentifiers },
        { name: "name", sortText: completion.SortText.JavascriptIdentifiers },
        { name: "age", sortText: completion.SortText.JavascriptIdentifiers }
    ]),
});

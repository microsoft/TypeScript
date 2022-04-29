/// <reference path="fourslash.ts" />

// GH #35347

// @Filename: a.js
// @allowJs: true
//// /**
////  * @enum {string}
////  */
//// const testString = {
////     one: "1",
////     two: "2"
//// };
////
//// export { test/**/String };

verify.quickInfoAt("",
`(alias) type testString = string
(alias) const testString: {
    one: string;
    two: string;
}
export testString`);

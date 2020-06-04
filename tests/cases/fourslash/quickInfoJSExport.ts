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
`type testString = string
(alias) type testString = any
(alias) const testString: {
    one: string;
    two: string;
}
export testString`);

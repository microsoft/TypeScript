///<reference path="fourslash.ts" />

// @allowJs: true
// @Filename: /Foo.js
//// /*global*/
////class classA {
////    /*class*/
////}
////class Test7 {
////	constructor(/*constructorParameter*/){}
////}
////function foo() {
/////*insideFunction*/
////}
verify.completions(
    { marker: "global", exact: completion.globalsInJsPlus(["foo", "classA", "Test7"]) },
    { marker: "class", isNewIdentifierLocation: true, exact: ["classA", "Test7", "foo", ...completion.classElementInJsKeywords] },
    { marker: "constructorParameter", isNewIdentifierLocation: true, exact: ["classA", "Test7", "foo"] },
    { marker: "insideFunction", exact: completion.globalsInJsInsideFunction(["foo", "classA", "Test7"]) },
);

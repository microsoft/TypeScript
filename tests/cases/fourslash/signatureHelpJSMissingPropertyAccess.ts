/// <reference path="fourslash.ts" />

// @allowJs: true
// @checkJs: true

// @Filename: test.js
////foo.filter(/**/)

goTo.marker("");
verify.signatureHelp({
  text: "ReadonlyArray.filter<S extends T>(predicate: (value: T, index: number, array: readonly T[]) => value is S, thisArg?: any): S[]",
  overloadsCount: 2,
  docComment: "Returns the elements of an array that meet the condition specified in a callback function.",
  parameterDocComment: "A function that accepts up to three arguments. The filter method calls the predicate function one time for each element in the array.",
  tags: [
    { name: "param", text: "predicate A function that accepts up to three arguments. The filter method calls the predicate function one time for each element in the array." },
    { name: "param", text: "thisArg An object to which the this keyword can refer in the predicate function. If thisArg is omitted, undefined is used as the this value." }
  ]
});

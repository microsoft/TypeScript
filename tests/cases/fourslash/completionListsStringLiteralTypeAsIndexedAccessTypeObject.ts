/// <reference path="fourslash.ts" />

//// let firstCase: "/*case_1*/"["foo"]
//// let secondCase: "b/*case_2*/"["bar"]
//// let thirdCase: "c/*case_3*/"["baz"]
//// let fourthCase: "en/*case_4*/"["qux"]
//// interface Foo {
////     foo: string;
////     bar: string;
//// }
//// let fifthCase: Foo["b/*case_5*/"]
//// let sixthCase: Foo["f/*case_6*/"]

// fourslash tests for issue 40322
verify.completions({marker: ["case_1", "case_2", "case_3", "case_4"], exact: undefined, isNewIdentifierLocation: true})

// fourslash regression tests for previous implementation
verify.completions({marker: ["case_5", "case_6"], includes: ["bar", "foo"]})
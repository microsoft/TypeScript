/// <reference path="fourslash.ts" />

//// let firstCase: "a/*case_1*/"["foo"]
//// let secondCase: "b/*case_2*/"["bar"]
//// let thirdCase: "c/*case_3*/"["baz"]
//// let fourthCase: "en/*case_4*/"["qux"]
//// interface Foo {
////  bar: string;
////  qux: string;
//// }
//// let fifthCase: Foo["b/*case_5*/"]
//// let sixthCase: Foo["qu/*case_6*/"]

// fourslash tests for issue 40322
verify.completions({
  marker: ["case_1", "case_2", "case_3", "case_4"],
  exact: undefined,
  isNewIdentifierLocation: true,
});

// regression tests
const test5 = test.marker("case_5");
const test6 = test.marker("case_6");

verify.completions({
  marker: "case_5",
  includes: {
    name: "bar",
    replacementSpan: {
      fileName: test5.fileName,
      pos: test5.position - 1,
      end: test5.position,
    },
  },
});

verify.completions({
  marker: "case_6",
  includes: {
    name: "qux",
    replacementSpan: {
      fileName: test6.fileName,
      pos: test6.position - 2,
      end: test6.position,
    },
  },
});

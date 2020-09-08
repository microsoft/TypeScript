/// <reference path="fourslash.ts" />

//// let firstCase: "a/*case_1*/"["foo"]
//// let secondCase: "b/*case_2*/"["bar"]
//// let thirdCase: "c/*case_3*/"["baz"]
//// let fourthCase: "en/*case_4*/"["qux"]

// fourslash tests for issue 40322
verify.completions({
  marker: ["case_1", "case_2", "case_3", "case_4"],
  exact: undefined,
  isNewIdentifierLocation: true,
});

/// <reference path="fourslash.ts" />

// @lib: dom

//// console.[|cl/*0*/ockwork|];
//// type T = Array["[|toS/*1*/paghetti|]"];

test.ranges().forEach((range, marker) => {
  verify.completions({
    marker: `${marker}`,
    optionalReplacementSpan: range,
  });
});

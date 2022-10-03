/// <reference path="fourslash.ts" />
//// /** @param /*name1*/ {/*type*/} /*name2*/ */
//// function toString(obj) {}

verify.completions({
  marker: "type",
  exact: completion.globalTypes
});

verify.completions({
  marker: "name1",
  exact: ["obj"]
});

verify.completions({
  marker: "name2",
  exact: ["obj"]
});

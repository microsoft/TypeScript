/// <reference path="fourslash.ts" />

////const x = { "/**/" };

// We specifically filter out any array-like types.
// Private members will be excluded by `createUnionOrIntersectionProperty`.
goTo.marker("");
verify.completionListIsEmpty();

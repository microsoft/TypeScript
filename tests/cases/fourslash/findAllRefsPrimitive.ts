// @noLib: true

/// <reference path='fourslash.ts'/>

// @Filename: a.ts
////const x: [|any|] = 0;
////const any = 2;
////const y: [|any|] = any;

////function f(b: [|boolean|]): [|boolean|];

////type T = [|never|]; type U = [|never|];

////function n(x: [|number|]): [|number|];

////function o(x: [|object|]): [|object|];

////function s(x: [|string|]): [|string|];

////function sy(s: [|symbol|]): [|symbol|];

////function v(v: [|void|]): [|void|];

// @Filename: b.ts
// const z: [|any|] = 0;

test.rangesByText().forEach((ranges, text) => verify.singleReferenceGroup(text, ranges));
verify.rangesWithSameTextAreDocumentHighlights();

goTo.rangeStart(test.ranges()[0]);
verify.renameInfoFailed();

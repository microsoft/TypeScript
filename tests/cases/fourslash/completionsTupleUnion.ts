/// <reference path="fourslash.ts" />

////declare const x: ['a', 'b'] | ['c', 'd'] = ["a", /**/];

verify.completions({ marker: "", exact: "b", isNewIdentifierLocation: true });

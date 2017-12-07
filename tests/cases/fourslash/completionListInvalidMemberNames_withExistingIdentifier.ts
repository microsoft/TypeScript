/// <reference path='fourslash.ts' />

////declare const x: { "foo ": "space in the name", };
////[|x.fo/**/;|]

verify.completionsAt("", ["foo "]);
verify.applyCodeActionFromCompletion("", {
    name: "foo ",
    description: "Use bracket notation instead of dot notation",
    newRangeContent: 'x["fo"];',
});

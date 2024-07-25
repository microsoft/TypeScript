/// <reference path='fourslash.ts'/>

// #33520

// @allowJs: true
// @Filename: foo.js
////x./*def*/test = () => { }
////x.[|/*ref*/test|]();
////x./*defFn*/test3 = function () { }
////x.[|/*refFn*/test3|]();

verify.baselineGoToDefinition(
    "ref",
    "refFn",
);

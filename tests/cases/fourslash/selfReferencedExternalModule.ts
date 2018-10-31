/// <reference path='fourslash.ts' />
// @Filename: app.ts
////export import A = require('./app');
////export var I = 1;
////A./**/I

verify.completions({
    marker: "",
    exact: [
        { name: "A", text: "import A = require('./app')" },
        { name: "I", text: "var I: number" },
    ],
});

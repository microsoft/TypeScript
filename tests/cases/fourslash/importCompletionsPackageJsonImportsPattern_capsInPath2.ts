/// <reference path="fourslash.ts" />

// @module: node18

// @Filename: /Dev/package.json
//// {
////   "imports": {
////     "#thing/*": "./src/*.js"
////   }
//// }

// @Filename: /Dev/src/something.ts
//// export function something(name: string): any;

// @Filename: /Dev/a.ts
//// import {} from "#thing//*2*/";

// verify.completions({
//     marker: ["1"],
//     exact: ["#thing"],
//     isNewIdentifierLocation: true,
// });
verify.completions({
    marker: ["2"],
    exact: ["something"],
    isNewIdentifierLocation: true,
});

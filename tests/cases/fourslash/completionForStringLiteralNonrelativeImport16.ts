/// <reference path='fourslash.ts' />

// Should give completions for modules referenced via baseUrl and paths compiler options with explicit name mappings

// @Filename: tsconfig.json
//// {
////     "compilerOptions": {
////         "baseUrl": "./",
////         "paths": {
////             "module1/path1": ["some/path/whatever.ts"],
////         }
////     }
//// }

// @Filename: test0.ts
//// import * as foo1 from "m/*first*/
//// import * as foo1 from "module1/pa/*second*/

// @Filename: some/path/whatever.ts
//// export var x = 9;

verify.completions({ marker: ["first"], exact: ["test0", "some", {
    name: "module1/path1",
    replacementSpan: {
        fileName: "foo",
        pos: 23,
        end: 24
    }
}], isNewIdentifierLocation: true });

verify.completions({
    marker: ["second"], exact: [{
        name: "module1/path1",
        replacementSpan: {
            fileName: "foo",
            pos: 48,
            end: 58
        }
    }], isNewIdentifierLocation: true
});
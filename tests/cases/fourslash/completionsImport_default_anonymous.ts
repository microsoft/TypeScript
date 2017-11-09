/// <reference path="fourslash.ts" />

// Use `/src` to test that directory names are not included in conversion from module path to identifier.

// @Filename: /src/foo-bar.ts
////export default 0;

// @Filename: /src/b.ts
////def/*0*/
////fooB/*1*/

goTo.marker("0");
verify.not.completionListContains({ name: "default", source: "/src/foo-bar" }, undefined, undefined, undefined, undefined, undefined, { includeExternalModuleExports: true });

goTo.marker("1");
verify.completionListContains({ name: "fooBar", source: "/src/foo-bar" }, "(property) default: 0", "", "property", /*spanIndex*/ undefined, /*hasAction*/ true, { includeExternalModuleExports: true });
verify.applyCodeActionFromCompletion("1", {
    name: "fooBar",
    source: "/src/foo-bar",
    description: `Import 'fooBar' from "./foo-bar".`,
    // TODO: GH#18445
    newFileContent: `import fooBar from "./foo-bar";\r
\r
def
fooB`,
});

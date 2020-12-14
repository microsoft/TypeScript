/// <reference path="fourslash.ts" />

// @module: commonjs

// @Filename: a.d.ts
//// declare namespace foo { class Bar {} }
//// declare module 'path1' {
////   import Bar = foo.Bar;
////   export default Bar;
//// }
//// declare module 'path2longer' {
////   import Bar = foo.Bar;
////   export {Bar};
//// }
////

// @Filename: b.ts
//// Ba/**/

verify.applyCodeActionFromCompletion("", {
  name: "Bar",
  source: "path2longer",
  description: `Import 'Bar' from module "path2longer"`,
  newFileContent: `import { Bar } from "path2longer";\n\nBa`,
  preferences: {
    includeCompletionsForModuleExports: true
  }
});
